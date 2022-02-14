import GameState from './GameState.js';
import UIController from './UIController.js';

class Game {
  /**
   * @type {import('./GameState').default}
   */
  state = null;

  /**
   * @type {import('./UIController').default}
   */
  ui = null;

  /**
   * @param {import('./UIScene').default[]} scenes 
   */
  constructor(scenes) {
    this.state = new GameState();
    this.ui = new UIController(scenes);
    scenes.forEach((scene) => scene.setUpdateCallback(
      (state) => this.updateState(state),
    ));
    this.ui.setScene(scenes[0]);
  }

  /**
   * @param {import('./GameState').CastleSlayersState} state 
   */
  updateState(state) {
    console.log(state);
    this.state.set(state);
    this.ui.updateUi(this.state.get());
  }
}

export default Game;
