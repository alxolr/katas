/**
 * Kata to implement Mongo object id in javascript
 */

const Mongo = {
  'isValid': function(id) {
    let checkForHexRegExp = new RegExp("^[0-9a-f]{24}$");

    if (id === null) return false;

    if (typeof id == 'string') {
      return id.length == 12 || (id.length == 24 && checkForHexRegExp.test(id));
    }

    return false;
  },
  'getTimestamp': function(id) {
    if (typeof id !== "string") return false;
    if (this.isValid(id)) {
      return new Date(parseInt(id.slice(0, 8), 16) * 1000);
    } else {
      return false;
    }
  }
};
