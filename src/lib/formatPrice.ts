const CURRENCY = 'USD';

/**
 * Format course price into a human-readable currency string.
 * Returns "Free" when the course price is 0.
 *
 * @param price - Numerical price amount
 * @returns Formatted currency string or "Free"
 */
export function formatPrice(price: number): string {
  if (price === 0) {
    return 'Free';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

