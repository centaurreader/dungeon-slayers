import GameState from './GameState.js';
import UIController from './UIController.js';

class Game {
  state = null;
  ui = null;

  constructor(uiElements) {
    this.state = new GameState();
    this.ui = new UIController(uiElements);
    uiElements.forEach((element) => element.setUpdateCallback(
      (state) => this.updateState(state),
    ));
  }

  updateState(state) {
    this.state.set(state);
    this.ui.updateUi(this.state.get());
  }
}

export default Game;
