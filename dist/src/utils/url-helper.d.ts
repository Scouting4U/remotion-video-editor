/**
 * URL Helper Utility
 *
 * Provides functions to handle URL transformations for consistent
 * access between browser and SSR renderer.
 */
/**
 * Get the base URL from environment variables or default to localhost:3000
 */
export declare const getBaseUrl: () => string;
/**
 * Convert a relative URL to an absolute URL
 *
 * @param url The URL to convert
 * @returns Absolute URL with the correct base
 */
export declare const toAbsoluteUrl: (url: string) => string;
/**
 * Resolves a media URL to ensure it works in both browser and SSR contexts
 *
 * @param url The URL to resolve
 * @param baseUrl Optional base URL to use
 * @returns Properly formatted URL for the current context
 */
export declare const resolveMediaUrl: (url: string, baseUrl?: string) => string;
//# sourceMappingURL=url-helper.d.ts.map