function countArara(number) {
  var response = [];

  if(number % 2 !== 0) {
    response.push('anane');
    number -= 1;
  }

  while(number) {
    response.push('adak');
    number -= 2;
  }

  return response.reverse().join(' ');
}


/* Testing part*/
const assert = require('assert');

describe('Arara Counter', () => {
  it('should return "anane" given 1', () => {
    assert.equal(countArara(1), 'anane');
  });

  it('should return "adak" given 2', () => {
    assert.equal(countArara(2), 'adak');
  });

  it('should return "adak anane" given 3', () => {
    assert.equal(countArara(3), 'adak anane');
  });

  it('should return "adak adak" given 4', () => {
    assert.equal(countArara(4), 'adak adak');
  });

  it('should return "adak adak anane" given 5', () => {
    assert.equal(countArara(5), 'adak adak anane');
  });

  it('should return "adak adak adak adak anane" given 9', () => {
    assert.equal(countArara(9), 'adak adak adak adak anane');
  });

  it('should return "adak adak adak adak adak" given 10', () => {
    assert.equal(countArara(10), 'adak adak adak adak adak');
  });
});
