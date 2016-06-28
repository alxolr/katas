const assert = require('assert');

function Coordinate(coordinate) {
  this.coordinate = coordinate;
  let quadran = this.coordinate.match(/([N,E,W,S])/gi)[0];

  if ("SW".indexOf(quadran) !== -1) {
    this.sign = -1;
  } else {
    this.sign = 1;
  }
}

Coordinate.prototype.toDeg = function() {
  let result = this.coordinate.match(/([\d]{2})/g).map(item => parseInt(item))
    .reduce((acc, curr, index) => {
      if (index === 0) { //degree
        return acc + curr;
      } else if (index === 1) { //minutes
        return acc += curr / 60;
      } else if (index === 2) { //seconds
        return acc += curr / 3600;
      }
    }, 0);

  return this.sign * result;
};

Coordinate.prototype.toRad = function(deg) {
  return toRad(this.toDeg());
};

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function distance(first, second) {
  [lat1, lon1] = first.split(',');
  [lat2, lon2] = second.split(',');
  lat1 = new Coordinate(lat1);
  lon1 = new Coordinate(lon1);
  lat2 = new Coordinate(lat2);
  lon2 = new Coordinate(lon2);
  let R = 6371; // km

  var x1 = lat2.toDeg() - lat1.toDeg();
  var dLat = toRad(x1);
  var x2 = lon2.toDeg() - lon1.toDeg();
  var dLon = toRad(x2);

  lat1 = lat1.toRad();
  lon1 = lon1.toRad();
  lat2 = lat2.toRad();
  lon2 = lon2.toRad();

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;

  return ~~(d / 10) * 10;
}

let configs = [
  {
    i: ["48° 12′ 30″ N, 16° 22′ 23″ E", "23° 33′ 0″ S, 46° 38′ 0″ W"],
    o: 10130
  }, {
    i: ["48° 12′ 30″ N, 16° 22′ 23″ E", "58° 18′ 0″ N, 134° 25′ 0″ W"],
    o: 7870
    }, {
    i: ["48° 12′ 30″ N, 16° 22′ 23″ E", "48° 12′ 30″ N, 16° 22′ 23″ E"],
    o: 0
    }
];

describe('Haversine Distance', function() {
  configs.forEach(config => {
    it(`should return ${config.o} given ${config.i}`, function() {
      assert.equal(distance(...config.i), config.o);
    });
  });
});
