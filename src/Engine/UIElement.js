class UIElement {
  /**
   * @type {(state: import('./GameState').CastleSlayersState) => void | null}
   */
  updateState = null;

  /**
   * @type {() => Element | null}
   */
  getElement = null;

  constructor(getElement) {
    this.getElement = getElement;
  }

  init() {
    throw new Error('Init not implemented');
  }

  set() {
    throw new Error('Update not implemented');
  }

  setUpdateCallback(updateCallback) { this.updateState = updateCallback; }
}

export default UIElement;
