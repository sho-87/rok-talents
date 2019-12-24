/**
 * Return the mapping of value pairs and letters that is used for encoding/decoding
 *
 * @param {boolean} [lettersFirst=false] True if letters should be keys
 * @returns {Object} key/value of talent value pairs and letters
 */
export function getValueMap(lettersFirst = false) {
  const map = {
    '00': 'a',
    '01': 'b',
    '02': 'c',
    '03': 'd',
    '10': 'e',
    '11': 'f',
    '12': 'g',
    '13': 'h',
    '20': 'i',
    '21': 'j',
    '22': 'k',
    '23': 'l',
    '30': 'm',
    '31': 'n',
    '32': 'o',
    '33': 'p'
  };

  if (lettersFirst) {
    return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
  } else {
    return map;
  }
}

export default { getValueMap };
