import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { createRequestLogger } from './utils/logger';

// Import handlers with proper typing
import { handler as healthCheckHandler } from './handlers/health';
import { handler as createCheckoutSession } from './handlers/checkout';

// Helper function to create consistent responses
const createResponse = (
  statusCode: number, 
  body: unknown = '', 
  extraHeaders: Record<string, string> = {}
): HandlerResponse => ({
  statusCode,
  headers: {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'Content-Type,Authorization',
    ...extraHeaders,
  },
  body: typeof body === 'string' ? body : JSON.stringify(body)
});

// Route handlers mapping with type assertion
const routeHandlers: Record<string, Handler> = {
  'GET /api/health': healthCheckHandler as unknown as Handler,
  'POST /api/stripe': createCheckoutSession as unknown as Handler,
  'POST /api/payments/create-checkout-session': createCheckoutSession as unknown as Handler,
};

// Main handler implementation
const handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const { httpMethod, path } = event;
  const logger = createRequestLogger(context);

  // Handle CORS preflight
  if (httpMethod === 'OPTIONS') {
    return createResponse(204, '');
  }

  // Log the incoming request
  logger.info(`[${httpMethod}] ${path}`, {
    event: 'api_request',
    method: httpMethod,
    path,
  });

  // Find matching route
  const routeKey = `${httpMethod} ${path}`;
  const routeHandler = routeHandlers[routeKey];

  if (routeHandler) {
    // Special case for POST requests that need body validation
    if (httpMethod === 'POST' && !event.body) {
      return createResponse(400, { error: 'Request body is required' });
    }
    
    try {
      const result = await routeHandler(event, context);
      if (!result) {
        throw new Error('Handler returned undefined');
      }
      return result;
    } catch (error) {
      logger.error(`Route handler failed for ${routeKey}`, { error });
      return createResponse(500, { 
        error: 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { 
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        })
      });
    }
  }

  // No matching route
  return createResponse(404, { 
    error: 'Not Found',
    message: `No route found for ${httpMethod} ${path}`
  });
};

// Export with type assertion to satisfy Netlify's Handler type
export { handler };
