(() => {
  "use strict";

  const assert = require('assert');

  // Converts a URL Query String into an object map
  function convertQueryToMap(query) {
    let result = query.split('&').reduce((prev, curr) => {
      let [key, value] = curr.split('=');
      if (!value) {
        prev[key] = '';
      } else {
        prev[key] = value;
      }

      return prev;
    }, {});

    return result;
  }

  let configs = [{
    i: 'user.name.firstname=Bob&.name.lastname=Smith&user.favoritecolor=Light%20Blue',
    o: {
      'user': {
        'name': {
          'firstname': 'Bob',
          'lastname': 'Smith'
        },
        'favoritecolor': 'Light Blue'
      }
    }
  }];

  describe('ConvertQueryToMap', () => {
    it('shoud split the variables by "&"', () => {
      let query = 'var&test&doc&john';
      assert.deepEqual(convertQueryToMap(query), {
        'var': "",
        'test': "",
        'doc': "",
        'john': ""
      });
    });

    it('should add the values also after split', () => {
      let query = 'var=1&test=2&doc=3&john=4';
      assert.deepEqual(convertQueryToMap(query), {
        'var': 1,
        'test': 2,
        'doc': 3,
        'john': 4
      });
    });
  });
})();
