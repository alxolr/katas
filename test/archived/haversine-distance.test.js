/* global describe it */
const assert = require('assert')

function Coordinate (coordinate) {
  this.coordinate = coordinate
  let quadran = this.coordinate.match(/([N,E,W,S])/gi)[0]

  if ('SW'.indexOf(quadran) !== -1) {
    this.sign = -1
  } else {
    this.sign = 1
  }
}

Coordinate.prototype.toDeg = function () {
  let result = this.coordinate.match(/([\d]+)/g).map(item => parseInt(item))
    .reduce((acc, curr, index) => {
      if (index === 0) { // degree
        return acc + curr
      } else if (index === 1) { // minutes
        acc += curr / 60
        return acc
      } else if (index === 2) { // seconds
        acc += curr / 3600
        return acc
      }
    }, 0)

  return this.sign * result
}

Coordinate.prototype.toRad = function (deg) {
  return toRad(this.toDeg())
}

function toRad (deg) {
  return (deg * Math.PI) / 180
}

function distance (first, second) {
  let [lat1, lon1] = first.split(',')
  let [lat2, lon2] = second.split(',')
  lat1 = new Coordinate(lat1)
  lon1 = new Coordinate(lon1)
  lat2 = new Coordinate(lat2)
  lon2 = new Coordinate(lon2)

  let R = 6371 // km

  lat1 = lat1.toRad()
  lon1 = lon1.toRad()
  lat2 = lat2.toRad()
  lon2 = lon2.toRad()

  let dLon = lon2 - lon1
  let dLat = lat2 - lat1

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c

  return ~~(d / 10) * 10
}

let configs = [
  {
    i: ['48° 12′ 30″ N, 16° 22′ 23″ E', '23° 33′ 0″ S, 46° 38′ 0″ W'],
    o: 10130
  }, {
    i: ['48° 12′ 30″ N, 16° 22′ 23″ E', '58° 18′ 0″ N, 134° 25′ 0″ W'],
    o: 7870
  }, {
    i: ['48° 12′ 30″ N, 16° 22′ 23″ E', '48° 12′ 30″ N, 16° 22′ 23″ E'],
    o: 0
  }
]

describe('Haversine Distance', function () {
  configs.forEach(config => {
    it(`should return ${config.o} given ${config.i}`, function () {
      assert.equal(distance(...config.i), config.o)
    })
  })
})
