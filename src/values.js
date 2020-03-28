/** Maximum number of talent points available in the game */
export const maxPoints = 74;

/**
 * Get default state values for new application instance. Also checks
 * local storage for saved settings values
 *
 * @param {Number} dataVersion Data version number to use
 * @param {Boolean} isEmbed Is app in embed mode?
 * @returns {object} Object containing blank state values
 */
export function getEmptyState(dataVersion, isEmbed) {
  let storage;

  if (isEmbed) {
    // Set default settings for embedded mode
    storage = {
      nodeSize: 'L',
      isShownInfoPanel: false,
      isShownValues: true,
      isShownTotals: true,
      isScreenshotStats: false,
      isSpeedMode: false,
      isInstantZero: false,
      isInstantMax: false,
      isAutoFill: false,
      isShownMouseXY: false,
      isShownTalentID: false
    };
  } else {
    // Get/set default settings for regular mode
    const isShownInfoPanel = JSON.parse(
      localStorage.getItem('isShownInfoPanel')
    );
    const isShownValues = JSON.parse(localStorage.getItem('isShownValues'));
    const isShownTotals = JSON.parse(localStorage.getItem('isShownTotals'));
    const isScreenshotStats = JSON.parse(
      localStorage.getItem('isScreenshotStats')
    );
    const isSpeedMode = JSON.parse(localStorage.getItem('isSpeedMode'));
    const isInstantZero = JSON.parse(localStorage.getItem('isInstantZero'));
    const isInstantMax = JSON.parse(localStorage.getItem('isInstantMax'));
    const isAutoFill = JSON.parse(localStorage.getItem('isAutoFill'));
    const isShownMouseXY = JSON.parse(localStorage.getItem('isShownMouseXY'));
    const isShownTalentID = JSON.parse(localStorage.getItem('isShownTalentID'));

    // Default values
    storage = {
      nodeSize: localStorage.getItem('nodeSize') || 'M',
      isShownInfoPanel: isShownInfoPanel === null ? true : isShownInfoPanel,
      isShownValues: isShownValues === null ? true : isShownValues,
      isShownTotals: isShownTotals === null ? true : isShownTotals,
      isScreenshotStats: isScreenshotStats === null ? false : isScreenshotStats,
      isSpeedMode: isSpeedMode === null ? false : isSpeedMode,
      isInstantZero: isInstantZero === null ? false : isInstantZero,
      isInstantMax: isInstantMax === null ? false : isInstantMax,
      isAutoFill: isAutoFill === null ? false : isAutoFill,
      isShownMouseXY: isShownMouseXY === null ? false : isShownMouseXY,
      isShownTalentID: isShownTalentID === null ? false : isShownTalentID
    };
  }

  return {
    showProgress: true,
    dataVersion: dataVersion,
    commander: '',
    red: [],
    yellow: [],
    blue: [],
    ...storage
  };
}

/** Mapping value pairs to letters for encoding */
export const valuesToLetters = {
  '00': 'a',
  '01': 'b',
  '02': 'c',
  '03': 'd',
  '04': 'e',
  '10': 'f',
  '11': 'g',
  '12': 'h',
  '13': 'i',
  '14': 'j',
  '20': 'k',
  '21': 'l',
  '22': 'm',
  '23': 'n',
  '24': 'o',
  '30': 'p',
  '31': 'q',
  '32': 'r',
  '33': 's',
  '34': 't',
  '35': 'u',
  '40': 'v',
  '41': 'w',
  '42': 'x',
  '43': 'y',
  '44': 'z'
};

/** Mapping letters to value pairs for decoding */
export const lettersToValues = {
  a: '00',
  b: '01',
  c: '02',
  d: '03',
  e: '04',
  f: '10',
  g: '11',
  h: '12',
  i: '13',
  j: '14',
  k: '20',
  l: '21',
  m: '22',
  n: '23',
  o: '24',
  p: '30',
  q: '31',
  r: '32',
  s: '33',
  t: '34',
  u: '35',
  v: '40',
  w: '41',
  x: '42',
  y: '43',
  z: '44'
};
