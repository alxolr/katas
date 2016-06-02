function rot13(message) {
  let small = "abcdefghijklmnopqrstuvxyz",
    big     = "ABCDEFGHIJKLMNOPQRSTUVXYZ";

  small     = small.split('');
  big       = big.split('');

  return message.split('').map(letter => {
    if (letter === letter.toUpperCase()) {
      letter = shift(letter, big);
    } else {
      letter = shift(letter, small);
    }

    return letter;

    function shift(letter, alphabet) {
      let index = alphabet.indexOf(letter);
      if ((index + 13) > alphabet.length) {
        return alphabet[((index + 13) - alphabet.length - 1)];
      } else {
        return alphabet[index + 13 - 1];
      }
    }

  }).join();
}
