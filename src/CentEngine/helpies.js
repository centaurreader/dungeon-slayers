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

/**
 * Generate a random UUID
 * @returns {string}
 */
export function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
