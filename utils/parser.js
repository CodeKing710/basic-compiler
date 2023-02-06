module.exports = function parser(tokens) {
  let i = 0;
  function walk() {
    let token = tokens[i];

    if (token.type === 'number') {
      i++;
      return {
        type: 'NumberLiteral',
        value: token.value
      };
    }
    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++i];
      const expr = {
        type: 'CallExpression',
        name: token.value,
        params: []
      };
      token = tokens[++i];
      while(token.value !== ')') {
        expr.params.push(walk());
        token = tokens[i];
      }
      i++;
      return expr;
    };

    throw new Error(`ParseError: Unknown token with type '${token.type}', value '${token.value}'`);
  }
  
  const ast = {
    type: 'Program',
    body: [walk()]
  };



  return ast;
}