// Get the folowing answers given the structure
let dragons = [{
  name: 'Fairy',
  damage: 45,
  health: 101,
  gender: 'Female'
}, {
  name: 'Draco',
  damage: 111,
  health: 55,
  gender: 'Male'
}, {
  name: 'Snippy',
  damage: 12,
  health: 1112,
  gender: 'Male'
}, {
  name: 'Sekuro',
  damage: 55,
  health: 75,
  gender: 'Male'
}, {
  name: 'Gina',
  damage: 36,
  health: 99,
  gender: 'Female'
}];


/**
 * 1. Get all the male dragons names as array
 * 2. Get all the dragons health bigger than 100 and show as array
 * 3. Find out the total health and the total damage for the dragons
 * 4. Sort out the dragons by their damage and show only the array of names
 */
let males, tanks, totalHealth, totalDamage, sortedByDamage;


const assert = require('assert');

describe('Dragons', () => {
  it('should return "Drako, Snippy and Sekuro" for the male dragon names', () => {
    assert.deepEqual(males, ['Draco', 'Snippy', 'Sekuro']);
  });

  it('should return "101, 1112" for the dragon healths bigger than 100', () => {
    assert.deepEqual(tanks, [101, 1112]);
  });

  it('should get the total health="1442" and damage="259"', () => {
    assert.equal(1442, totalHealth);
    assert.equal(259, totalDamage);
  });

  it('should be the following names after sorting "Draco, Sekuro, Fairy, Gina, Snippy"', () => {
    assert.deepEqual(sortedByDamage, ['Draco', 'Sekuro', 'Fairy', 'Gina', 'Snippy']);
  });
});
