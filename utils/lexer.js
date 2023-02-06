const Token = require('./Token');
const buildName = require('./buildName');
const buildNum = require('./buildNum');
const NUMBERS = /\d/;
const LETTERS = /[a-z]/i;
// const PARENS = /(\(|\))/;
const OPS = /(\+|\-|\*|\\|=|\^|%)/; //Underneath these are technically functions
const WS = /\s/;
const LINE = /(\\n|\\r)/;

module.exports = function lexer(input) {
  const tokens = [];
  let i = 0; //Current token position
  let line = 1;

  while (i < input.length) {
    let c = input[i];

    if(c === '(' || c === ')') {
      tokens.push(Token('paren',c));
      i++;
      continue;
    }
    if(OPS.test(c)) {
        tokens.push(Token('operator',c));
        i++;
        continue;
    }
    if(LETTERS.test(c)) {
        let name = "";
        [name, i] = [...buildName(input,i)];
        tokens.push(Token('name',name));
        continue;
    }
    if(WS.test(c)) {
        i++;
        continue;
    }
    if(LINE.test(c)) {
        line++;
        i++;
        continue;
    }
    if(NUMBERS.test(c)) {
        let num = "";
        [num, i] = [...buildNum(input, i)];
        tokens.push(Token('number', num));
        continue;
    }

    throw new Error(`Syntax Error - Unknown character @ line ${line}, pos ${i}: "${c}"`);
  }

  //Catch EOF


  return tokens;
}