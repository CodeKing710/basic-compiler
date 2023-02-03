const traverse = require('./traverse');

module.exports = function transformer(AST) {
  const tAST = {
    type: 'Program',
    body: []
  };

  traverse(AST, {
    NumberLiteral(node) {
      position.push({
        type: 'NumericLiteral',
        value: node.value
      });
    },
    CallExpression(node) {
      const expression = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.name
        },
        arguments: []
      };
      const prevPosition = position;
      position = expression.arguments;
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