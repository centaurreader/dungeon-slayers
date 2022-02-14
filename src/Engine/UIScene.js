import UIElement from './UIElement';

class UIScene extends UIElement {
  elements = [];

  constructor(
    name,
    getElement,
    elements,
  ) {
    super(getElement);
    this.name = name;
    this.elements = elements;
  }

  update(state) {
    this.elements.forEach((element) => {
      element.update(state);
    });
  }

  setUpdateCallback(callback) {
    this.updateState = callback;
    this.elements.forEach((element) => element.setUpdateCallback(callback));
  }

  initElements() {
    this.elements.forEach((element) => element.init());
  }
}

export default UIScene;
