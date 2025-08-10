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
  const logger = createRequestLogger(context);
  const { httpMethod, path } = event;

  try {
    // Handle preflight requests
    if (httpMethod === 'OPTIONS') {
      return json(204);
    }

    // Log the incoming request
    logger.info(`[${httpMethod}] ${path}`, {
      event: 'api_request',
      method: httpMethod,
      path,
    });

    // Route handlers
    if (httpMethod === 'GET' && path === '/api/health') {
      const response = await healthCheckHandler(event, context);
      return response || json(200, { status: 'ok' });
    }

    if (httpMethod === 'POST' && path === '/api/payments/create-checkout-session') {
      if (!event.body) {
        return json(400, { error: 'Request body is required' });
      }
      try {
        const response = await createCheckoutSession(event, context);
        if (!response) {
          throw new Error('Failed to create checkout session');
        }
        return response;
      } catch (error) {
        logger.error('Error in checkout handler', { 
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined 
        });
        return json(500, { 
          error: 'Internal Server Error',
          ...(process.env.NODE_ENV !== 'production' && { 
            details: error instanceof Error ? error.message : 'Unknown error' 
          })
        });
      }
    }

    // No matching route
    return json(404, { 
      error: 'Not Found',
      path,
      method: httpMethod
    });

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
    return json(500, {
      status: 'error',
      message: 'Internal Server Error',
      ...(process.env.NODE_ENV !== 'production' && { 
        error: errorMessage,
        ...(errorStack && { stack: errorStack })
      }),
      timestamp: new Date().toISOString(),
      requestId: context.awsRequestId,
    });
  }
};
