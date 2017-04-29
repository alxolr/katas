/**
 * WORKING LOG
 * Change the recursive approach to the BFS algorithm will give a better performance
 */

// Create a special unique validation queue

/* global describe it */

const assert = require('assert');

function Queue(nodes = [], fn) {
  this.nodes = nodes;
  this.length = nodes.length;
  this.exists = fn;
}

Queue.prototype.dequeue = function dequeue() {
  const node = this.nodes.splice(0, 1);
  this.length = this.nodes.length;

  return node.pop();
};

function inQueue(node) {
  return this
    .nodes.filter(item =>
      Object.keys(item)
        .reduce((isSame, property) => isSame && item[property] === node[property], true))
    .length;
}

Queue.prototype.enqueue = function enqueue(node) {
  const exists = inQueue.call(this, node);
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

function Move(position, direction, weight) {
  this.position = position;
  this.direction = direction;
  this.weight = weight;
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

function resolveEnergy(field, optimisedRoad) {
  const length = Math.sqrt(field.length);
  const start = field.indexOf('S');
  const copy = Array.from(optimisedRoad);
  let moves = '';
  const finish = field.indexOf('T');

  const queue = new Queue([new Move(start, 'u', 0)]);

  while (queue.length) {
    const move = queue.dequeue();
    copy[move.position] = '*';
    const position = move.position;
    const candidates = [];

    const up = position - length;
    if (up >= 0 && copy[up] !== '*') {
      candidates.push({
        position: up,
        direction: 'u',
        weight: copy[up],
      });
    }

    const down = position + length;
    if (down < field.length && copy[down] !== '*') {
      candidates.push({
        position: down,
        direction: 'd',
        weight: copy[down],
      });
    }

    const left = position - 1;
    if (left > 0 && (position + 1) % length !== 1 && copy[left] !== '*') {
      candidates.push({
        position: left,
        direction: 'l',
        weight: copy[left],
      });
    }

    const right = position + 1;
    if (right < field.length && (position + 1) % length !== 0 && copy[right] !== '*') {
      candidates.push({
        position: right,
        direction: 'r',
        weight: copy[right],
      });
    }

    const winner = candidates
      .filter(item => item.weight > move.weight)
      .sort((a, b) => {
        if (a.weight > b.weight) return 1;
        if (a.weight === b.weight) return 0;
        if (a.weight < b.weight) return -1;
      })[0];

    moves = `${moves}${getDirectionPath(move.direction, winner.direction).join('')}f`;

    if (winner.position === finish) break;

    queue.enqueue(new Move(winner.position, winner.direction, winner.weight));
  }

  return moves;
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
  while (iterations <= power * 2 && queue.length) {
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
      const optimisedRoad = routeCosts.map((item, index) => item + turnCosts[index]);
      return resolveEnergy(field, optimisedRoad).split('');
    }
  }

  return [''];
}

getCommands('.........S......######............#.......######......T.........', 100);

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
