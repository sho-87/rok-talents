import Commanders from '../data/Commanders.json';

test('Commander keys are all present and unique', () => {
  const correctIDs = Array.from(
    { length: Object.keys(Commanders).length },
    (v, i) => i + 1
  );

  let ids = [];

  Object.keys(Commanders).forEach(commander => {
    ids.push(parseInt(Commanders[commander]['id']));
  });

  expect(ids).toEqual(correctIDs);
});
