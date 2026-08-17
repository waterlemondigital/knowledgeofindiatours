/**
 * Religion → visual identity map
 * Each entry has gradient colors (duotone) and a silhouette type
 * for the ImageWithFallback placeholder.
 */

export const RELIGION_COLORS = {
  Hinduism: {
    from: '#D4580A',
    to: '#6B1111',
    text: '#FFF5E6',
    label: 'Hinduism',
    silhouette: 'temple-spire',
  },
  Sikhism: {
    from: '#1A6B6B',
    to: '#0D2B4E',
    text: '#E8F8F8',
    label: 'Sikhism',
    silhouette: 'gurdwara-dome',
  },
  Islam: {
    from: '#1A5C3A',
    to: '#0D2B1E',
    text: '#E8F5EE',
    label: 'Islam',
    silhouette: 'dome',
  },
  Jainism: {
    from: '#9B7B1A',
    to: '#4A3200',
    text: '#FFF8E1',
    label: 'Jainism',
    silhouette: 'jain-temple',
  },
  Buddhism: {
    from: '#B35900',
    to: '#3D1A00',
    text: '#FFF3E0',
    label: 'Buddhism',
    silhouette: 'stupa',
  },
  'Spiritual / Multi-faith Pilgrimage Site': {
    from: '#5C3D8F',
    to: '#1E0F36',
    text: '#F0E8FF',
    label: 'Multi-faith',
    silhouette: 'temple-spire',
  },
};

export const DEFAULT_RELIGION_COLOR = {
  from: '#3D3528',
  to: '#1A1610',
  text: '#F5F0E8',
  label: 'Sacred Site',
  silhouette: 'temple-spire',
};

/**
 * Get the color config for a given religion string.
 * Does partial/case-insensitive matching so data variations still resolve.
 */
export function getReligionColor(religion) {
  if (!religion) return DEFAULT_RELIGION_COLOR;
  // Exact match first
  if (RELIGION_COLORS[religion]) return RELIGION_COLORS[religion];
  // Partial match
  const lower = religion.toLowerCase();
  for (const [key, value] of Object.entries(RELIGION_COLORS)) {
    if (lower.includes(key.toLowerCase())) return value;
  }
  return DEFAULT_RELIGION_COLOR;
}

/**
 * Badge accent color per religion (for UI pills/badges)
 */
export const RELIGION_BADGE = {
  Hinduism: { bg: '#FFF0E0', text: '#8B3A00', border: '#F4A025' },
  Sikhism:  { bg: '#E0F5F5', text: '#0D4040', border: '#1A8B8B' },
  Islam:    { bg: '#E0F0EA', text: '#0D3D26', border: '#1A8B5C' },
  Jainism:  { bg: '#FFF8E0', text: '#4A3200', border: '#D4A017' },
  Buddhism: { bg: '#FFF0E0', text: '#6B3300', border: '#B36B00' },
};

export function getReligionBadge(religion) {
  if (!religion) return { bg: '#F5F0E8', text: '#3D3528', border: '#C8B89A' };
  for (const [key, value] of Object.entries(RELIGION_BADGE)) {
    if (religion.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return { bg: '#F5F0E8', text: '#3D3528', border: '#C8B89A' };
}
