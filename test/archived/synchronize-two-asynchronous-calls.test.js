/* global describe it */
const assert = require('assert')

const firstCall = (cb) => setTimeout(() => cb(null, 'first'), 1000)
const secondCall = (cb) => setTimeout(() => cb(null, 'second'), 1500)

/**
 * Async method to synchronise more asynchronous codes
 *
 * @type {Object}
 */
const Async = {
  parallel: (fns, cb) => {
    let pending = 0
    let result = []
    let calledback = false

    const wrapCallback = () => {
      let index = pending
      pending++
      return function (err, data) {
        pending--
        if (err) {
          callback(err)
        } else {
          result[index] = data
          if (!pending) {
            callback(null, result)
          }
        }
      }
    }

    const callback = (err, data) => {
      if (err) cb(err)

      if (!calledback) {
        calledback = true
        cb(null, data)
      }
    }

    fns.forEach(fn => fn(wrapCallback()))
  }
}

describe('Async', function () {
  describe('Parallel', function () {
    it('should return the callback with the result of the methods', function (done) {
      Async.parallel([firstCall, secondCall], (err, data) => {
        assert.equal(err, null)
        assert.deepEqual(data, ['first', 'second'])
        done()
      })
    })

    it('should work with just one method also', function (done) {
      Async.parallel([firstCall], (err, data) => {
        assert.equal(err, null)
        assert.deepEqual(data, ['first'])
        done()
      })
    })
  })
})
