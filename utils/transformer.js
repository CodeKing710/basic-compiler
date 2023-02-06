const traverse = require('./traverse');

module.exports = function transformer(AST) {
  const tAST = {
    type: 'Program',
    body: []
  };

  let pos = tAST.body;

  traverse(AST, {
    NumberLiteral(node) {
      pos.push({
        type: 'NumericLiteral',
        value: node.value
      });
    },
    CallExpression(node, parent) {
      let expression = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.name
        },
        arguments: []
      };
      const prevPosition = pos;
      pos = expression.arguments;
      if(parent.type !== 'CallExpression') {
        expression = {
          type: 'ExpressionStatement',
          expression
        };
      }
      prevPosition.push(expression);
    }
  });

  return tAST;
}