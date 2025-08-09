import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { healthCheckHandler } from './handlers/health';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { corsMiddleware } from './middleware/cors';
import { createRequestLogger } from './utils/logger';

/**
 * Route definitions
 */
const routes: Array<{
  method: string;
  path: string;
  handler: Handler;
}> = [
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
const apiHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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
        (r.path === path || new RegExp(`^${r.path.replace(/\//g, '\/')}(\/.*)?$`).test(path))
    );
    
    // If no route found, return 404
    if (!route) {
      return notFoundHandler(event, context);
    }
    
    // Execute the route handler
    const response = await route.handler(event, context);
    
    // Log the successful response
    logger.info(`[${httpMethod}] ${path} - ${response.statusCode}`, {
      event: 'api_response',
      method: httpMethod,
      path,
      statusCode: response.statusCode,
    });
    
    return response;
  } catch (error) {
    // Log the error
    logger.error(`[${httpMethod}] ${path} - Error:`, error);
    
    // Return error response
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'error',
        message: 'Internal Server Error',
        timestamp: new Date().toISOString(),
        requestId: context.awsRequestId,
      }),
    };
  }
};

// Export the handler with middleware
export const handler = corsMiddleware(errorHandler(apiHandler));
