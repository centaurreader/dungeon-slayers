import Game from './Engine/Game.js';
import MainMenuScene from './UIElements/sc_MainMenu.js';
import StartGameButton from './UIElements/ui_StartGameButton.js';

const game = new Game(
  [
    new MainMenuScene(
      () => document.getElementById('main_menu'),
      [
        new StartGameButton(() => document.querySelector('[data-id="start_game"]')),
      ],
    ),
  ],
);
window.game = game;
