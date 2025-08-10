import type { Handler, HandlerContext, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { createRequestLogger } from '../utils/logger';
import { isError } from '../utils/error';

// Error handler utility functions
function isErrorWithErrors(error: unknown): error is { errors: unknown[] } {
  return Boolean(
    error &&
    typeof error === 'object' &&
    'errors' in error &&
    Array.isArray((error as any).errors)
  );
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string;
  details?: unknown;
  timestamp: string;
  requestId?: string;
}

/**
 * Standard error codes
 */
export enum ErrorCode {
  // 400 Bad Request
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // 401 Unauthorized
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  
  // 403 Forbidden
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // 404 Not Found
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  
  // 409 Conflict
  CONFLICT = 'CONFLICT',
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  
  // 422 Unprocessable Entity
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  
  // 429 Too Many Requests
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // 500 Internal Server Error
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  
  // 503 Service Unavailable
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    public details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    
    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Convert error to JSON response
   */
  toJSON(): ErrorResponse {
    return {
      status: 'error',
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Create a success response
 */
export function createSuccessResponse(
  data: unknown = null,
  statusCode = 200,
  message = 'Success'
): HandlerResponse {
  return {
    statusCode,
    body: JSON.stringify({
      status: 'success',
      message,
      data,
      timestamp: new Date().toISOString()
    }),
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  };
}

/**
 * Create an error response
 */
export const createErrorResponse = (
  statusCode: number,
  message: string,
  code?: ErrorCode,
  details?: unknown,
  requestId?: string
): HandlerResponse => {
  const errorResponse: ErrorResponse = {
    status: 'error',
    message,
    code: code || ErrorCode.INTERNAL_SERVER_ERROR,
    details,
    timestamp: new Date().toISOString(),
    requestId,
  };

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...(requestId && { 'X-Request-ID': requestId }),
    },
    body: JSON.stringify(errorResponse, null, 2),
  };
};

/**
 * Error handling middleware for Netlify Functions
 */
export const errorHandler = (handler: Handler) => {
  return async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
    const logger = createRequestLogger(context);
    
    try {
      // Log the incoming request
      logger.info(`[${event.httpMethod}] ${event.path}`, {
        event: 'request_received',
        method: event.httpMethod,
        path: event.path,
        query: event.queryStringParameters,
        headers: event.headers
      });
      
      // Execute the handler
      const response = await handler(event, context);
      
      if (!response) {
        throw new Error('Handler did not return a response');
      }
      
      // Log the successful response
      logger.info(`[${event.httpMethod}] ${event.path} - ${response.statusCode}`, {
        event: 'response_sent',
        method: event.httpMethod,
        path: event.path,
        statusCode: response.statusCode
      });
      
      return response;
    } catch (error: unknown) {
      // Handle standard Error objects
      if (isError(error)) {
        const { message, name, stack } = error;
        
        logger.error('Unhandled error in API handler', {
          error: message,
          name,
          stack,
          event: {
            httpMethod: event.httpMethod,
            path: event.path,
            query: event.queryStringParameters
          },
        });
        
        // Handle known API errors
        if (error instanceof ApiError) {
          return createErrorResponse(
            error.statusCode,
            error.message,
            error.code as ErrorCode,
            error.details,
            context?.awsRequestId
          );
        }
        
        // Handle JWT errors
        if (name === 'JsonWebTokenError' || name === 'TokenExpiredError') {
          return createErrorResponse(
            401,
            'Invalid or expired token',
            ErrorCode.UNAUTHORIZED,
            { reason: message },
            context?.awsRequestId
          );
        }
        
        // Handle validation errors (e.g., from express-validator)
        if (isErrorWithErrors(error)) {
          return createErrorResponse(
            400,
            'Validation error',
            ErrorCode.VALIDATION_ERROR,
            error.errors,
            context?.awsRequestId
          );
        }
        
        // Handle generic errors with status codes
        if (error && typeof error === 'object' && 'statusCode' in error && typeof (error as any).statusCode === 'number') {
          return createErrorResponse(
            (error as any).statusCode,
            message,
            (error as any).code || ErrorCode.INTERNAL_SERVER_ERROR,
            (error as any).details,
            context?.awsRequestId
          );
        }
      }
      
      // Handle non-Error objects
      const errorMessage = 'An unexpected error occurred';
      logger.error('Unhandled non-Error in API handler', {
        error: errorMessage,
        originalError: error,
        event: {
          httpMethod: event.httpMethod,
          path: event.path,
          query: event.queryStringParameters
        },
      });
      
      // Return a generic 500 error for unhandled cases
      return createErrorResponse(
        500,
        errorMessage,
        ErrorCode.INTERNAL_SERVER_ERROR,
        process.env.NODE_ENV === 'production' ? undefined : error,
        context?.awsRequestId
      );
    }
  };
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (event: any, context: any): HandlerResponse => {
  const logger = createRequestLogger(context);
  
  logger.warn(`Route not found: ${event.httpMethod} ${event.path}`, {
    event: 'route_not_found',
    method: event.httpMethod,
    path: event.path,
  });
  
  return createErrorResponse(
    404,
    `Cannot ${event.httpMethod} ${event.path}`,
    ErrorCode.NOT_FOUND,
    undefined,
    context?.awsRequestId
  );
};
