/**
 * WORKING LOG
 * Change the recursive aproach to the BFS algorithm will give a better performance
 */

/* global describe it */

const assert = require('assert')
let indexTy = 0


const getNext = (matrix, i, j) => {
  let values = []
  if (matrix[i - 1] !== undefined && matrix[i - 1][j] !== undefined) {
    values.push({
      xy: [i - 1, j],
      value: matrix[i - 1][j]
    })
  }
  if (matrix[i + 1] !== undefined && matrix[i + 1][j] !== undefined) {
    values.push({
      xy: [i + 1, j],
      value: matrix[i + 1][j]
    })
  }
  if (matrix[i] !== undefined && matrix[i][j + 1] !== undefined) {
    values.push({
      xy: [i, j + 1],
      value: matrix[i][j + 1]
    })
  }
  if (matrix[i] !== undefined && matrix[i][j - 1] !== undefined) {
    values.push({
      xy: [i, j - 1],
      value: matrix[i][j - 1]
    })
  }

  return values
}

const getDirection = (location, direction) => {
  let rules = {
    u: {
      u: [],
      l: ['l'],
      d: ['r', 'r'],
      r: ['r']
    },
    l: {
      u: ['r'],
      l: [],
      d: ['l'],
      r: ['r', 'r']
    },
    d: {
      u: ['r', 'r', 'r'],
      l: ['l'],
      d: [],
      r: ['l']
    },
    r: {
      u: ['l'],
      l: ['l', 'l'],
      d: ['r'],
      r: []
    }
  }

  return rules[location][direction]
}

const getMatrix = (map) => {
  let side = Math.sqrt(map.length)
  let matrix = []

  for (let i = 0; i < side; i++) {
    matrix.push(map.slice(side * i, side + side * i).split(''))
  }

  return matrix
}

const getCoordinantes = (matrix, field) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === field) return [i, j]
    }
  }
  return [null, null]
}

const getDistanceMap = (matrix, startCoordinates) => {
  let side = matrix.length
  let clone = JSON.parse(JSON.stringify(matrix))

  function fill (distance, x, y) {
    if (x < side && x >= 0 && y < side && y >= 0 && clone[x][y] !== undefined) {
      if ('S.T'.indexOf(clone[x][y]) !== -1) {
        clone[x][y] = distance
        fill(distance + 1, x, y + 1)
        fill(distance + 1, x, y - 1)
        fill(distance + 1, x + 1, y)
        fill(distance + 1, x - 1, y)
      } else {
        if (clone[x][y] > distance) {
          indexTy++
          clone[x][y] = distance
          fill(distance + 1, x, y + 1)
          fill(distance + 1, x, y - 1)
          fill(distance + 1, x + 1, y)
          fill(distance + 1, x - 1, y)
        }
      }
    } else {
      return
    }
  }
  fill(0, ...startCoordinates)

  return clone
}
const getTurnsMap = (matrix, startCoordinates) => {
  let clone = JSON.parse(JSON.stringify(matrix)) // do not mutate original matrix
  let side = matrix.length

  function fill (turns, x, y, location, direction) {
    if (x < side && x >= 0 && y < side && y >= 0 && clone[x][y] !== undefined) {
      if ('S.T'.indexOf(clone[x][y]) !== -1) {
        direction = getDirection(location, direction)
        if (direction.length) {
          location = direction.slice(-1)[0]
        }
        turns += direction.length
        clone[x][y] = turns
        fill(turns, x, y + 1, location, 'r')
        fill(turns, x, y - 1, location, 'l')
        fill(turns, x + 1, y, location, 'd')
        fill(turns, x - 1, y, location, 'u')
      } else {
        direction = getDirection(location, direction)
        if (direction.length) {
          location = direction.slice(-1)[0]
        }
        turns += direction.length
        if (clone[x][y] > turns) {
          clone[x][y] = turns
        } else {
          return
        }
        fill(turns, x, y + 1, location, 'r')
        fill(turns, x, y - 1, location, 'l')
        fill(turns, x + 1, y, location, 'd')
        fill(turns, x - 1, y, location, 'u')
      }
    } else {
      return
    }
  }

  fill(0, ...startCoordinates, 'u', 'u')

  return clone
}

const getOptimisedMap = (roads, turns) => {
  let roadsC = JSON.parse(JSON.stringify(roads))
  let turnsC = JSON.parse(JSON.stringify(turns))

  for (let i = 0; i < roadsC.length; i++) {
    for (let j = 0; j < roadsC[i].length; j++) {
      roadsC[i][j] += turnsC[i][j]
    }
  }

  return roadsC
}

const getOptimisedRoad = (matrix, [i, j] , [x, y]) => {
  let road = []
  while (true) {
    road.push([i, j])
    if (i === x) {
      if (j === y) break
    }
    let values = getNext(matrix, i, j).reduce((prev, curr) => {
      if (prev.min > curr.value) {
        prev.min = curr.value
        prev.xy = curr.xy
      }

      return prev
    }, { min: Infinity, xy: [] })

    i = values.xy[0]
    j = values.xy[1]
  }

  return road.reverse()
}

const getDirections = (road) => {
  let path = []
  if (!road.length) return ['']

  let [is, js] = road[0]
  for (let x = 1; x < road.length; x++) {
    let [i, j] = road[x]
    if (i > is) {
      path.push('d')
      is = i
    } else if (i < is) {
      path.push('u')
      is = i
    } else if (j < js) {
      path.push('l')
      js = j
    } else if (j > js) {
      path.push('r')
      js = j
    }
  }

  return path
}

const resolveEnergy = (path) => {
  return path.reduce((prev, curr) => {
    prev.resolved += getDirection(prev.location, curr).concat('f').join('')
    prev.location = curr

    return prev
  }, {
    location: 'u',
    resolved: ''
  }).resolved
}

const getCommands = (field, power) => {
  let matrix = getMatrix(field)
  let startCoordinates = getCoordinantes(matrix, 'S')
  let targetCoordinates = getCoordinantes(matrix, 'T')
  let map = getDistanceMap(matrix, startCoordinates)
  if (map[targetCoordinates[0]][targetCoordinates[1]] === 'T') { // there is no route
    return ['']
  }
  let turns = getTurnsMap(matrix, startCoordinates)
  let optimisedMap = getOptimisedMap(map, turns)
  let optimisedRoad = getOptimisedRoad(optimisedMap, targetCoordinates, startCoordinates)
  let path = getDirections(optimisedRoad)
  let energy = resolveEnergy(path)

  if (energy.length <= power) {
    return energy.split('')
  }

  return ['']
}

const configs = [{
  i: {
    f: 'T.S.',
    p: 10
  },
  o: ['f']
}, {
  i: {
    f: 'S.......T',
    p: 10
  },
  o: ['r', 'f', 'f', 'r', 'f', 'f']
}, {
  i: {
    f: 'S.......T',
    p: 5
  },
  o: ['']
}, {
  i: {
    f: 'S#.##...T',
    p: 20
  },
  o: ['']
}, {
  i: {
    f: '.........S......######............#.......######......T.........',
    p: 100
  },
  o: 'rfffffrfflffffflffflfffff'.split('')
}
]

describe('getCommands', () => {
  configs.forEach(config => {
    it(`should return '${config.o}' given field '${config.i.f}' and power '${config.i.p}'`, () => {
      assert.deepEqual(getCommands(config.i.f, config.i.p), config.o)
      console.log(indexTy)
    })
  })
})
