String.prototype.clean = function cleanPadding() {
  return this.replace(/^[0]+/g, '');
};

function multiplyBiggerSmaller(bigger, smaller) {
  let carret = 0;
  for (let i = 0; i < smaller.length; i += 1) {
    if (smaller.charAt(i) === '0' || smaller.charAt(i) === '1' && i < smaller.length - 1) {
      bigger = `0${bigger}`;
      continue;
    }
    for (let j = 0; j < bigger.length; j += 1) {
      let local = ((+smaller.charAt(i)) * (+bigger.charAt(j))) + carret;
      decimal = local % 10;
      carret = parseInt(local / 10);
      bigger = bigger.substring(0, j) + decimal + bigger.substring(j + 1, bigger.length);
    }
  }

  if (carret !== 0) {
    bigger += carret;
  }
  return bigger.split('').reverse().join('');
}

function multiply(a, b) {
  let result = '';
  if (a === '0' || b === '0') return '0';

  a = a.clean().split('').reverse().join('');
  b = b.clean().split('').reverse().join('');

  if (a >= b) {
    result = multiplyBiggerSmaller(a, b);
  } else {
    result = multiplyBiggerSmaller(b, a);
  }

  return result;
}

multiply('11', '85');

module.exports = multiply;
