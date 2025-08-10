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
      return response || {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' })
      };
    }
    
    // Execute the route handler
    const response = await route.handler(event, context);
    
    if (!response) {
      throw new Error('Handler did not return a response');
    }
    
    // Log the successful response
    logger.info(`[${httpMethod}] ${path} - ${response.statusCode}`, {
      event: 'api_response',
      method: httpMethod,
      path,
      statusCode: response.statusCode,
    });
    
    return response;
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

// Export the handler with middleware
export const handler = corsMiddleware(errorHandler(apiHandler));
