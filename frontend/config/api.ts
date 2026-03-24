// Simplified for interview context — in production this detects platform and environment

export const API_BASE_URL = 'http://localhost:8080';
export const API_VERSION = '/api/v1';

const STORAGE_BASE_URL = 'http://localhost:9000';

/**
 * Resolves an image URL from the API.
 * - Relative paths (e.g. /ootfits/wardrobe/xyz.jpg) → prepend storage base URL
 * - Absolute URLs → rewrite host to current storage base
 *
 * Images are stored as relative paths in the database and resolved at fetch time.
 */
export const resolveImageURL = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('/')) {
    return `${STORAGE_BASE_URL}${url}`;
  }
  try {
    const parsed = new URL(url);
    return `${STORAGE_BASE_URL}${parsed.pathname}`;
  } catch {
    return url;
  }
};
