import Game from './Engine/Game.js';
import MainMenuScene from './UIElements/sc_MainMenu.js';
import StartGameButton from './UIElements/ui_StartGameButton.js';

const game = new Game(
  [
    new MainMenuScene(
      document.getElementById('main_menu'),
      [
        new StartGameButton(document.getElementById('start_game')),
      ],
    ),
  ],
);
