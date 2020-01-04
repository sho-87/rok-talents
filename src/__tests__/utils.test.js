import {
  sumArray,
  isMultidimensional,
  getMaxTalentCount,
  replaceTalentText,
  encode,
  decode
} from '../utils';

test('shallow arrays sum correctly', () => {
  const arr = [1, 2, 3];
  expect(sumArray(arr)).toEqual(6);
});

test('nested arrays sum correctly', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  expect(sumArray([...arr1, ...arr2])).toEqual(21);
});

test('arrays are not multidimensional', () => {
  const arr = [1, 2, 3];
  expect(isMultidimensional(arr)).toEqual(false);
});

test('nested arrays are multidimensional', () => {
  const arr = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  expect(isMultidimensional(arr)).toEqual(true);
});

test('max number of single dimensional talent values is correct', () => {
  const arr = [1, 2, 3];
  expect(getMaxTalentCount(arr)).toEqual(3);
});

test('max number of multi dimensional talent values is correct', () => {
  const arr = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  expect(getMaxTalentCount(arr)).toEqual(3);
  expect(getMaxTalentCount(arr)).not.toEqual(2);
});

test('single dimensional text is replaced correctly', () => {
  const values = [5, 6];
  const text = 'String containing value of ${1}';
  expect(replaceTalentText(text, values, 0)).toEqual(
    'String containing value of 5'
  );
});

test('single dimensional text is replaced correctly globally', () => {
  const values = [5, 6];
  const text = 'String containing double value of ${1} and ${1}';
  expect(replaceTalentText(text, values, 0)).toEqual(
    'String containing double value of 5 and 5'
  );
});

test('multi dimensional text is replaced correctly', () => {
  const values = [
    [2, 9],
    [4, 7]
  ];
  const text = 'String containing values of ${1} and ${2}';
  expect(replaceTalentText(text, values, 1)).toEqual(
    'String containing values of 9 and 7'
  );
});

test('multi dimensional text is replaced correctly globally', () => {
  const values = [
    [2, 9],
    [4, 7]
  ];
  const text = 'String containing values of ${1} and ${2}, and again ${1}';
  expect(replaceTalentText(text, values, 1)).toEqual(
    'String containing values of 9 and 7, and again 9'
  );
});

test('string is encoded correctly', () => {
  const text = '133223333302302040';
  expect(encode(text)).toEqual('irnsscpkv');
});

test('string is decoded correctly', () => {
  const text = 'irnsscpkv';
  expect(decode(text)).toEqual('133223333302302040');
});
