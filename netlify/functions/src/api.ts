import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { healthCheckHandler, createCheckoutSession } from './handlers';
import { createRequestLogger } from './utils/logger';
import { isError } from './utils/error';

// Helper function to create consistent responses
const json = (
  statusCode: number, 
  data?: unknown, 
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
  body: data === undefined ? '' : JSON.stringify(data),
});

// Main API handler
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<HandlerResponse> => {
  const { httpMethod, path } = event;
  const logger = createRequestLogger(context);

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return json(204);
  }

  try {
    // Log the incoming request
    logger.info(`[${httpMethod}] ${path}`, {
      event: 'api_request',
      method: httpMethod,
      path,
    });

    // Route handlers
    if (httpMethod === 'GET' && path === '/api/health') {
      return await healthCheckHandler(event, context);
    }

    if (httpMethod === 'POST' && path === '/api/payments/create-checkout-session') {
      if (!event.body) {
        return json(400, { error: 'Request body is required' });
      }
      return await createCheckoutSession(event, context);
    }

    // No matching route
    return json(404, { 
      error: 'Not Found',
      message: `No route found for ${httpMethod} ${path}`
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    logger.error(`API Error: ${errorMessage}`, { 
      path,
      method: httpMethod,
      stack: errorStack 
    });
    
    return json(500, {
      status: 'error',
      message: 'Internal Server Error',
      ...(process.env.NODE_ENV !== 'production' && { 
        error: errorMessage,
        stack: errorStack
      }),
      timestamp: new Date().toISOString(),
      requestId: context.awsRequestId,
    });
  }
};
