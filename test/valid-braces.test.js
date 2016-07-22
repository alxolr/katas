(() => {
  "use strict";

  const assert = require('assert'),
    configs = [{
      i: "()",
      o: true
    }, {
      i: ")(",
      o: false
  }, {
      i: "{}",
      o: true
  }, {
      i: "[{([])}]",
      o: true
  }, {
      i: '(})',
      o: false
  }];

  function validBraces(string) {
    let stack = [],
      braces = string.split('');

    braces.forEach((bracket) => {
      if (stack.length === 0) {
        stack.push(bracket);
      } else {
        let current = stack[stack.length - 1];
        switch (bracket) {
          case ')':
            if (current === '(') {
              stack.pop();
            } else {
              stack.push(bracket);
            }
            break;
          case ']':
            if (current === '[') {
              stack.pop();
            } else {
              stack.push(bracket);
            }
            break;
          case '}':
            if (current === '{') {
              stack.pop();
            } else {
              stack.push(bracket);
            }
            break;
          default:
            stack.push(bracket);
        }
      }
    });

    if (stack.length > 0) return false;

    return true;
  }

  describe('validBraces', () => {
    configs.forEach((config) => {
      it(`should return '${config.o}' given '${config.i}'`, () => {
        assert.equal(validBraces(config.i), config.o);
      });
    });
  });
})();
