import loadTreeData from '../data/AllTrees';
import { isMultidimensional, arraysEqual } from '../utils';
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


test('All multidimensional talent values are same length', () => {
  let treeData = loadTreeData(dataVersion);
  let allSameLength = true;

  Object.keys(treeData).forEach(tree => {
    for (const talent of Object.keys(treeData[tree])) {
      if (isMultidimensional(treeData[tree][talent]['values'])) {
        const length = treeData[tree][talent]['values'][0].length;
        if (
          treeData[tree][talent]['values'].some(values => {
            return values.length !== length;
          })
        ) {
          allSameLength = false;
          break;
        }
      }
    }
  });

  expect(allSameLength).toBe(true);
});
