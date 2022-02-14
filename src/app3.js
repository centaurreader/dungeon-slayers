
/**
 * Converts Template Element contents to node
 * @param {HTMLTemplateElement} template 
 * @returns {HTMLElement}
 */
function templateToInstance(template) {
  const container = document.createElement(template.content.children[0].nodeName);
  container.setAttribute('id', template.getAttribute('id').replace('_template', ''));
  template.content.children[0].childNodes.forEach((childNode) => {
    container.appendChild(childNode.cloneNode(true));
  });
  return container;
}

/**
 * Append element to app
 * @param {HTMLElement} element 
 */
function mountElement(element) {
  document.body.appendChild(element);
}

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

class GameState {
  #sceneStack;

  scenes;

  /**
   * 
   * @param {{
   *   scenes: UIScene[],
   * }} options
   */
  constructor({
    scenes,
  }) {
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
}

const game = new GameState({
  scenes: [
    new UIScene({
      name: 'MAIN_MENU',
      templateGetter: () => document.getElementById('main_menu_template'),
      onRender: (instance, state) => {
        const button = instance.querySelector('#new_game_button');
        button.addEventListener('click', () => {
          state.changeScene(state.scenes.find((scene) => scene.name === 'GAME'));
        });
      },
    }),
    new UIScene({
      name: 'GAME',
      templateGetter: () => document.getElementById('game_template'),
      onRender: (instance, state) => {
        const button = instance.querySelector('#quit_game_button');
        button.addEventListener('click', () => {
          state.changeScene(state.scenes.find((scene) => scene.name === 'MAIN_MENU'));
        });
      },
    }),
  ],
});
game.updateUi();
