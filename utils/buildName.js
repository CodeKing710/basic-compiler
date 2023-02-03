const LETTERS = /[a-z]/i;

module.exports = function buildName(input, i) {
  let c = input[i];
  let name = "";
  if(LETTERS.test(c)) {
    while(LETTERS.test(c)) {
      name += c;
      c = input[++i];
    }
  }
  return [name, ++i];
}