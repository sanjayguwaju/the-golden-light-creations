/**
 * Utility functions for Product availability status and text sanitization.
 */

export function isProductComingSoon(product: any): boolean {
  if (!product) return false;

  // Direct boolean flag in Payload CMS
  if (product.isComingSoon === true) return true;

  // Availability status select field in Payload CMS
  if (
    product.availability === 'coming_soon' ||
    product.availability === 'under_formulation' ||
    product.availability === 'in_development'
  ) {
    return true;
  }

  return false;
}

/**
 * Returns null if the text is empty or contains placeholder Lorem Ipsum text.
 */
export function sanitizePlaceholderText(text: string | null | undefined): string | null {
  if (!text) return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase().includes('lorem ipsum')) {
    return null;
  }
  return trimmed;
}

/**
 * Checks if a rich text object or string contains Lorem Ipsum.
 */
export function hasLoremIpsumRichText(description: any): boolean {
  if (!description) return false;
  const str = typeof description === 'string' ? description : JSON.stringify(description);
  return str.toLowerCase().includes('lorem ipsum');
}
