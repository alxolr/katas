function dichotomySqrt (number) {
  let lowest = Math.floor(number / 2)
  while (lowest * lowest > number) {
    lowest--
  }

  let highest = lowest + 1
  let middle = (lowest + highest) / 2

  while ((Math.abs(middle * middle - number)) > 0.0002) {
    let pow = middle * middle
    if (pow > number) {
      highest = middle
    } else if (pow < number) {
      lowest = middle
    }
    middle = (lowest + highest) / 2
  }

  return middle
}

dichotomySqrt(379)
