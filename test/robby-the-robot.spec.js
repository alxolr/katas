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
  const exists = this
    .nodes
    .filter(curr => curr.pos === node.pos && curr.weight === node.weight)
    .length;
  if (!exists) {
    this.nodes.push(node);
    this.length = this.nodes.length;
  }
};

function Node(pos, weight = 0) {
  this.pos = pos;
  this.weight = weight;
}

function Turn(position, weight = 0, direction = 'u') {
  this.position = position;
  this.weight = weight;
  this.direction = direction;
}

function calculateRouteCosts(field, power) {
  const length = Math.sqrt(field.length);
  const start = field.indexOf('S');
  let visited = field;

  const bfs = new Array(field.length).fill(Infinity);
  const queue = new Queue([new Node(start, 0)]);
  let iterations = 0;
  while (iterations <= power && queue.length) {
    iterations += 1;
    const node = queue.dequeue();
    const pos = node.pos;

    if (~'S.T'.indexOf(visited.charAt(node.pos))) {
      if (bfs[pos] > node.weight) {
        bfs[pos] = node.weight;
        visited = `${visited.substr(0, pos)}*${visited.substr(pos + 1)}`;
      }
    }

    const up = pos - length;
    if (up >= 0 && ~'.T'.indexOf(visited.charAt(up))) {
      queue.enqueue(new Node(up, node.weight + 1));
    }

    const down = pos + length;
    if (down < field.length && ~'.T'.indexOf(visited.charAt(down))) {
      queue.enqueue(new Node(down, node.weight + 1));
    }

    const left = pos - 1;
    if (left > 0 && (pos + 1) % length !== 1 && ~'.T'.indexOf(visited.charAt(left))) {
      queue.enqueue(new Node(left, node.weight + 1));
    }

    const right = pos + 1;
    if (right < field.length && (pos + 1) % length !== 0 && ~'.T'.indexOf(visited.charAt(right))) {
      queue.enqueue(new Node(right, node.weight + 1));
    }
  }

  return bfs;
}

function getDirectionPath(location, direction) {
  const rules = {
    u: { u: [], l: ['l'], d: ['r', 'r'], r: ['r'] },
    l: { u: ['r'], l: [], d: ['l'], r: ['r', 'r'] },
    d: { u: ['r', 'r', 'r'], l: ['l'], d: [], r: ['l'] },
    r: { u: ['l'], l: ['l', 'l'], d: ['r'], r: [] },
  };

  return rules[location][direction];
}

function countTurns(from, to) {
  return getDirectionPath(from, to).length + 1;
}

function calculateTurnCosts(field, power) {
  const length = Math.sqrt(field.length);
  const start = field.indexOf('S');
  let visited = field;

  const bfs = new Array(field.length).fill(Infinity);
  const queue = new Queue([new Turn(start)]);

  let iterations = 0;
  while (iterations <= power && queue.length) {
    iterations += 1;
    const turn = queue.dequeue();
    const position = turn.position;

    if (~'S.T'.indexOf(visited.charAt(turn.position))) {
      if (bfs[position] > turn.weight) {
        bfs[position] = turn.weight;
        visited = `${visited.substr(0, position)}*${visited.substr(position + 1)}`;
      }
    }

    const up = position - length;
    if (up >= 0 && ~'.T'.indexOf(visited.charAt(up))) {
      queue.enqueue(new Turn(up, turn.weight + countTurns(turn.direction, 'u'), 'u'));
    }

    const down = position + length;
    if (down < field.length && ~'.T'.indexOf(visited.charAt(down))) {
      queue.enqueue(new Turn(down, turn.weight + countTurns(turn.direction, 'd'), 'd'));
    }

    const left = position - 1;
    if (left > 0 && (position + 1) % length !== 1 && ~'.T'.indexOf(visited.charAt(left))) {
      queue.enqueue(new Turn(left, turn.weight + countTurns(turn.direction, 'l'), 'l'));
    }

    const right = position + 1;
    if (right < field.length && (position + 1) % length !== 0 && ~'.T'.indexOf(visited.charAt(right))) {
      queue.enqueue(new Turn(right, turn.weight + countTurns(turn.direction, 'r'), 'r'));
    }
  }

  return bfs;
}

function getCommands(field, power) {
  const routeCosts = calculateRouteCosts(field, power);
  if (routeCosts[field.indexOf('T')] < Infinity) { // there is a route to the target
    const turnCosts = calculateTurnCosts(field, power);

    if (turnCosts[field.indexOf('T')] < Infinity) { // there is enough energy to the target
      console.log(routeCosts);
      console.log(turnCosts);
      const optimisedMap = routeCosts.map((item, index) => item + turnCosts[index]);
      
      console.log(optimisedMap);

      return ['f'];
    }
  }

  return [''];
}

console.log(getCommands('S.......T', 10));

// const configs = [
//   {
//     i: {
//       f: 'T.S.',
//       p: 10,
//     },
//     o: 'f',
//   },
//   {
//     i: {
//       f: 'S.......T',
//       p: 10,
//     },
//     o: 'rffrff',
//   },
//   {
//     i: {
//       f: 'S.......T',
//       p: 5,
//     },
//     o: '',
//   }, {
//     i: {
//       f: 'S#.##...T',
//       p: 20,
//     },
//     o: '',
//   }, {
//     i: {
//       f: '.........S......######............#.......######......T.........',
//       p: 100,
//     },
//     o: 'rfffffrfflffffflffflfffff',
//   }, {
//     i: {
//       f: '................................................................###########.........#.........#.........#.#######.#.........#.#.......#.........#.#.#######.........#.#.#S.#............#.#.##.#............#.#....#............#.######............#...................###############........................................................................................................................T',
//       p: 400,
//     },
//     o: 'rfrfflfffrffffrfffffflfflfffffffflfffffffflffffffffffffffrfffffff',
//   },
// ];

// describe('getCommands', () => {
//   configs.forEach((config) => {
//     it(`should return '${config.o}' given field '${config.i.f}' and power '${config.i.p}'`, () => {
//       assert.deepEqual(getCommands(config.i.f, config.i.p).join(''), config.o);
//     });
//   });
// });
