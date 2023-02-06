module.exports = function generate(node) {
  switch(node.type) {
    case 'NumericLiteral':
      return Number(node.value);
      break;
    case 'Identifier':
      return node.name;
      break;
    case 'CallExpression':
      return `(${node.arguments.map(generate).join(` ${generate(node.callee)} `)})`;
      break;
    case 'ExpressionStatement':
      return `${generate(node.expression)};`;
      break;
    case 'Program':
      return node.body.map(generate).join('\n');
      break;
  }
}