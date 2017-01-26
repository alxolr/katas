/* global describe it */

;(() => {
  'use strict'

  let assert = require('assert')

  const deadAntCount = function (ants) {
    if (!ants) return 0

    let result = ants.split('.')
      .filter(ant => /[a,n,t,\w]/g.test(ant))
      .map(ant => ant.replace(/ant/g, ''))
      .join('')
      .replace(/\s+/g, '')
      .split('')
      .reduce((prev, curr) => {
        prev[curr]++
        return prev
      }, {
        a: 0,
        n: 0,
        t: 0
      })

    let computation = Math.max(result.a, result.n, result.t)

    return computation
  }

  let configs = [{
    i: 'ant ant ant ant',
    o: 0
  }, {
    i: null,
    o: 0
  }, {
    i: 'ant anantt aantnt',
    o: 2
  }, {
    i: 'ant ant .... a nt',
    o: 1
  }, {
    i: 'antatn ant ant',
    o: 1
  }, {
    i: 'ant a ant anatttt',
    o: 4
  }, {
    i: 't.a..ta.naa.t.tan.t.nntna.n.aa.ntn.ntn..t.aa..t.a.nt.',
    o: 11
  }]
  describe('Dead ant counter', () => {
    configs.forEach(config => {
      it(`should return ${config.o} given ${config.i}`, () => {
        assert.equal(deadAntCount(config.i), config.o)
      })
    })
  })
})()
