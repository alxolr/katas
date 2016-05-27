function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function trampoline() {

}

function thunk() {

}


const assert = require('assert');

describe('Trampoline tests in trampolineSum', () => {
  it('iterative sum equal trmpoline sum', () => {
      function iterativeSum(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
          sum += i;
        }

        return sum;
      }

      function trampolineSum(n) {
        function _sum(n, ac) {
          if (n === 0) {
            return ac;
          } else {
            return thunk(_sum, n - 1, ac + n);
          }
        }

        return trampoline(thunk(_sum, n, 0));
      }

      let number = random(10, 50);

      assert.equal(trampolineSum(number), iterativeSum(number), `For ${number} the value was different`);
  });
});
