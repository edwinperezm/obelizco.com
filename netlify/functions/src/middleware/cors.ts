import { HandlerResponse } from '@netlify/functions';
import { createRequestLogger } from '../utils/logger';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

interface CorsOptions {
  /**
   * Configures the Access-Control-Allow-Origin CORS header.
   * @default '*' (all origins)
   */
  origin?: string | string[] | ((origin: string) => string | null | undefined);
  
  /**
   * Configures the Access-Control-Allow-Methods CORS header.
   * @default ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
   */
  methods?: HttpMethod[];
  
  /**
   * Configures the Access-Control-Allow-Headers CORS header.
   * @default ['Content-Type', 'Authorization']
   */
  allowedHeaders?: string[];
  
  /**
   * Configures the Access-Control-Expose-Headers CORS header.
   */
  exposedHeaders?: string[];
  
  /**
   * Configures the Access-Control-Allow-Credentials CORS header.
   * @default false
   */
  credentials?: boolean;
  
  /**
   * Configures the Access-Control-Max-Age CORS header.
   * @default 5 (in seconds)
   */
  maxAge?: number;
  
  /**
   * Whether to enable preflight request caching.
   * @default true
   */
  preflightContinue?: boolean;
  
  /**
   * Whether to handle OPTIONS requests automatically.
   * @default true
   */
  optionsSuccessStatus?: number;
}

const defaultOptions: Required<CorsOptions> = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: [],
  credentials: false,
  maxAge: 5,
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

/**
 * Normalize origins to an array
 */
const normalizeOrigins = (origin: string | string[] | undefined): string[] => {
  if (!origin) return [];
  if (Array.isArray(origin)) return origin;
  if (origin === '*') return ['*'];
  return origin.split(/\s*,\s*/);
};

/**
 * Check if the origin is allowed
 */
const isOriginAllowed = (origin: string, allowedOrigins: string[]): boolean => {
  if (allowedOrigins.includes('*')) return true;
  if (typeof origin !== 'string') return false;
  
  return allowedOrigins.some(allowed => {
    if (typeof allowed === 'string') {
      return origin === allowed;
    }
    
    if (allowed instanceof RegExp) {
      return allowed.test(origin);
    }
    
    return false;
  });
};

/**
 * Set CORS headers on the response
 */
const setCorsHeaders = (
  response: HandlerResponse,
  event: any,
  options: Required<CorsOptions>,
  allowedOrigin: string
): void => {
  const headers = response.headers || {};
  
  // Set the origin header
  headers['Access-Control-Allow-Origin'] = allowedOrigin;
  
  // Handle credentials
  if (options.credentials && allowedOrigin !== '*') {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  
  // Set exposed headers
  if (options.exposedHeaders.length > 0) {
    headers['Access-Control-Expose-Headers'] = options.exposedHeaders.join(',');
  }
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    // Set allowed methods
    if (options.methods.length > 0) {
      headers['Access-Control-Allow-Methods'] = options.methods.join(',');
    }
    
    // Set allowed headers
    if (options.allowedHeaders.length > 0) {
      headers['Access-Control-Allow-Headers'] = options.allowedHeaders.join(',');
    } else if (event.headers && event.headers['access-control-request-headers']) {
      headers['Access-Control-Allow-Headers'] = event.headers['access-control-request-headers'];
    }
    
    // Set max age
    if (options.maxAge) {
      headers['Access-Control-Max-Age'] = options.maxAge.toString();
    }
  }
  
  response.headers = headers;
};

/**
 * CORS middleware for Netlify Functions
 */
export const cors = (options: CorsOptions = {}) => {
  const opts: Required<CorsOptions> = { ...defaultOptions, ...options };
  const allowedOrigins = normalizeOrigins(opts.origin);
  
  return (handler: Function) => {
    return async (event: any, context: any): Promise<HandlerResponse> => {
      const logger = createRequestLogger(context);
      const requestOrigin = event.headers?.origin || event.headers?.Origin || '';
      
      // Handle preflight requests
      if (event.httpMethod === 'OPTIONS' && !opts.preflightContinue) {
        logger.debug('Handling preflight request', {
          origin: requestOrigin,
          method: event.httpMethod,
          path: event.path,
        });
        
        const response: HandlerResponse = {
          statusCode: opts.optionsSuccessStatus,
          headers: {},
        };
        
        // If origin is allowed, set CORS headers
        if (isOriginAllowed(requestOrigin, allowedOrigins)) {
          setCorsHeaders(response, event, opts, requestOrigin || '*');
        }
        
        return response;
      }
      
      // Handle regular requests
      try {
        const response = await handler(event, context);
        
        // If origin is allowed, set CORS headers
        if (isOriginAllowed(requestOrigin, allowedOrigins)) {
          setCorsHeaders(response, event, opts, requestOrigin || '*');
        }
        
        return response;
      } catch (error) {
        logger.error('CORS middleware error:', error);
        throw error;
      }
    };
  };
};

/**
 * Default CORS middleware with permissive settings
 */
export const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
