import { HandlerResponse } from '@netlify/functions';
import { createRequestLogger } from '../utils/logger';
import { isError } from '../utils/error';

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
export const errorHandler = (handler: Function) => {
  return async (event: any, context: any): Promise<HandlerResponse> => {
    const logger = createRequestLogger(context);
    
    try {
      // Log the incoming request
      logRequest(event, context);
      
      // Execute the handler
      const response = await handler(event, context);
      
      // Log the successful response
      logResponse(response.statusCode, event, context);
      
      return response;
    } catch (error) {
      // Log the error
      logger.error('Unhandled error in API handler', {
        error: isError(error) ? error.message : 'Unknown error',
        stack: isError(error) ? error.stack : undefined,
        event,
      });
      
      // Handle known API errors
      if (error instanceof ApiError) {
        return createErrorResponse(
          error.statusCode,
          error.message,
          error.code,
          error.details,
          context?.awsRequestId
        );
      }
      
      // Handle validation errors (e.g., from express-validator)
      if (Array.isArray(error?.errors)) {
        return createErrorResponse(
          400,
          'Validation error',
          ErrorCode.VALIDATION_ERROR,
          error.errors,
          context?.awsRequestId
        );
      }
      
      // Handle JWT errors
      if (error?.name === 'JsonWebTokenError' || error?.name === 'TokenExpiredError') {
        return createErrorResponse(
          401,
          'Invalid or expired token',
          ErrorCode.UNAUTHORIZED,
          { reason: error.message },
          context?.awsRequestId
        );
      }
      
      // Default to 500 for unhandled errors
      return createErrorResponse(
        500,
        'An unexpected error occurred',
        ErrorCode.INTERNAL_SERVER_ERROR,
        process.env.NODE_ENV === 'production' ? undefined : error?.message,
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
