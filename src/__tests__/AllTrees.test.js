import loadTreeData from '../data/AllTrees';
import { isMultidimensional } from '../utils';
import { dataVersion } from '../../package.json';

test('all multidimensional talent values are same length', () => {
  let treeData = loadTreeData(dataVersion);
  let allSameLength = true;

  Object.keys(treeData).forEach(tree => {
    for (const talent of Object.keys(treeData[tree])) {
      if (isMultidimensional(treeData[tree][talent]['values'])) {
        const length = treeData[tree][talent]['values'][0].length;
        if (
          treeData[tree][talent]['values'].some(values => {
            console.log(values.length);
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
