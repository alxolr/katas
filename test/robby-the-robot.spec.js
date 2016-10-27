/**
 * WORKING LOG
 * 1. Implement the graph with the vertexes for my needs
 * http://www.thomaswilburn.net/typedefs/index.php/graph/weighted/weighted.html
 * Implement a shortest path algorithm
 *
 */

const assert = require('assert')
const WeightedGraph = require('../modules/graphs')

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

  getMetaMatrix () {
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

            fill(distance + 1, i, j + 1)
            fill(distance + 1, i + 1, j)
            fill(distance + 1, i, j - 1)
            fill(distance + 1, i - 1, j)
          }
        }
      } else {
        return
      }
    }

    fill(0, ...this.getStartCoordinates())

    return metaMatrix
  }
}

console.log(new Robot('S#..#...T').getMetaMatrix())
