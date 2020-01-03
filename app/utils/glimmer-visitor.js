function textNode(node) {
  return `TextNode(node) {
  }`;
}

function mustacheStatement(node) {
  return `MustacheStatement(node) {
    if(node.path.original === '${node.path.original}') {

    }
  }`;
}

function elementNode(node) {
  return `ElementNode(node) {
    if(node.tag.name === '${node.tag}') {
    }
  }`;
}
export default function glimmerVisitor(node) {

  let str = '';
  switch(node.type) {
    case 'TextNode':
      str = textNode(node);
      break;

    case 'MustacheStatement':
      str = mustacheStatement(node);
      break;

    case 'ElementNode':
      str = elementNode(node);
      break;

    default:
      console.log('glimmerVisitor => ', node.type); // eslint-disable-line
      console.log(node);
      break;
  }
  return str;
}
