import { valuesToLetters, lettersToValues } from '../values';

test('encode and decode maps are the same length', () => {
  expect(Object.keys(valuesToLetters).length).toEqual(
    Object.keys(lettersToValues).length
  );
});

test('encode and decode maps contain the same values', () => {
  let inverted = {};
  Object.keys(valuesToLetters).forEach(key => {
    inverted[valuesToLetters[key]] = key;
  });

  expect(inverted).toEqual(lettersToValues);
});
