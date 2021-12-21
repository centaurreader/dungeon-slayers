/**
 * @typedef {[number, number]} Dimensions
 */

/**
 * @typedef {[number, number]} Coordinate
 */

/**
 * @typedef {Record<string, unknown>} ArenaOptions
 * @property {Dimensions} dimensions
 * @property {number} monsterCount
 */

/**
 * @typedef {Record<string, unknown>} GameOptions
 * @property {number} playerCount
 * @property {ArenaOptions} arena
 */

/**
 * @typedef {Record<string, unknown>} Entity
 * @property {string} name
 * @property {Coordinate} position
 * @property {HTMLElement} el
 * @property {string[]} abilities
 * @property {number} hp
 */

/**
 * @typedef {Record<string, unknown>} Monster
 * @extends {Entity}
 */

/**
 * @typedef {Record<string, unknown>} Player
 * @extends {Entity}
 * @property {number} playerNumber
 */

/**
 * @type {GameOptions}
 */
const GAME_OPTIONS = {
  playerCount: 1,
  arena: {
    dimensions: [8, 8],
    monsterCount: 2,
  },
};

const ABILITIES_MAP = {
  blue: 'lightning',
  black: 'physical',
  white: 'evade',
  red: 'fire',
};

const mapEl = document.getElementById('map');
const turnOrderEl = document.getElementById('turn_order');
const abilitiesEl = document.getElementById('abilities');

function createModal(content) {
  const modalContainerEl = document.createElement('div');
  const modalScrimEl = document.createElement('div');
  modalScrimEl.classList.add('scrim');
  modalContainerEl.appendChild(modalScrimEl);
  const modalEl = document.createElement('div');
  modalEl.classList.add('modal');
  modalEl.appendChild(content);
  modalContainerEl.appendChild(modalEl);
  return modalContainerEl;
}

function requestAbilities(state) {
  const abilityFormEl = document.createElement('form');
  const abilityListEl = document.createElement('ul');
  state.getTurnOrder()[0].abilities.forEach((ability, i) => {
    const abilityEl = document.createElement('li');
    const abilityLabelEl = document.createElement('label');
    abilityLabelEl.setAttribute('for', `${ability}-${i}`);

    const abilityInputEl = document.createElement('input');
    abilityInputEl.setAttribute('type', 'checkbox');
    abilityInputEl.setAttribute('name', `${ability}-${i}`);
    abilityLabelEl.appendChild(abilityInputEl);
    
    const abilityLabelContentEl = document.createElement('span');
    console.log(ability);
    abilityLabelContentEl.innerText = ability;
    abilityLabelEl.appendChild(abilityLabelContentEl);

    abilityEl.appendChild(abilityLabelEl);
    abilityListEl.appendChild(abilityEl);
  });
  abilityFormEl.appendChild(abilityListEl);

  const abilitySubmitEl = document.createElement('button');
  abilitySubmitEl.innerText = 'Select Abilities';
  abilityFormEl.appendChild(abilitySubmitEl);

  const modal = createModal(abilityFormEl);

  abilityFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    document.body.removeChild(modal);
  });

  document.body.appendChild(modal);
}

/**
 * @param {Coordinate} curr 
 * @param {Coordinate} dest 
 * @returns {Coordinate[]} 
 */
function calcPath(curr, dest) {
  const isMovingDown = curr[1] < dest[1];
  const isMovingUp = curr[1] > dest[1];
  const isMovingRight = curr[0] < dest[0];
  const isMovingLeft = curr[0] > dest[0];

  const moves = [];
  // move on y axis
  if (isMovingDown) {
    for (let i = 1; i <= dest[1]; i++) {
      moves.push([curr[0], curr[1] + i]);
    }
  } else if (isMovingUp) {
    for (let i = curr[1] - 1; i >= dest[1]; i--) {
      moves.push([curr[0], curr[1] - (curr[1] - i)]);
    }
  }
  // move on x axis
  const yPos = moves.length ? moves[moves.length - 1][1] : curr[1];
  if (isMovingRight) {
    for (let i = 1; i <= dest[0]; i++) {
      moves.push([curr[0] + i, yPos]);
    }
  } else if (isMovingLeft) {
    for (let i = curr[0] - 1; i >= dest[0]; i--) {
      moves.push([curr[0] - (curr[0] - i), yPos]);
    }
  }

  return moves;
}

/**
 * @param {State} state
 * @returns {HTMLElement}
 */
function genArena(state) {
  return new Array(state.getOptions().arena.dimensions[1])
    .fill(undefined)
    .map((_, rowIndex) => {
      const rowEl = document.createElement('tr');
      const rowId = `row-${rowIndex}`;
      rowEl.setAttribute('id', rowId);
      return {
        id: rowId,
        cols: new Array(state.getOptions().arena.dimensions[0])
          .fill(undefined)
          .map((_, colIndex) => {
            const colEl = document.createElement('td');
            const colId = `col-${colIndex}-row-${rowIndex}`;
            colEl.setAttribute('id', colId);
            const colContentEl = document.createElement('div');
            const colContentId = `col-${colIndex}-row-${rowIndex}-content`;
            colContentEl.setAttribute('id', colContentId);
            colContentEl.classList.add('cell_contents');
            colEl.appendChild(colContentEl);
  
            colEl.addEventListener('mouseenter', () => {
              refreshUi(state);
              const entity = state.getTurnOrder()[0];
              // display the path from current space to desired space
              const path = calcPath(entity.position, [colIndex, rowIndex]);
              path.forEach((coordinate, i) => {
                // indicate if abilities will permit this or not
                const color = i > entity.abilities.length - 1 ? 'red' : 'cyan';
                const el = document.getElementById(`col-${coordinate[0]}-row-${coordinate[1]}`);
                el.setAttribute('style', `background-color: ${color};`);
              });
            }); 
            
            colEl.addEventListener('click', () => {
              const entity = state.getTurnOrder()[0];
              // check if this is a valid move
              const path = calcPath(entity.position, [colIndex, rowIndex]);
              const isValid = path.length <= entity.abilities.length;
              if (isValid) {
                // todo: if so, ask player to commit abilities and perform updates
                requestAbilities(state);
              }
            });

            rowEl.appendChild(colEl);
            return {
              id: colId,
              contentId: colContentId,
              coordinates: [colIndex, rowIndex],
              el: colEl,
              contentEl: colContentEl,
            };
          }),
        el: rowEl,
      };
    });
}

/**
 * @param {State} state 
 */
function drawArena(state) {
  state.getArena().forEach((row) => {
    if (!document.getElementById(row.id)) {
      mapEl.appendChild(row.el);
    }
    row.cols.forEach((col) => {
      col.el.setAttribute('style', '');
    });
  });
}

/**
 * @returns {Monster}
 */
function genMonster() {
  const name = new Array(Math.ceil(Math.random() * 4))
    .fill(undefined)
    .reduce((result) => `${result}${String.fromCharCode(Math.ceil((Math.random() * 25) + 65))}`, '');
  const el = document.createElement('p');
  el.innerText = name;
  return {
    name,
    hp: 10,
    abilities: [
      ABILITIES_MAP.black,
      ABILITIES_MAP.black,
    ],
    position: [0,0],
    el,
  };
}

/**
 * @param {number} monsterCount
 * @returns {Monster[]}
 */
function createMonsters(monsterCount) {
  return new Array(monsterCount)
    .fill(undefined)
    .map(genMonster)
}

/**
 * @param {number} playerNumber 
 * @returns {Player}
 */
function genPlayer(playerNumber) {
  const name = `Player ${playerNumber}`;
  const el = document.createElement('p');
  el.innerText = name;
  return {
    hp: 10,
    name,
    position: [0, 0],
    playerNumber,
    abilities: [
      ABILITIES_MAP.black,
      ABILITIES_MAP.black,
      ABILITIES_MAP.white,
    ],
    el,
  };
}

/**
 * @param {number} playerCount 
 * @returns {Player[]}
 */
function createPlayers(playerCount) {
  return new Array(playerCount)
    .fill(undefined)
    .map((_, i) => genPlayer(i))
}

/**
 * @param {Entity[]} entities 
 * @returns {HTMLElement}
 */
function genTurnOrder(entities) {
  const containerEl = document.createElement('ol');
  entities.forEach((entity) => {
    const entityEl = document.createElement('li');
    entityEl.innerText = entity.name;
    containerEl.appendChild(entityEl);
  });
  return containerEl;
}

function genSkillsUi(abilities) {
  const skillsContainer = document.createElement('ul');
  abilities.forEach((ability) => {
    const abilityEl = document.createElement('li');
    abilityEl.innerText = ability;
    skillsContainer.appendChild(abilityEl);
  });
  return skillsContainer;
}

function State() {
  let options = null;
  this.setOptions = (opt) => { options = opt; };
  this.getOptions = () => options;

  let arena = null;
  this.setArena = (a) => { arena = a; };
  this.getArena = () => arena;

  let turnOrder = [];
  this.setTurnOrder = (newOrder) => { turnOrder = newOrder; }
  this.getTurnOrder = () => turnOrder;
  this.advanceTurn = () => {
    this.setTurnOrder([
      ...this.getTurnOrder().slice(1, this.getTurnOrder().length),
      this.getTurnOrder()[0],
    ]);
  };

  let monsters = null;
  this.setMonsters = (m) => { monsters = m; };
  this.getMonsters = () => monsters;

  let players = null;
  this.setPlayers = (p) => { players = p; };
  this.getPlayers = () => players;
}

function refreshUi(state) {
  // update turn order
  const turnOrder = genTurnOrder(state.getTurnOrder());
  turnOrderEl.replaceChildren(turnOrder);

  // redraw arena
  drawArena(state);

  // draw entities
  [...state.getPlayers(), ...state.getMonsters()].forEach((monster) => {
    const containerEl = document.getElementById(`col-${monster.position[0]}-row-${monster.position[1]}-content`);
    containerEl.appendChild(monster.el);
  });

  // redraw abilities for new entity turn
  abilitiesEl.replaceChildren(genSkillsUi(state.getTurnOrder()[0].abilities));
}

/**
 * @param {GameOptions} options 
 */
function initGame(options) {
  const state = new State(); 
  state.setOptions(options);

  state.setArena(genArena(state));

  state.setMonsters(createMonsters(options.arena.monsterCount));
  state.getMonsters()[0].position = [1, 1]; // todo: remove this and randomly gen based on scenario tile
  state.getMonsters()[1].position = [6, 1]; // todo: remove this and randomly gen based on scenario tile

  state.setPlayers(createPlayers(options.playerCount));
  state.getPlayers()[0].position = [0,7]; // todo: remove this and make players pick

  state.setTurnOrder([...state.getPlayers(), ...state.getMonsters()]);

  const endTurnButton = document.createElement('button');
  endTurnButton.innerText = 'End Turn';
  endTurnButton.addEventListener('click', () => {
    state.advanceTurn();
    refreshUi(state);
  });
  document.body.appendChild(endTurnButton);

  refreshUi(state);
}

initGame(GAME_OPTIONS);
