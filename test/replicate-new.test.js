const assert = require('assert');

/**
 * Nouveau = new in french
 */
function nouveau(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype);
  const result = Constructor.apply(instance, args);

  return result === Object(result) ? result : instance;
}

describe('new operator', () => {
  it('should create an empty object wich inherits from constructor prototype', () => {
    function Person(name) {
      this.name = name;
    }
    Person.prototype.sayHi = function() {
      return 'Hi, I am ' + this.name;
    };

    var guy = nouveau(Person, 'Guy');

    assert.equal(guy.sayHi(), 'Hi, I am Guy');
    assert.equal(guy.name, 'Guy');
  });
});
