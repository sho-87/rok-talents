import loadTreeData from '../data/AllTrees';
import { arraysEqual } from '../utils';
import { dataVersion } from '../../package.json';

const treeData = loadTreeData(dataVersion);

test('All tree data is sufficiently long', () => {
  const isLongEnough = Object.keys(treeData).every(tree => {
    return Object.keys(treeData[tree]).length > 10;
  });

  expect(isLongEnough).toEqual(true);
});

test('No repeat IDs', () => {
  const noRepeats = Object.keys(treeData).every(tree => {
    const correctIDs = Array.from(
      { length: Object.keys(treeData[tree]).length },
      (v, i) => i + 1
    );

    const ids = Object.keys(treeData[tree]).map(function(x) {
      return parseInt(x);
    });

    return arraysEqual(ids, correctIDs);
  });

  expect(noRepeats).toEqual(true);
});
