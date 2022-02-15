class GameState {
  #sceneStack;

  scenes;

  stateObject;

  /**
   * @param {{
   *   initialState: Record<string, unknown>;
   *   scenes: UIScene[],
   * }} options
   */
  constructor({
    initialState,
    scenes,
  }) {
    this.stateObject = initialState;
    this.scenes = scenes;
    this.#sceneStack = [this.scenes[0]];
  }

  updateUi() {
    this.#sceneStack[this.#sceneStack.length - 1].render(this);
  }

  /**
   * @param {UIScene} scene 
   */
  changeScene(scene) {
    this.#sceneStack.push(scene);
    this.#sceneStack[this.#sceneStack.length - 2].unmount();
    this.updateUi();
  }

  /**
   * @param {Record<string, unknown>} stateUpdate
   */
  updateStateObject(stateUpdate) {
    this.stateObject = {
      ...this.stateObject,
      ...stateUpdate,
    };
  }
}

export default GameState;
