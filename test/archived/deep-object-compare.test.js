/* global describe it */
function deepCompare (left, right) {
  if (left === right) return true
  if (typeof left !== 'object' || typeof right !== 'object') return false
  if (Object.keys(left).length !== Object.keys(right).length) return false
  var keys = Object.keys(left)

  return keys.every(function (key) {
    return deepCompare(left[key], right[key])
  })
}

const assert = require('assert')

describe('deepCompare', function () {
  it('should pass for simple values', function () {
    assert.equal(deepCompare(1, 1), true)
  })

  it('should return true given the obj1, obj2 paire', function () {
    let obj1 = {
      name: 'John'
    }
    let obj2 = {
      name: 'John'
    }
    assert.equal(deepCompare(obj1, obj2), true)
  })

  it('should return false given null and undefined', function () {
    assert.equal(deepCompare(null, undefined), false)
  })

  it('should detect when a property is missing', function () {
    assert.equal(deepCompare({
      name: 'John',
      surname: 'Smith'
    }, {
      name: 'John'
    }), false)
  })

  it('should detect when a property is missing', function () {
    assert.equal(deepCompare({
      name: 'John'
    }, {
      name: 'John',
      surname: 'Smith'
    }), false)
  })

  it('should compare arrays', function () {
    assert.equal(deepCompare([1, 2, null, undefined, {
      name: 'Joe'
    }], [1, 2, null, undefined]), false)
  })

  it('should compare the array order', function () {
    assert.equal(deepCompare([1, 2, 3], [1, 3, 2]), false)
  })
})
