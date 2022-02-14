class UIController {
  scenes = [];

  currentScene = null;

  constructor(scenes) {
    this.scenes = scenes;
  }

  /**
   * @param {import('./UIScene').default} scene 
   */
  setScene(scene) {
    this.currentScene = scene;
    this.currentScene.init();
    this.currentScene.initElements();
  }

  updateUi(state) {
    this.scenes.forEach((scene) => {
      scene.update(state);
    });
  }
}

export default UIController;
