/**
 * Type guard to check if a value is an Error
 */
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

/**
 * Type guard to check if a value is an object
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Type guard to check if a value is an array
 */
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

/**
 * Type guard to check if a value is a string
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Type guard to check if a value is a number
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Type guard to check if a value is a boolean
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

/**
 * Type guard to check if a value is a function
 */
export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown => {
  return typeof value === 'function';
};

/**
 * Type guard to check if a value is undefined
 */
export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined';
};

/**
 * Type guard to check if a value is null
 */
export const isNull = (value: unknown): value is null => {
  return value === null;
};

/**
 * Type guard to check if a value is null or undefined
 */
export const isNil = (value: unknown): value is null | undefined => {
  return isNull(value) || isUndefined(value);
};

/**
 * Type guard to check if a value is a Date
 */
export const isDate = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

/**
 * Type guard to check if a value is a Promise
 */
export const isPromise = <T = unknown>(value: unknown): value is Promise<T> => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'then' in value &&
    'catch' in value &&
    isFunction((value as Promise<unknown>).then) &&
    isFunction((value as Promise<unknown>).catch)
  );
};
