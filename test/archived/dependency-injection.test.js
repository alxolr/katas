/* global describe it */
/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
var DI = function (dependency) {
  this.dependency = dependency
}

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {
  /\(([\w,_\s]+)\)/g.exec(func.toString())
  let self = this
  let resolved

  if (arguments !== null) {
    let args = arguments[1]
    resolved = args.split(',')
      .map(item => self.dependency[item.trim()])
  } else {
    resolved = []
  }
  return function () {
    return func(...resolved)
  }
}

const assert = require('assert')

describe('DependencyInjector', function () {
  it('should resolve the injected methods', function () {
    var deps = {
      'dep1': function () {
        return 'this is dep1'
      },
      'dep2': function () {
        return 'this is dep2'
      },
      'dep3': function () {
        return 'this is dep3'
      },
      'dep4': function () {
        return 'this is dep4'
      }
    }

    var di = new DI(deps)

    var myFunc = di.inject(function (dep3, dep1, dep2) {
      return [dep1(), dep2(), dep3()].join(' -> ')
    })
    assert.equal(myFunc(), 'this is dep1 -> this is dep2 -> this is dep3')
  })

  it('should resolve the case when no parameters sent', function () {
    var di = new DI({})
    var myFunc = di.inject(function () {
      return 'hello world'
    })
    assert.equal(myFunc(), 'hello world')
  })
})
