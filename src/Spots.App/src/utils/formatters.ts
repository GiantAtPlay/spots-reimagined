/**
 * Format large numbers with abbreviations (e.g., 1,234 -> "1.2k")
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}m`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

/**
 * Format currency values (e.g., 24.99 -> "$24.99")
 * @param amount - The numeric amount to format
 * @param currency - ISO 4217 currency code (defaults to 'USD'). Pass settingsStore.currency when available.
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format numbers with thousand separators (e.g., 12847 -> "12,847")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format percentage (e.g., 0.89 -> "89%")
 */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
