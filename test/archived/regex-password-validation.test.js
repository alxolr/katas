/* global describe it */
/**
 * Validate the password for the following rules
     At least six characters long
     contains a lowercase letter
     contains an uppercase letter
     contains a number

 * @param  {String} password
 * @return {Bool}
 */
function validate (password) {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,}$/.test(password)
}

let configs = [
  {i: 'djI38D55', o: true},
  {i: 'a2.d412', o: false},
  {i: 'JHD5FJ53', o: false},
  {i: '!fdjn345', o: false},
  {i: 'jfkdfj3j', o: false},
  {i: '123', o: false},
  {i: 'abc', o: false},
  {i: 'Password123', o: true}
]

const assert = require('assert')

describe('Validate Password', function () {
  configs.forEach(config => {
    it(`should return ${config.o} given ${config.i}`, function () {
      assert.equal(validate(config.i), config.o)
    })
  })
})
