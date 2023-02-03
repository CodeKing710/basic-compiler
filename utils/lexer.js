const Token = require('./Token');
const buildName = require('./buildName');
const buildNum = require('./buildNum');
const NUMBERS = /\d/;
const LETTERS = /[a-z]/i;
const PARENS = /(\(|\))/;
const OPS = /(\+|\-|\*|\\|=|\^|%)/; //Underneath these are technically functions
const WS = /\s/;
const LINE = /(\\n|\\r)/;

module.exports = function lexer(input) {
  const tokens = [];
  let i = 0; //Current token position
  let line = 1;
  while (i < input.length) {
    let c = input[i];

    switch(true) {
      case PARENS.test(c):
        tokens.push(new Token('paren',c));
        i++;
        continue;
      case OPS.test(c):
        tokens.push(new Token('operator',c));
        i++;
        continue;
      case LETTERS.test(c):
        let name = "";
        [name, i] = [...buildName(input,i)];
        tokens.push(new Token('name',name));
        continue;
      case WS.test(c):
        i++;
        continue;
      case LINE.test(c):
        line++;
        i++;
        break;
      case NUMBERS.test(c):
        let num = "";
        [num, i] = [...buildNum(input, i)];
        tokens.push(new Token('number', num));
        continue;
    }

    throw new Error(`Syntax Error - Unknown character @ line ${line}, pos ${i}: "${c}"`);
  }

  return tokens;
}