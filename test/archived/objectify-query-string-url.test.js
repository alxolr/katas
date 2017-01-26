/* global describe it */
(() => {
  'use strict'

  const assert = require('assert')

  // Converts a URL Query String into an object map
  function convertQueryToMap (query) {
    let result = query.split('&').reduce((prev, curr) => {
      let [key, value] = curr.split('=')

      if (!value) {
        prev[key] = ''
      } else {
        value = value.replace(/%20/g, ' ')
          .replace(/%26/g, '&')
          .replace(/%3D/g, '=')
          .replace(/%3F/g, '?')

        prev[key] = value
      }

      return prev
    }, {})

    return deepen(result)
  }

  function deepen (o) {
    var oo = {}
    var t
    var parts
    var part
    for (var k in o) {
      t = oo
      parts = k.split('.')
      var key = parts.pop()
      while (parts.length) {
        part = parts.shift()
        t = t[part] = t[part] || {}
      }
      t[key] = o[k]
    }
    return oo
  }

  describe('ConvertQueryToMap', () => {
    it('shoud split the variables by "&"', () => {
      let query = 'var&test&doc&john'
      assert.deepEqual(convertQueryToMap(query), {
        'var': '',
        'test': '',
        'doc': '',
        'john': ''
      })
    })

    it('should add the values also after split', () => {
      let query = 'var=1&test=2&doc=3&john=4'
      assert.deepEqual(convertQueryToMap(query), {
        'var': 1,
        'test': 2,
        'doc': 3,
        'john': 4
      })
    })

    it('should replace the %20 from value to space', () => {
      let query = 'var=myname%20is%20john'
      assert.deepEqual(convertQueryToMap(query), {
        var: 'myname is john'
      })
    })

    it('should be able to make child values to an object', () => {
      let query = 'user.name=John&user.surname=Dondon'
      assert.deepEqual(convertQueryToMap(query), {
        user: {
          name: 'John',
          surname: 'Dondon'
        }
      })
    })
  })
})()
