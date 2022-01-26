class UIController {
  scenes = [];

  constructor(scenes) {
    this.scenes = scenes;
  }

  pushScene(scene) {
    this.scenes.push(scene);
  }

  popScene(scene) {
    this.scenes.pop(scene);
  }

  updateUi(state) {
    this.scenes.forEach((scene) => {
      scene.update(state);
    });
  }
}

export default UIController;
