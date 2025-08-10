import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { healthCheckHandler } from './handlers/health';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { corsMiddleware } from './middleware/cors';
import { createRequestLogger } from './utils/logger';
import { isError } from './utils/error';

/**
 * Route definitions
 */
interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
  path: `/${string}`;
  handler: Handler;
}

const routes: Route[] = [
  // Health check endpoint
  {
    method: 'GET',
    path: '/api/health',
    handler: healthCheckHandler,
  },
  // Add more routes here
];

/**
 * Main API handler
 */
const apiHandler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const logger = createRequestLogger(context);
  const { httpMethod, path } = event;
  
  try {
    // Log the incoming request
    logger.info(`[${httpMethod}] ${path}`, {
      event: 'api_request',
      method: httpMethod,
      path,
    });
    
    // Find a matching route
    const route = routes.find(
      (r) => 
        r.method === httpMethod && 
        (r.path === path || new RegExp(`^${r.path.replace(/\//g, '\\/')}(\/.*)?$`).test(path))
    );
    
    // If no route found, return 404
    if (!route) {
      const response = await notFoundHandler(event, context);
      if (response) {
        return response;
      }
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'error',
          message: 'Not Found'
        })
      };
    }
    
    // Execute the route handler
    const response = await route.handler(event, context);
    
    if (!response) {
      throw new Error('Handler did not return a response');
    }
    
    // Ensure response has required fields
    const validResponse: HandlerResponse = {
      statusCode: response.statusCode || 200,
      headers: {
        'Content-Type': 'application/json',
        ...(response.headers || {})
      },
      body: response.body || JSON.stringify({ status: 'success' })
    };
    
    // Log the successful response
    logger.info(`[${httpMethod}] ${path} - ${response.statusCode}`, {
      event: 'api_response',
      method: httpMethod,
      path,
      statusCode: response.statusCode,
    });
    
    return validResponse;
  } catch (error: unknown) {
    const errorMessage = isError(error) ? error.message : 'An unknown error occurred';
    const errorStack = isError(error) ? error.stack : undefined;
    
    // Log the error with additional context
    logger.error(`[${httpMethod}] ${path} - Error: ${errorMessage}`, { 
      error: errorMessage,
      stack: errorStack,
      requestId: context.awsRequestId,
      path,
      method: httpMethod
    });
    
    // Return error response
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'error',
        message: 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { 
          error: errorMessage,
          ...(errorStack && { stack: errorStack })
        }),
        timestamp: new Date().toISOString(),
        requestId: context.awsRequestId,
      }),
    };
  }
};

// Helper function to ensure the handler returns a Promise<HandlerResponse>
const ensureHandler = (handler: Handler): ((event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse>) => {
  return async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
    const result = await handler(event, context);
    if (!result) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    return result;
  };
};

// Create a properly typed handler chain
const createHandler = (): ((event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse>) => {
  // Start with the API handler
  let handler: (event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse> = 
    ensureHandler(apiHandler);
  
  // Apply CORS middleware
  handler = corsMiddleware(handler as any) as any;
  
  // Apply error handler
  return errorHandler(handler as any) as any;
};

// Export the configured handler
export const handler = createHandler();
