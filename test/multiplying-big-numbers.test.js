const BigNumbers = {
  /**
   * Add two masive numbeers that are string as input and it returned
   * the sum as masivce string
   *
   * @param  {String} first
   * @param  {String} second
   *
   * @return {String}
   */
  add: (first, second) => {
    let carry = 0,
      result = [];

    first = first.split('');
    second = second.split('');

    while (first.length || second.length) {
      let firstDig = (first.length) ? parseInt(first.pop()) : 0;
      let secondDig = (second.length) ? parseInt(second.pop()) : 0;
      let curr = firstDig + secondDig + carry;
      carry = (curr > 9) ? 1 : 0;

      result.unshift(curr % 10);
    }

    if (carry) result.unshift(1);

    return result.join('');
  },
  /**
   * @param  {String} first
   * @param  {String} second
   *
   *  @return {String}
   */
  multiply: (first, second) => {
    let result = [];
    let sums = [];

    second = second.split('').reverse();

    sums = second.map((item, index) => {
      let local = "";
      let number = parseInt(item) * Math.pow(10, index);

      for (let x = 0; x < number; x++) {
        local = BigNumbers.add(local, first);
      }

      return local;
    });

    let multiplication = sums.reduce((acc, item) => BigNumbers.add(acc, item), "");
    return multiplication;
  },
  /**
   * Return the value of first big number at power second big number
   *
   * @param  {String} first  [First big string number]
   * @param  {String} second [Second big string number]
   *
   * @return {String}        [Return first at power second (first^second)]
   */
  pow: (first, second) => {
    second = second.split('').reverse();
    let multiplications;

    multiplications = second.map((item, index) => {
      let local = "1";
      let number = parseInt(item) * Math.pow(10, index);
      for (let x = 0; x < number; x++) {
        local = BigNumbers.multiply(local, first);
      }

      return local;
    });
    return multiplications.reduce((acc, item) => BigNumbers.multiply(item, acc), "1");
  }
};

let value = BigNumbers.pow("111", "2");
console.log(value);
