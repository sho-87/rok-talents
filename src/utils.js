import { valuesToLetters, lettersToValues } from './values';
import Commanders from './data/Commanders.json';

/**
 * Sum all values of an array
 *
 * @export
 * @param {Number[]} arr Array to calculate sum of
 * @returns {Number} Sum of the array
 */
export function sumArray(arr) {
  return arr.reduce((partial, a) => partial + a, 0);
}

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
 * @param {Array} talentValues array of values for a given talent
 * @returns {Number} Number of maximum spendable points
 */
export function getMaxTalentCount(talentValues) {
  let max;
  if (!isMultidimensional(talentValues)) {
    max = talentValues.length;
  } else {
    // All multidimensional arrays should be same length (checked by unit test)
    max = talentValues[0].length;
  }
  return max;
}

/**
 * Replace talent text placeholders (e.g. `${1}`) with selected values
 *
 * @param {string} text Full talent text
 * @param {Array} talentValues Array (or multidimensional array) of values for the talent
 * @param {Number} replacementIdx Index of the value to use as replacement
 * @returns {string} Talent text with placeholders replaced
 */
export function replaceTalentText(text, talentValues, replacementIdx) {
  let newText = text;

  if (isMultidimensional(talentValues)) {
    for (let i = 0; i < talentValues.length; i++) {
      let re = new RegExp(`\\$\\{${i + 1}\\}`, 'g');
      newText = newText.replace(re, talentValues[i][replacementIdx]);
    }
  } else {
    newText = newText.replace(/\$\{1\}/g, talentValues[replacementIdx]);
  }

  return newText;
}

  /**
   * Get the full name of a talent tree (e.g. Skill, Garrison). The name
   * depends on the tree color and the selected commander
   *
   * @param {string} color Color of the tree to retrieve the name for
   * @param {string} commander Name of the commander
   * @returns {string} full tree name
   */
  export function getTreeName(color, commander) {
    const commanderData = Commanders[commander];
    if (commanderData) {
      return commanderData[color];
    }
  }

/**
 * Encode/compress the passed text
 *
 * @param {string} text Text to be encoded/compressed
 * @returns {string} Encoded/compressed version of the text
 */
export function encode(text) {
  const encoded = text
    .match(/(..?)/g)
    .map(v => {
      return valuesToLetters.hasOwnProperty(v) ? valuesToLetters[v] : v;
    })
    .join('');

  return encoded;
}

/**
 * Decode encoded text
 *
 * @param {string} encoded Encoded form of the text
 * @returns {string} Decoded string
 */
export function decode(encoded) {
  const decoded = encoded
    .split('')
    .map(k => {
      return lettersToValues.hasOwnProperty(k) ? lettersToValues[k] : k;
    })
    .join('');

  return decoded;
}

export default {
  sumArray,
  isMultidimensional,
  getMaxTalentCount,
  replaceTalentText,
  encode,
  decode
};
