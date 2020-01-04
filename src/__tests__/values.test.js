import { valuesToLetters, lettersToValues } from '../values';

test('encode and decode maps are the same length', () => {
  expect(Object.keys(valuesToLetters).length).toEqual(
    Object.keys(lettersToValues).length
  );
});
