import UIElement from './UIElement';

class UIScene extends UIElement {
  elements = [];

  constructor(
    name,
    element,
    elements,
  ) {
    super(element);
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
}

export default UIScene;
