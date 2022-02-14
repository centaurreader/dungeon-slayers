/**
 * @typedef {Object} CastleSlayersState
 * @property {Object} game
 */

class GameState {
  /**
   * @type {CastleSlayersState}
   */
  state = {};

  constructor(state) {
    this.state = state;
  }

  /**
   * @param {CastleSlayersState} state 
   */
  set(state) {
    this.state = {
      ...this.state,
      ...state,
    };
  }

  get() {
    return this.state;
  }
}

export default GameState;
