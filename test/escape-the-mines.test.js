/* global describe it */
const assert = require('assert');

function reorder(map) {
  const reordered = [];
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      reordered[j][i] = map[i][j];
    }
  }

  return reordered;
}

function solve(map, start, end) {
  const reordered = reorder(map);
  console.log(reordered);

  return [];
}

const configurations = [
  {
    i: {
      m: [[true, false], [true, true]], s: { x: 0, y: 0 }, e: { x: 1, y: 1 },
    },
    o: ['right', 'down'],
  },
];

describe('Escape the mines', () => {
  configurations.forEach((config) => {
    it(`should return ${config.o} given ${config.i.m}`, () => {
      assert.deepEqual(solve(config.i.m, config.i.s, config.i.e), config.o);
    });
  });
});

