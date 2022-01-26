class UIController {
  elements = [];

  constructor(elements) {
    this.elements = elements;
  }

  updateUi(state) {
    this.elements.forEach((element) => {
      element.update(state);
    });
  }
}

export default UIController;
