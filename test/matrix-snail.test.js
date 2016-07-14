(() => {
  "use strict";

  const assert = require('assert');

  function snail(matrix) {
    let i = 0,
      j = 0,
      length = matrix[0].length,
      path = [];

    while (path.length < length * length) {
      do {
        console.log('test');
        path.push(matrix[i][j]);
        matrix[i][j] = 0;
        j++;
      } while (j < length && matrix[i][j] !== 0);

      j--;
      do {
        path.push(matrix[i][j]);
        matrix[i][j] = 0;
        i++;
      } while (i < length && matrix[i][j] !== 0);
      i--;
      do {
        path.push(matrix[i][j]);
        matrix[i][j] = 0;
        j--;
      } while (j >= 0 && matrix[i][j] !== 0);

      i++;
      do {
        path.push(matrix[i][j]);
        matrix[i][j] = 0;
        i--;
      } while (i >= 0 && matrix[i][j] !== 0);

      i++;
    }

    return path;
  }

  const configs = [{
    //   i: [[]],
    //   o: []
    // }, {
    //   i: [[1]],
    //   o: [1]
    // },
    i: [[1, 2], [3, 4]],
    o: [1, 2, 4, 3]
  }];

  describe('Snail', () => {
    configs.forEach(config => {
      it(`should return ${config.o} given ${config.i}`, () => {
        assert.equal(snail(config.i), config.o);
      });
    });
  });

})();
