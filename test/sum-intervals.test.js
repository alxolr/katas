(() => {
  "use strict";

  const assert = require('assert');

  function sumIntervals(intervals) {


    reduce();
    console.log('post', intervals);
    return intervals.reduce((prev, curr) => {
      return prev + (curr[1] - curr[0]);
    }, 0);



    function reduce() {
      for (let i = 0; i < intervals.length - 1; i++) {
        for (let j = 1; j < intervals.length; j++) {
          if (i !== j) {
            let localMerge = mergeIntervals(intervals[i], intervals[j]);
            if (localMerge !== null) {
              intervals[i] = localMerge;
              intervals.splice(j, 1);
              reduce();
            }
          }
        }
      }
      return;
    }
  }

  function mergeIntervals(a, b) {
    // console.log(a, b);
    let [i, j] = a;
    let [x, y] = b;

    if ((j >= x && i < h)) {
      return [Math.min(i, x), Math.max(j, y)];
    } else {
      return null;
    }
  }
  const configs = [{
    i: [[1, 4]],
    o: 3
    }, {
    i: [[1, 4], [3, 5]],
    o: 4
    }, {
    i: [[1, 4], [7, 10], [3, 5]],
    o: 7
    }, {
    i: [[1, 2], [1, 5], [6, 10], [8, 12]],
    o: 10
      }, {
    i: [[1, 2], [3, 4], [3, 9], [3, 12]],
    o: 10
  }, {
    i: [[11, 15], [6, 10], [1, 2]],
    o: 9
  }];

  const cfgs = [{
    i: [[1, 4], [3, 5]],
    o: [1, 5]
    }, {
    i: [[1, 3], [3, 5]],
    o: [1, 5]
    }, {
    i: [[2, 3], [2, 5]],
    o: [2, 5]
    }, {
    i: [[1, 4], [1, 9]],
    o: [1, 9]
  }, {
    i: [[1, 3], [4, 5]],
    o: null
  }, {
    i: [[1, 2], [1, 5]],
    o: [1, 5]
  }, {
    i: [[11, 15], [6, 10]],
    o: null
  }];

  describe('mergeIntervals', () => {
    cfgs.forEach(cfg => {
      it(`should return ${cfg.o} given ${cfg.i}`, () => {
        let [a, b] = cfg.i;
        assert.deepEqual(mergeIntervals(a, b), cfg.o);
      });
    });
  });

  describe('Sum Intervals', function() {
    configs.forEach(config => {
      it(`should return ${config.o} given ${config.i}`, function() {
        assert.equal(sumIntervals(config.i), config.o);
      });
    });
  });

})();
