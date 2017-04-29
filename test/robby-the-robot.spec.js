/**
 * WORKING LOG
 * Change the recursive approach to the BFS algorithm will give a better performance
 */

/* global describe it */

const assert = require('assert');

function Queue(nodes = []) {
  this.nodes = nodes;
  this.length = nodes.length;
}

Queue.prototype.dequeue = function dequeue() {
  const node = this.nodes.splice(0, 1);
  this.length = this.nodes.length;

  return node.pop();
};

Queue.prototype.enqueue = function enqueue(node) {
  this.nodes.push(node);
  this.length = this.nodes.length;
};

function Node(pos, weight = 0) {
  this.pos = x;
  this.weight = weight;
}

// function getDirections(from, to) {
//   const rules = {
//     u: { u: [], l: ['l'], d: ['r', 'r'], r: ['r'] },
//     l: { u: ['r'], l: [], d: ['l'], r: ['r', 'r'] },
//     d: { u: ['r', 'r', 'r'], l: ['l'], d: [], r: ['l'] },
//     r: { u: ['l'], l: ['l', 'l'], d: ['r'], r: [] },
//   };

//   return rules[from][to];
// }

function getCommands(field, power) {
  const length = Math.sqrt(field.length);
  const start = field.indexOf('S');

  const bfs = field;
  const queue = new Queue(new Node(start, 0));

  while(queue.length) {
    if (~'S.T'.indexOf(bfs.charAt(node.pos)))
  }

  return ''.split('');
}

// getCommands('S.......T', 10);

const configs = [
  {
    i: {
      f: 'T.S.',
      p: 10,
    },
    o: 'f',
  },
  {
    i: {
      f: 'S.......T',
      p: 10,
    },
    o: 'rffrff',
  },
  {
    i: {
      f: 'S.......T',
      p: 5,
    },
    o: '',
  }, {
    i: {
      f: 'S#.##...T',
      p: 20,
    },
    o: '',
  }, {
    i: {
      f: '.........S......######............#.......######......T.........',
      p: 100,
    },
    o: 'rfffffrfflffffflffflfffff',
  }, {
    i: {
      f: '................................................................###########.........#.........#.........#.#######.#.........#.#.......#.........#.#.#######.........#.#.#S.#............#.#.##.#............#.#....#............#.######............#...................###############........................................................................................................................T',
      p: 400,
    },
    o: 'rfrfflfffrffffrfffffflfflfffffffflfffffffflffffffffffffffrfffffff',
  },
];

describe('getCommands', () => {
  configs.forEach((config) => {
    it(`should return '${config.o}' given field '${config.i.f}' and power '${config.i.p}'`, () => {
      assert.deepEqual(getCommands(config.i.f, config.i.p).join(''), config.o);
    });
  });
});
