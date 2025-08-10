import { HandlerEvent, HandlerContext } from '@netlify/functions';

/**
 * Extended handler context with additional properties
 */
export interface ExtendedHandlerContext extends HandlerContext {
  // Add any additional context properties here
  user?: {
    id: string;
    email: string;
    roles?: string[];
  };
  [key: string]: any;
}

/**
 * Extended handler event with parsed body and query parameters
 */
export interface ExtendedHandlerEvent extends Omit<HandlerEvent, 'body'> {
  body: any; // Make body required as it's required in HandlerEvent
  query?: Record<string, string>;
  params?: Record<string, string>;
  user?: {
    id: string;
    email: string;
    roles?: string[];
  };
  [key: string]: any;
}

/**
 * HTTP Methods
 */
export type HttpMethod = 
  | 'GET' 
  | 'POST' 
  | 'PUT' 
  | 'PATCH' 
  | 'DELETE' 
  | 'OPTIONS' 
  | 'HEAD';

/**
 * API Response type
 */
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * Environment variables type definition
 */
export interface EnvVars {
  // Application
  NODE_ENV: 'development' | 'production' | 'test';
  
  // Server
  PORT?: string;
  HOST?: string;
  
  // Database
  DATABASE_URL?: string;
  
  // Auth
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  
  // Stripe
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  
  // AWS
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;
  AWS_S3_BUCKET?: string;
  
  // Other environment variables
  [key: string]: string | undefined;
}

/**
 * Type-safe environment variables access
 */
export const getEnv = (key: keyof EnvVars): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

/**
 * Type-safe environment variables access with default value
 */
export const getEnvWithDefault = <T extends string | number | boolean>(
  key: keyof EnvVars,
  defaultValue: T
): T extends string ? string : T extends number ? number : boolean => {
  const value = process.env[key];
  
  if (value === undefined) {
    return defaultValue as any;
  }
  
  if (typeof defaultValue === 'number') {
    return parseFloat(value) as any;
  }
  
  if (typeof defaultValue === 'boolean') {
    return (value === 'true') as any;
  }
  
  return value as any;
};
