/**
 * Returns current date in 'YYYY-MM-DD' format (UTC).
 */
export function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}
