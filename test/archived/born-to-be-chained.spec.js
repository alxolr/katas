/** https://www.codewars.com/kata/born-to-be-chained/train/javascript */
;(() => {
  'use strict'
  const methods = {
    sum: function (a, b) { return a + b },
    minus: function (a, b) { return a - b },
    double: function (x) { return sum(x, x) },
    addOne: function (x) { return sum(x, 1) },
    addOneArr: function (arr) {
      return arr.map(function (v) { return v + 1 })
    }
  }

  function chain (fns) {
    function Chainable (fns, acc) {
      this.result = acc
      for (let fn in fns) {
        this[fn] = (...args) => {
          if (acc !== null) {
            if (Array.isArray(...args)) {
              acc = fns[fn](...args)
            } else {
              acc = fns[fn](acc, ...args)
            }
          } else {
            acc = fns[fn](...args)
          }

          return new Chainable(fns, acc)
        }
      }

      this.execute = () => {
        return this.result
      }
    }

    return new Chainable(fns, null)
  }

  let c = chain(methods)

  console.log(c.addOneArr([1, 2, 3]).execute())
  console.log(c.addOneArr([1, 2, 3]).addOneArr().execute())
})()
