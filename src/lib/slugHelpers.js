/**
 * Slug & lookup helpers
 */

/** Find a destination by its slug */
export function findBySlug(destinations, slug) {
  return destinations.find((d) => d.slug === slug) || null;
}

/** Find destinations whose name appears in a nearby_places array of another destination */
export function findRelatedByName(destinations, name) {
  if (!name) return null;
  const lower = name.toLowerCase().trim();
  return destinations.find((d) =>
    d.name.toLowerCase().includes(lower) ||
    (d.display_title && d.display_title.toLowerCase().includes(lower))
  ) || null;
}

/** Clean a nearby place string — remove parenthetical source refs */
export function cleanNearbyPlace(str) {
  // Remove trailing source/URL refs in parens and trailing punctuation
  return str
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.,;:]+$/, '')
    .trim();
}

/** Image path helpers */
export function getImagePath(slug, type = 'card') {
  return `/images/destinations/${slug}/${type}.jpg`;
}

/** Get all gallery image paths */
export function getGalleryPaths(slug) {
  return [1, 2, 3, 4].map((n) => ({
    type: `gallery-${n}`,
    path: getImagePath(slug, `gallery-${n}`),
  }));
}
