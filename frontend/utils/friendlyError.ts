/**
 * Maps raw API / network error messages to user-friendly strings.
 */

const ERROR_MAP: [RegExp, string][] = [
  [/invalid token/i, 'Your session has expired. Please sign in again.'],
  [/token expired/i, 'Your session has expired. Please sign in again.'],
  [/unauthorized/i, 'Your session has expired. Please sign in again.'],
  [/not found/i, "We couldn't find what you're looking for. It may have been removed."],
  [/already exists/i, 'This already exists. Please try a different name.'],
  [/rate limit/i, 'Too many requests. Please wait a moment and try again.'],
  [/internal server error/i, 'Something went wrong on our end. Please try again.'],
  [/network error/i, 'Unable to connect. Please check your internet connection.'],
  [/timeout/i, 'The request took too long. Please try again.'],
];

/**
 * Convert a raw error into a user-friendly message.
 * Falls back to `fallback` if no pattern matches.
 */
export function friendlyError(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  const raw = error instanceof Error ? error.message : typeof error === 'string' ? error : '';

  if (!raw) return fallback;

  for (const [pattern, friendly] of ERROR_MAP) {
    if (pattern.test(raw)) return friendly;
  }

  return fallback;
}
