class GameState {
  state = {};

  constructor(state) {
    this.state = state;
  }

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
