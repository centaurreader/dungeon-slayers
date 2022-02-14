import { templateToInstance, mountElement } from './helpies.js';

class UIScene {
  /**
   * @type {() => HTMLTemplateElement}
   */
  #templateGetter;

  /**
   * Holds the template while the instance is active
   * so that selectors do not collide
   * @type {HTMLTemplateElement}
   */
  #inMemoryTemplate;

  /**
   * @type {HTMLElement}
   */
  instance;

  /**
   * @type {(instance: HTMLElement, state: GameState) => void}
   */
  #onRender;

  /**
   * @type {string}
   */
  name;

  /**
   * 
   * @param {{
   *   name: string;
   *   templateGetter: () => HTMLTemplateElement;
   *   onRender: (instance: HTMLElement, state: import('./GameState').GameState) => void;
   * }} options
   */
  constructor({
    name,
    templateGetter,
    onRender,
  }) {
    this.name = name;
    this.#templateGetter = templateGetter;
    this.#inMemoryTemplate = this.template;
    this.#onRender = onRender;
  }

  get template() {
    return this.#templateGetter();
  }

  /**
   * @param {GameState} state 
   */
  render(state) {
    this.instance = templateToInstance(
      this.template
    );
    mountElement(this.instance);
    document.body.removeChild(this.template);
    this.#onRender(this.instance, state);
  }

  unmount() {
    document.body.removeChild(this.instance);
    document.body.appendChild(this.#inMemoryTemplate);
  }
}

export default UIScene;
