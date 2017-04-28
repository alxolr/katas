/* global describe it */
const assert = require('assert');
const multiply = require('../multiply');

describe('multiply', () => {
  const configs = [
    {
      i: { a: '12', b: '2' },
      o: '24',
    },
    {
      i: { a: '2', b: '24' },
      o: '48',
    },
    {
      i: { a: '350', b: '20' },
      o: '7000',
    },
    {
      i: { a: '000001', b: '3' },
      o: '3',
    },
    {
      i: { a: '30', b: '69' },
      o: '2070',
    },
    {
      i: { a: '11', b: '85' },
      o: '2070',
    },
    {
      i: { a: '2', b: '0' },
      o: '0',
    },
  ];

  configs.forEach((config) => {
    it(`should return ${config.o} given ${config.i.a} * ${config.i.b}`, () => {
      assert.equal(multiply.call(null, config.i.a, config.i.b), config.o);
    });
  });
});
