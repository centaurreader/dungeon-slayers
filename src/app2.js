import Game from './Engine/Game.js';
import StartGameButton from './UIElements/StartGameButton.js';

const game = new Game(
  [
    new StartGameButton(document.getElementById('start_game')),
  ],
);
