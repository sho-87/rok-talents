import Commanders from '../data/commanders.json';
import { arrayAllUnique } from '../utils';

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

test('All commander guides are unique', () => {
  let guides = [];

  Object.keys(Commanders).forEach(commander => {
    if (Commanders[commander]['guide']) {
      guides.push(Commanders[commander]['guide']);
    }
  });

  expect(arrayAllUnique(guides)).toEqual(true);
});
