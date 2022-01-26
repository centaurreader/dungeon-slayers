import UIElement from '../Engine/UIElement.js';

class StartGameButton extends UIElement {
  constructor(element) {
    super(element);
    element.addEventListener('click', () => {
      this.updateState({ test: 'state', });
    });
  }

  update() {
    console.log('do something');
  }
}

export default StartGameButton;
