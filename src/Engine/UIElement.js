class UIElement {
  updateState = null;
  element = null;

  constructor(element, state) {
    this.element = element;
    this.state = state;
  }

  set() {
    throw new Error('Update not implemented');
  }

  setUpdateCallback(updateCallback) { this.updateState = updateCallback; }
}

export default UIElement;
