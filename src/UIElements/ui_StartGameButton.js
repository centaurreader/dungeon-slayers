import UIElement from '../Engine/UIElement.js';

class StartGameButton extends UIElement {
  constructor(getElement) {
    super(getElement);
  }

  init() {
    const instance = this.getElement().cloneNode();
    instance.removeAttribute('data-id');
    instance.setAttribute('id', this.getElement().dataset.id);
    instance.addEventListener('click', () => {
      console.log(this);
      this.updateState({ game: {} });
    });
  }

  update() {
  }
}

export default StartGameButton;
