import type { Handler, HandlerContext } from '@netlify/functions';
import { 
  createErrorResponse,
  createSuccessResponse,
  ErrorCode
} from '../middleware/errorHandler';
import { getEnv } from '../utils/types';
import { createRequestLogger } from '../utils/logger';

interface HealthCheckResponse {
  status: 'ok';
  timestamp: string;
  uptime: number;
  environment: string;
  nodeVersion: string;
  memoryUsage: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
  };
  system: {
    platform: string;
    arch: string;
    cpus: number;
    totalMemory: string;
    freeMemory: string;
    loadAvg: number[];
  };
  env: {
    NODE_ENV: string;
    AWS_REGION?: string;
    AWS_EXECUTION_ENV?: string;
    AWS_LAMBDA_FUNCTION_NAME?: string;
    AWS_LAMBDA_FUNCTION_VERSION?: string;
    AWS_LAMBDA_FUNCTION_MEMORY_SIZE?: string;
  };
}

/**
 * Format bytes to human-readable format
 */
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Health check handler
 */
export const healthCheckHandler: Handler = async (event, context: HandlerContext) => {
  const logger = createRequestLogger(context);
  
  try {
    const memoryUsage = process.memoryUsage();
    
    // Ensure event is used to avoid TypeScript warning
    if (event) {
      logger.debug('Health check request received', { path: event.path });
    }
    
    const response: HealthCheckResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: getEnv('NODE_ENV') || 'development',
      nodeVersion: process.version,
      memoryUsage: {
        rss: formatBytes(memoryUsage.rss),
        heapTotal: formatBytes(memoryUsage.heapTotal),
        heapUsed: formatBytes(memoryUsage.heapUsed),
        external: formatBytes(memoryUsage.external || 0),
      },
      system: {
        platform: process.platform,
        arch: process.arch,
        cpus: require('os').cpus().length,
        totalMemory: formatBytes(require('os').totalmem()),
        freeMemory: formatBytes(require('os').freemem()),
        loadAvg: require('os').loadavg(),
      },
      env: {
        NODE_ENV: getEnv('NODE_ENV') || 'development',
        AWS_REGION: process.env.AWS_REGION,
        AWS_EXECUTION_ENV: process.env.AWS_EXECUTION_ENV,
        AWS_LAMBDA_FUNCTION_NAME: process.env.AWS_LAMBDA_FUNCTION_NAME,
        AWS_LAMBDA_FUNCTION_VERSION: process.env.AWS_LAMBDA_FUNCTION_VERSION,
        AWS_LAMBDA_FUNCTION_MEMORY_SIZE: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      },
    };

    logger.info('Health check successful', { status: 'ok' });
    
    const successResponse = createSuccessResponse(response);
    if (successResponse) {
      return successResponse;
    }
    
    // Fallback response if createSuccessResponse returns undefined
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'ok',
        timestamp: response.timestamp,
        uptime: response.uptime,
        environment: response.environment,
        nodeVersion: response.nodeVersion
      })
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Health check failed', { 
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined 
    });
    
    const errorResponse = createErrorResponse(
      500,
      'Health check failed',
      ErrorCode.INTERNAL_SERVER_ERROR,
      process.env.NODE_ENV === 'production' ? undefined : { message: errorMessage }
    );
    
    if (errorResponse) {
      return errorResponse;
    }
    
    // Fallback error response
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'error',
        message: 'Health check failed',
        ...(process.env.NODE_ENV !== 'production' && { error: errorMessage })
      })
    };
  }
};

// Export the handler with middleware
export const handler = healthCheckHandler;
