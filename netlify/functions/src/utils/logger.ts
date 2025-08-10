import winston, { format } from 'winston';
import { HandlerContext } from '@netlify/functions';
import fs from 'fs';
import path from 'path';

const { combine, timestamp, json, errors, printf } = format;

type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'debug';

// Define log levels configuration
const levels: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log colors
const colors: Record<LogLevel, string> = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Extend the Winston logger with our custom methods
declare module 'winston' {
  interface Logger {
    error: winston.LeveledLogMethod;
    warn: winston.LeveledLogMethod;
    info: winston.LeveledLogMethod;
    http: winston.LeveledLogMethod;
    debug: winston.LeveledLogMethod;
  }
}

// Add colors to winston
winston.addColors(colors);

// Format for console output in development
const consoleFormat = format.combine(
  format.colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
  printf((info) => {
    const { timestamp, level, message, stack, ...rest } = info;
    
    // Filter out internal winston properties
    const filteredRest = Object.keys(rest).reduce((acc, key) => {
      if (!['service', 'env', 'timestamp'].includes(key)) {
        acc[key] = rest[key as keyof typeof rest];
      }
      return acc;
    }, {} as Record<string, unknown>);
    
    const restString = Object.keys(filteredRest).length > 0 
      ? `\n${JSON.stringify(filteredRest, null, 2)}`
      : '';
    
    const stackTrace = stack ? `\n${stack}` : '';
    return `[${timestamp}] ${level}: ${message}${stackTrace}${restString}`;
  })
);

// Format for JSON output in production
const jsonFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  json()
);

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create a logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels,
  format: process.env.NODE_ENV === 'production' ? jsonFormat : consoleFormat,
  defaultMeta: { 
    service: 'netlify-function',
    env: process.env.NODE_ENV || 'development',
  },
  transports: [
    // Console transport for all environments
    new winston.transports.Console(),
    
    // File transports for production
    ...(process.env.NODE_ENV === 'production' ? [
      // Error logs
      new winston.transports.File({ 
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
      }),
      // Combined logs
      new winston.transports.File({ 
        filename: path.join(logsDir, 'combined.log'),
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
      })
    ] : [])
  ],
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: path.join(logsDir, 'exceptions.log'),
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// If we're not in production, log to the console with colors
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat
      ),
    })
  );
}

/**
 * Create a child logger with request context
 */
export const createRequestLogger = (context?: HandlerContext) => {
  const requestId = context?.awsRequestId || 'unknown-request';
  
  return logger.child({ 
    requestId,
    functionName: context?.functionName,
    functionVersion: context?.functionVersion,
  });
};

/**
 * Log an API request
 */
export const logRequest = (
  event: { httpMethod: string; path: string; },
  context?: HandlerContext
) => {
  const log = createRequestLogger(context);
  log.info(`[${event.httpMethod}] ${event.path}`, {
    event: 'api_request',
    method: event.httpMethod,
    path: event.path,
  });
};

/**
 * Log an API response
 */
export const logResponse = (
  statusCode: number,
  event: { httpMethod: string; path: string },
  context?: HandlerContext
) => {
  const log = createRequestLogger(context);
  const level = statusCode >= 400 ? 'error' : 'info';
  
  log[level](`[${event.httpMethod}] ${event.path} - ${statusCode}`, {
    event: 'api_response',
    method: event.httpMethod,
    path: event.path,
    statusCode,
  });
};

// Named export for the logger
export { logger };
