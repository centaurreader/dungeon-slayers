/**
 * Converts Template Element contents to node
 * @param {HTMLTemplateElement} template 
 * @returns {HTMLElement}
 */
export function templateToInstance(template) {
  const container = document.createElement(template.content.children[0].nodeName);
  container.setAttribute('id', template.getAttribute('id').replace('_template', ''));
  template.content.children[0].childNodes.forEach((childNode) => {
    container.appendChild(childNode.cloneNode(true));
  });
  return container;
}

/**
 * Append element to app
 * @param {HTMLElement} element 
 */
export function mountElement(element) {
  document.body.appendChild(element);
}
