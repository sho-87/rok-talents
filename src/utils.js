/**
 * Check if array is nested/multidimensional
 *
 * @param {Array} arr array to check for nesting
 * @returns {Boolean} Boolean indicating whether array is multidimensional
 */
export function isMultidimensional(arr) {
  return arr.filter(Array.isArray).length !== 0;
}

/**
 * Get maximum number of spendable points for a talent
 *
 * @param {Array} values array of values for a given talent
 * @returns {Number} Number of maximum spendable points
 */
export function getMaxTalentCount(values) {
  let max;
  if (!isMultidimensional(values)) {
    max = values.length;
  } else {
    //FIXME: this can break if nested arrays are different lengths (but shouldn't ever be the case...)
    max = values[0].length;
  }
  return max;
}

export default { isMultidimensional, getMaxTalentCount };
