/**
 * WORKING LOG
 * 1. Implement the graph with the vertexes for my needs
 * http://www.thomaswilburn.net/typedefs/index.php/graph/weighted/weighted.html
 * Implement a shortest path algorithm
 *
 */

/* global describe it */

const assert = require('assert')

const getNext = (metaMatrix, i, j) => {
  let values = []
  if (metaMatrix[i - 1] !== undefined && metaMatrix[i - 1][j] !== undefined) {
    values.push({
      xy: [i - 1, j],
      value: metaMatrix[i - 1][j]
    })
  }

  if (metaMatrix[i + 1] !== undefined && metaMatrix[i + 1][j] !== undefined) {
    values.push({
      xy: [i + 1, j],
      value: metaMatrix[i + 1][j]
    })
  }

  if (metaMatrix[i] !== undefined && metaMatrix[i][j + 1] !== undefined) {
    values.push({
      xy: [i, j + 1],
      value: metaMatrix[i][j + 1]
    })
  }

  if (metaMatrix[i] !== undefined && metaMatrix[i][j - 1] !== undefined) {
    values.push({
      xy: [i, j - 1],
      value: metaMatrix[i][j - 1]
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

class Robot {
  constructor (map) {
    this.map = map
  }

  toMatrix () {
    let side = Math.sqrt(this.map.length)
    let matrix = []
    for (let i = 0; i < side; i++) {
      matrix.push(this.map.slice(side * i, side + side * i).split(''))
    }

    return matrix
  }

  getStartCoordinates () {
    let matrix = this.toMatrix()

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 'S') return [i, j]
      }
    }
  }

  getTargetCoordinates () {
    let matrix = this.toMatrix()

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 'T') return [i, j]
      }
    }
  }

  getTopologicalMatrix () {
    let metaMatrix = this.toMatrix()
    let maxSide = metaMatrix.length

    const fill = (distance, i, j) => {
      if (i < maxSide && i >= 0 && j < maxSide && j >= 0 && metaMatrix[i][j] !== undefined) {
        if ('S.T'.indexOf(metaMatrix[i][j]) !== -1) {
          metaMatrix[i][j] = distance
          fill(distance + 1, i, j + 1)
          fill(distance + 1, i + 1, j)
          fill(distance + 1, i, j - 1)
          fill(distance + 1, i - 1, j)
        } else {
          if (metaMatrix[i][j] > distance) {
            metaMatrix[i][j] = distance

            // fill(distance + 1, i, j + 1)
            // fill(distance + 1, i + 1, j)
            // fill(distance + 1, i, j - 1)
            // fill(distance + 1, i - 1, j)
          }
        }
      } else {
        return
      }
    }

    fill(0, ...this.getStartCoordinates())

    return metaMatrix
  }

  getTurnMatrix () {
    let matrix = this.toMatrix()
    let maxSide = matrix.length

    const fill = (i, j, acc, location, direction) => {
      if (i < maxSide && i >= 0 && j < maxSide && j >= 0 && matrix[i][j] !== undefined) {
        if ('S.T'.indexOf(matrix[i][j]) !== -1) {
          direction = getDirection(location, direction)
          if (direction.length) {
            location = direction[direction.length - 1]
          }

          matrix[i][j] = acc + direction.length
          fill(i, j + 1, matrix[i][j], location, 'r')
          fill(i + 1, j, matrix[i][j], location, 'd')
          fill(i, j - 1, matrix[i][j], location, 'l')
          fill(i - 1, j, matrix[i][j], location, 'u')
        } else {
          direction = getDirection(location, direction)
          if (direction.length) {
            location = direction[direction.length - 1]
          }
          let accumulator = acc + direction.length
          if (matrix[i][j] > accumulator) {
            matrix[i][j] = accumulator
          }
        }
      } else {
        return
      }
    }

    fill(...this.getStartCoordinates(), 0, 'u', 'u')

    return matrix
  }

  getMetaMatrix () {
    let roads = this.getTopologicalMatrix()
    let turns = this.getTurnMatrix()
    for (let i = 0; i < roads.length; i++) {
      for (let j = 0; j < roads[i].length; j++) {
        roads[i][j] += turns[i][j]
      }
    }

    return roads
  }

  getOptimisedRoad () {
    let road = []
    let metaMatrix = this.getMetaMatrix()
    let [x, y] = this.getStartCoordinates()
    let [i, j] = this.getTargetCoordinates()
    if (metaMatrix[x][y] === 'SS') return []
    if (metaMatrix[i][j] === 'TT') return []

    while (true) {
      road.push([i, j])
      if (i === x) {
        if (j === y) break
      }
      let values = getNext(metaMatrix, i, j).reduce((prev, curr) => {
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
}

function getCommands (field, power) {
  let robot = new Robot(field)
  let path = []
  let road = robot.getOptimisedRoad()
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

  let energy = path.reduce((prev, curr) => {
    prev.resolved += getDirection(prev.location, curr).concat('f').join('')
    prev.location = curr

    return prev
  }, {
    location: 'u',
    resolved: ''
  })

  if (energy.resolved.length > power) {
    return ['']
  } else {
    return energy.resolved.split('')
  }
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
}
]

let robot = new Robot('.........S......######............#.......######......T.........')
console.log(robot.getTurnMatrix())

describe('getCommands', () => {
  configs.forEach(config => {
    it(`should return '${config.o}' given field '${config.i.f}' and power '${config.i.p}'`, () => {
      assert.deepEqual(getCommands(config.i.f, config.i.p), config.o)
    })
  })
})
