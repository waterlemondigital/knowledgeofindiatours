/**
 * Filter helpers — all derived dynamically from the dataset.
 * Works with any shape of destinations array (any religion, state, category).
 */

/** Normalize state — handle data quirks like "Jaipur" meaning Rajasthan */
export function normalizeState(state) {
  if (!state) return 'India';
  if (state === 'Jaipur') return 'Rajasthan';
  return state;
}

/** Get unique, sorted state values from the dataset */
export function getUniqueStates(destinations) {
  const states = destinations
    .map((d) => normalizeState(d.state))
    .filter(Boolean);
  return [...new Set(states)].sort();
}

/** Get unique religion values from the dataset */
export function getUniqueReligions(destinations) {
  const religions = destinations
    .map((d) => d.religion)
    .filter(Boolean);
  return [...new Set(religions)].sort();
}

/** Get unique category values from the dataset (top-level, before first "/") */
export function getUniqueCategories(destinations) {
  const cats = destinations
    .map((d) => (d.category ? d.category.split('/')[0].trim() : null))
    .filter(Boolean);
  return [...new Set(cats)].sort();
}

/**
 * Main filter function.
 * @param {Array} destinations - full dataset
 * @param {{ search: string, state: string, religion: string }} filters
 * @returns filtered array
 */
export function filterDestinations(destinations, { search = '', state = '', religion = '' } = {}) {
  const searchLower = search.toLowerCase().trim();
  const stateLower = state.toLowerCase().trim();
  const religionLower = religion.toLowerCase().trim();

  return destinations.filter((d) => {
    // Search: name, also_known_as, state, category, about
    if (searchLower) {
      const haystack = [
        d.name,
        d.display_title,
        d.also_known_as,
        d.state,
        d.district,
        d.religion,
        d.category,
        d.about,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(searchLower)) return false;
    }

    // State filter
    if (stateLower) {
      const destState = normalizeState(d.state).toLowerCase();
      if (destState !== stateLower) return false;
    }

    // Religion filter
    if (religionLower) {
      const destReligion = (d.religion || '').toLowerCase();
      if (!destReligion.includes(religionLower) && !religionLower.includes(destReligion)) {
        // Also check if it's a full-string match
        if (destReligion !== religionLower) return false;
      }
    }

    return true;
  });
}
