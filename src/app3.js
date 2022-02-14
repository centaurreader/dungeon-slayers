import GameState from './CentEngine/GameState.js';
import UIScene from './CentEngine/UIScene.js';

const game = new GameState({
  initialState: {},
  scenes: [
    new UIScene({
      name: 'MAIN_MENU',
      templateGetter: () => document.getElementById('main_menu_template'),
      onRender: (instance, state) => {
        const form = instance.querySelector('#new_game_form');
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          state.updateStateObject({
            name: data.get('name'),
          });
          state.changeScene(state.scenes.find((scene) => scene.name === 'GAME'));
        });
      },
    }),
    new UIScene({
      name: 'GAME',
      templateGetter: () => document.getElementById('game_template'),
      onRender: (instance, state) => {
        const greeting = document.querySelector('#game_greeting');
        greeting.innerText = `Welcome, ${state.stateObject.name}`;
        const button = instance.querySelector('#quit_game_button');
        button.addEventListener('click', () => {
          state.changeScene(state.scenes.find((scene) => scene.name === 'MAIN_MENU'));
        });
      },
    }),
  ],
});
game.updateUi();
