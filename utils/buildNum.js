const NUMBERS = /\d/;

module.exports = function buildNum(input, i) {
  let c = input[i];
  let num = "";
  while(NUMBERS.test(c)) {
    num += c;
    c = input[++i];
  }
  return [num, i];
}