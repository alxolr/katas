/**
 * WORKING LOG
 * Change the recursive aproach to the BFS algorithm will give a better performance
 */

/* global describe it */

const assert = require('assert');
const Queue = require('../modules/queue');

function Node(x, y, weight = 0) {
  this.x = x;
  this.y = y;
  this.weight = weight;
}

function getNext(matrix, i, j) {
  const values = [];
  if (matrix[i - 1] !== undefined && matrix[i - 1][j] !== undefined) {
    values.push({
      xy: [i - 1, j],
      value: matrix[i - 1][j],
    });
  }
  if (matrix[i + 1] !== undefined && matrix[i + 1][j] !== undefined) {
    values.push({
      xy: [i + 1, j],
      value: matrix[i + 1][j],
    });
  }
  if (matrix[i] !== undefined && matrix[i][j + 1] !== undefined) {
    values.push({
      xy: [i, j + 1],
      value: matrix[i][j + 1],
    });
  }
  if (matrix[i] !== undefined && matrix[i][j - 1] !== undefined) {
    values.push({
      xy: [i, j - 1],
      value: matrix[i][j - 1],
    });
  }

  return values;
}

function getDirection(location, direction) {
  const rules = {
    u: { u: [], l: ['l'], d: ['r', 'r'], r: ['r'] },
    l: { u: ['r'], l: [], d: ['l'], r: ['r', 'r'] },
    d: { u: ['r', 'r', 'r'], l: ['l'], d: [], r: ['l'] },
    r: { u: ['l'], l: ['l', 'l'], d: ['r'], r: [] },
  };

  return rules[location][direction];
}

function getMatrix(map) {
  const side = Math.sqrt(map.length);
  const matrix = [];

  for (let i = 0; i < side; i += 1) {
    matrix.push(map.slice(side * i, side + (side * i)).split(''));
  }

  return matrix;
}

function getCoordinantes(matrix, field) {
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix.length; j += 1) {
      if (matrix[i][j] === field) return [i, j];
    }
  }
  return [null, null];
}

function getDistanceMap(matrix, startCoordinates) {
  const clone = JSON.parse(JSON.stringify(matrix));

  const [x, y] = [...startCoordinates];
  const queue = new Queue([new Node(x, y, 0)]);

  while (queue.length) {
    const node = queue.dequeue();

    if (
      clone[node.x][node.y] &&
      (clone[node.x][node.y] > node.weight || ~['.', 'T', 'S'].indexOf(clone[node.x][node.y]))) {
      clone[node.x][node.y] = node.weight;
    }

    if (clone[node.x - 1] && clone[node.x - 1][node.y] && ~['.', 'T'].indexOf(clone[node.x - 1][node.y])) {
      queue.enqueue(new Node(node.x - 1, node.y, node.weight + 1));
    }

    if (clone[node.x + 1] && clone[node.x + 1][node.y] && ~['.', 'T'].indexOf(clone[node.x + 1][node.y])) {
      queue.enqueue(new Node(node.x + 1, node.y, node.weight + 1));
    }

    if (clone[node.x] && clone[node.x][node.y - 1] && ~['.', 'T'].indexOf(clone[node.x][node.y - 1])) {
      queue.enqueue(new Node(node.x, node.y - 1, node.weight + 1));
    }

    if (clone[node.x] && clone[node.x][node.y + 1] && ~['.', 'T'].indexOf(clone[node.x][node.y + 1])) {
      queue.enqueue(new Node(node.x, node.y + 1, node.weight + 1));
    }
  }

  return clone;
}

function getTurnsMap(matrix, startCoordinates) {
  let clone = JSON.parse(JSON.stringify(matrix)); // do not mutate original matrix
  let side = matrix.length;

  function fill(turns, x, y, location, direction) {
    if (x < side && x >= 0 && y < side && y >= 0 && clone[x][y] !== undefined) {
      if ('S.T'.indexOf(clone[x][y]) !== -1) {
        direction = getDirection(location, direction);
        if (direction.length) {
          location = direction.slice(-1)[0];
        }
        turns += direction.length;
        clone[x][y] = turns;
        fill(turns, x, y + 1, location, 'r');
        fill(turns, x, y - 1, location, 'l');
        fill(turns, x + 1, y, location, 'd');
        fill(turns, x - 1, y, location, 'u');
      } else {
        direction = getDirection(location, direction);
        if (direction.length) {
          location = direction.slice(-1)[0];
        }
        turns += direction.length;
        if (clone[x][y] > turns) {
          clone[x][y] = turns;
        } else {
          return;
        }
        fill(turns, x, y + 1, location, 'r');
        fill(turns, x, y - 1, location, 'l');
        fill(turns, x + 1, y, location, 'd');
        fill(turns, x - 1, y, location, 'u');
      }
    } else {
      return;
    }
  }

  fill(0, ...startCoordinates, 'u', 'u');

  return clone;
}

function getOptimisedMap(roads, turns) {
  const roadsC = JSON.parse(JSON.stringify(roads));
  const turnsC = JSON.parse(JSON.stringify(turns));

  for (let i = 0; i < roadsC.length; i += 1) {
    for (let j = 0; j < roadsC[i].length; j += 1) {
      roadsC[i][j] += turnsC[i][j];
    }
  }

  return roadsC;
}

function getOptimisedRoad(matrix, [i, j], [x, y]) {
  const road = [];
  while (true) {
    road.push([i, j]);

    if (i === x) {
      if (j === y) break;
    }

    const values = getNext(matrix, i, j).reduce((prev, curr) => {
      if (prev.min > curr.value) {
        prev.min = curr.value;
        prev.xy = curr.xy;
      }

      return prev
    }, { min: Infinity, xy: [] });

    i = values.xy[0];
    j = values.xy[1];
  }

  return road.reverse();
}

function getDirections(road) {
  const path = [];
  if (!road.length) return [''];

  let [is, js] = road[0];
  for (let x = 1; x < road.length; x += 1) {
    const [i, j] = road[x];
    if (i > is) {
      path.push('d');
      is = i;
    } else if (i < is) {
      path.push('u');
      is = i;
    } else if (j < js) {
      path.push('l');
      js = j;
    } else if (j > js) {
      path.push('r');
      js = j;
    }
  }

  return path;
}

function resolveEnergy(path) {
  return path.reduce((prev, curr) => {
    prev.resolved += getDirection(prev.location, curr).concat('f').join('');
    prev.location = curr;

    return prev;
  },
    {
      location: 'u',
      resolved: '',
    }).resolved;
}

function getCommands(field, power) {
  const matrix = getMatrix(field);
  const startCoordinates = getCoordinantes(matrix, 'S');
  const targetCoordinates = getCoordinantes(matrix, 'T');
  const map = getDistanceMap(matrix, startCoordinates);
  if (map[targetCoordinates[0]][targetCoordinates[1]] === 'T') { // there is no route
    return [''];
  }

  const turns = getTurnsMap(matrix, startCoordinates);
  const optimisedMap = getOptimisedMap(map, turns);
  const optimisedRoad = getOptimisedRoad(optimisedMap, targetCoordinates, startCoordinates);
  const path = getDirections(optimisedRoad);
  const energy = resolveEnergy(path);

  if (energy.length <= power) {
    return energy.split('');
  }

  return [''];
}

const configs = [{
  i: {
    f: 'T.S.',
    p: 10,
  },
  o: 'f',
}, {
  i: {
    f: 'T.S.',
    p: 10,
  },
  o: ['f'],
},
{
  i: {
    f: 'S.......T',
    p: 10,
  },
  o: 'rffrff'.split(''),
}, {
  i: {
    f: 'S.......T',
    p: 5,
  },
  o: [''],
}, {
  i: {
    f: 'S#.##...T',
    p: 20,
  },
  o: [''],
}, {
  i: {
    f: '.........S......######............#.......######......T.........',
    p: 100,
  },
  o: 'rfffffrfflffffflffflfffff'.split(''),
}, {
  i: {
    f: '................................................................###########.........#.........#.........#.#######.#.........#.#.......#.........#.#.#######.........#.#.#S.#............#.#.##.#............#.#....#............#.######............#...................###############........................................................................................................................T',
    p: 400,
  },
  o: 'rfrfflfffrffffrfffffflfflfffffffflfffffffflffffffffffffffrfffffff'.split(''),
},
];

describe('getCommands', () => {
  configs.forEach((config) => {
    it(`should return '${config.o}' given field '${config.i.f}' and power '${config.i.p}'`, () => {
      assert.deepEqual(getCommands(config.i.f, config.i.p), config.o);
    });
  });
});
