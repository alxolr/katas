(() => {
  "use strict";

  const assert = require('assert');

  function sumIntervals(intervals) {

    if (intervals.length > 1) {
      let next = 1,
      counter = 0;
      while (true) {

        let current = intervals[counter];

        if (current[1] > intervals[next][0]) {
          let interval = [Math.min(current[0], intervals[next][0]), Math.max(current[1], intervals[next][1])];
          intervals[counter] = interval;
          intervals.splice(next, 1);
          next++;
        } else {
          next++;
        }

        if (next >= intervals.length) {
          counter++;
          next = counter + 1;
        }
        if (counter >= intervals.length - 1) {
          break;
        }

      }
    }
    console.log(intervals);

    return intervals.reduce((prev, curr) => {
      return prev + (curr[1] - curr[0]);
    }, 0);
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
  }];

  describe('Sum Intervals', function() {
    configs.forEach(config => {
      it(`should return ${config.o} given ${config.i}`, function() {
        assert.equal(sumIntervals(config.i), config.o);
      });
    });
  });

})();
