import { valuesToLetters, lettersToValues } from './values';
import Commanders from './data/commanders.json';
import { title } from '../package.json';

/**
 * Sum all values of an array
 *
 * @param {Number[]} arr Array to calculate sum of
 * @returns {Number} Sum of the array
 */
export function sumArray(arr) {
  return arr.reduce((partial, a) => partial + a, 0);
}

/**
 * Check if two arrays are equal
 *
 * @param {array} a First array
 * @param {array} b Second array
 * @returns {boolean} Are the two arrays equal?
 */
export function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  // eslint-disable-next-line
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Check if all array elements are different/unique
 *
 * @param {Array} arr Array to check
 * @returns {Boolean} Whether all elements are different/unique
 */
export function arrayAllUnique(arr) {
  const tmp = new Set(arr);
  if (tmp.size === arr.length) {
    return true;
  }
  return false;
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
 * Set the window title with commander name and talents spent in each tree
 *
 * @param {string} commander Full name of the commander
 * @param {Number[]} r Array of red tree values
 * @param {Number[]} y Array of yellow tree values
 * @param {Number[]} b Array of blue tree values
 * @param {string} [sep='/'] Separator to use between point totals
 */
export function setTitle(commander, r, y, b, sep = '/') {
  const newTitle = `${createSummaryString(commander, r, y, b, sep)} | ${title}`;
  document.title = newTitle;
}

/**
 * Create a string with commander name and talents spent in each tree
 *
 * @param {string} commander Full name of the commander
 * @param {Number[]} r Array of red tree values
 * @param {Number[]} y Array of yellow tree values
 * @param {Number[]} b Array of blue tree values
 * @param {string} [sep='/'] Separator to use between point totals
 * @returns {string} String summarizing the commander and points spent
 */
export function createSummaryString(commander, r, y, b, sep = '/') {
  const rSpent = sumArray(r);
  const ySpent = sumArray(y);
  const bSpent = sumArray(b);
  const name = Commanders[commander].shortName || commander;
  return `${name} (${rSpent}${sep}${ySpent}${sep}${bSpent})`;
}

/**
 * Get current talent URL
 *
 * @param {Boolean} embed Should returned URL be embeddable?
 * @returns {String} Current/embeddable URL
 */
export function getURL(embed = false) {
  if (embed) {
    return `${window.location.origin}/embed/${window.location.search}`;
  } else {
    return `${window.location.origin}/${window.location.search}`;
  }
}

/**
 * Check whether app is launched in embed mode
 *
 * @param {String} path URL path to check for embed
 * @returns {Boolean} Whether URL path contains an embed directive
 */
export function isEmbed(path) {
  return path.includes('embed') ? true : false;
}

/**
 * Detect if device is touch enabled
 *
 * @returns {Boolean} Whether device is touch or not
 */
export function isTouchDevice() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check whether user is new or returning
 *
 * @returns {Boolean} Whether user is new or returning
 */
export function isNewUser() {
  if (
    !localStorage.getItem('isNewUser') ||
    JSON.parse(localStorage.getItem('isNewUser') === true)
  ) {
    localStorage.setItem('isNewUser', false);
    return true;
  } else {
    return false;
  }
}

/**
 * Check whether release is an upgrade. Ignores hotfix/patch releases
 *
 * @param {String} oldVer SemVer string of old version
 * @param {String} newVer SemVer string of new version
 * @returns {Boolean} Whether newVer is an upgrade
 */
export function isUpgrade(oldVer, newVer) {
  // New users are never considered upgrades
  if (!localStorage.getItem('isNewUser')) {
    return false;
  }

  const [oldMajor, oldMinor] = oldVer.split('.').map(Number);
  const [newMajor, newMinor] = newVer.split('.').map(Number);

  if (newMajor > oldMajor || newMinor > oldMinor) {
    return true;
  } else {
    return false;
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
  arraysEqual,
  arrayAllUnique,
  isMultidimensional,
  getMaxTalentCount,
  replaceTalentText,
  setTitle,
  createSummaryString,
  getURL,
  isEmbed,
  isTouchDevice,
  isNewUser,
  isUpgrade,
  encode,
  decode
};
