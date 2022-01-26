import Game from './Engine/Game.js';
import UIScene from './Engine/UIScene.js';
import StartGameButton from './UIElements/StartGameButton.js';

const game = new Game(
  [
    new UIScene(
      'main-menu',
      document.getElementById('main_menu'),
      [
        new StartGameButton(document.getElementById('start_game')),
      ],
    ),
  ],
);
