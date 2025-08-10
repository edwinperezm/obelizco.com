import { Handler } from '@netlify/functions';
import { logger } from './utils/logger';
import * as os from 'os';

// Define memory usage type
type MemoryUsage = {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers?: number;
};

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime: number;
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
    AWS_LAMBDA_LOG_GROUP_NAME?: string;
    AWS_LAMBDA_LOG_STREAM_NAME?: string;
  };
  dependencies: Record<string, string>;
}

/**
 * Creates a successful API response
 */
const createSuccessResponse = (data: unknown, statusCode = 200) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  },
  body: JSON.stringify({
    status: 'success',
    data,
  }),
});

/**
 * Health check handler for the API
 */
export const healthCheckHandler: Handler = async (event) => {
  try {
    // Log the health check request
    logger.info('Health check requested', {
      path: event.path,
      httpMethod: event.httpMethod,
      queryStringParameters: event.queryStringParameters,
      headers: event.headers,
    });

    // Get memory usage
    const memoryUsage = process.memoryUsage() as MemoryUsage;
    
    // Format memory usage for better readability
    const formatMemoryUsage = (bytes: number): string => {
      if (bytes < 1024) return `${bytes} bytes`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    // Get package.json for version info
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const packageJson = require('../../package.json');
    
    // Prepare health check response
    const response: HealthCheckResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      memoryUsage: {
        rss: formatMemoryUsage(memoryUsage.rss),
        heapTotal: formatMemoryUsage(memoryUsage.heapTotal),
        heapUsed: formatMemoryUsage(memoryUsage.heapUsed),
        external: formatMemoryUsage(memoryUsage.external || 0),
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: formatMemoryUsage(os.totalmem()),
        freeMemory: formatMemoryUsage(os.freemem()),
        loadAvg: os.loadavg(),
      },
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        AWS_REGION: process.env.AWS_REGION,
        AWS_EXECUTION_ENV: process.env.AWS_EXECUTION_ENV,
        AWS_LAMBDA_FUNCTION_NAME: process.env.AWS_LAMBDA_FUNCTION_NAME,
        AWS_LAMBDA_FUNCTION_VERSION: process.env.AWS_LAMBDA_FUNCTION_VERSION,
        AWS_LAMBDA_FUNCTION_MEMORY_SIZE: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
        AWS_LAMBDA_LOG_GROUP_NAME: process.env.AWS_LAMBDA_LOG_GROUP_NAME,
        AWS_LAMBDA_LOG_STREAM_NAME: process.env.AWS_LAMBDA_LOG_STREAM_NAME,
      },
      dependencies: packageJson.dependencies || {},
    };

    // Log successful health check
    logger.info('Health check completed successfully', {
      status: response.status,
      uptime: response.uptime,
      memoryUsage: response.memoryUsage,
    });

    return createSuccessResponse(response);
  } catch (error) {
    // Log the error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Health check failed', { 
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    // Return error response
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: JSON.stringify({
        status: 'error',
        message: 'Health check failed',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

// Export the handler
export const handler = healthCheckHandler;
