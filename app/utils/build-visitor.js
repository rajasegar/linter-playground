function memberExpressionFilter(node) {
  let str = '';
  switch(node.object.type) {
    case 'Identifier':
      str = `node.callee.object.name === '${node.object.name}' 
                  && node.callee.property.name === '${node.property.name}')`;
      break;

    default:
      console.log(node.object.type);
      break;

  }
  return str;
}
function callExpression(node) {
  let filter = '';
  switch(node.callee.type) {
    case 'Identifier':
      filter = `if(node.callee.name === 'foo') {
      }`;
      break;

    case 'MemberExpression':
      filter = `if(${memberExpressionFilter(node.callee)} {
      }`;
      break;

    default:
      console.log('callExpression => ', node.callee.type); // eslint-disable-line
      break;

  }

  return `CallExpression: function(node) {
    ${filter}
  }`;
}

function newExpression(node) {
  return `NewExpression: function(node) {
  }`;
}

export default function buildVisitor(node) {
  let str = '';
  switch(node.type) {
    case 'CallExpression':
      str = callExpression(node);
      break;

    case 'NewExpression':
      str = newExpression(node);
      break;
    default:
      console.log('buildVisitor => ', node.type); // eslint-disable-line
      break;
  }
  return str;
}
