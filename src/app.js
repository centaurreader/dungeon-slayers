class Nation {
  /**
   * @type {string}
   */
  name = '';

  /**
   * @type {string}
   */
  id = null;

  /**
   * @type {Terrain[][]}
   */
  terrain = [];

  /**
   * @type {Terrain}
   */
  nationTerrain = null;

  
  /**
   * @param {{
   *   name: string;
   *   terrain: Terrain[][];
   *   id: string;
   *   nationTerrain: Terrain;
   * }} config 
   */
  constructor({ name, terrain, id, nationTerrain }) {
    this.id = id;
    this.name = name;
    this.terrain = terrain;
    this.nationTerrain = nationTerrain;
  }

  buildUi() {
    console.log(this.terrain);
    const nationTemplate = `<li class="nation nation_${this.id}">
      <p class="nation_name">${this.name}</p>
      <ul class="nation_cards">
          <li class="nation_card"></li>
          <li class="nation_card"></li>
          <li class="nation_card"></li>
      </ul>
      <ul class="nation_terrain">
        ${this.terrain
          .map((terrainRow) => `<li>
            <ul class="nation_terrain_row">
              ${terrainRow
                  .map((terrain) => `<li class="nation_terrain_card terrain_${terrain.type.toLowerCase()}"></li>`)
                  .join('\n')}
            </ul>
          </li>`)
          .join('\n')}
      </ul>
    </li>
    `;
    
    const tempContainer = document.createElement('ul');
    tempContainer.innerHTML = nationTemplate;
    return tempContainer.firstChild;
  }
}

/**
 * @readonly
 * @enum {string}
 */
const TerrainType = {
  PLAIN: 'Plain', // +w=wetland +s=mtn +v=chasm
  FOREST: 'Forest', // +w=swamp +s=mtn +v=cave
  AQUATIC: 'Aquatic', // +w=sea +s=mtn +v=underwater cave
  DESERT: 'Desert', // +w=oasis +s=mtn +v=crater
  TUNDRA: 'Tundra', // +w=frozen lake +s=mtn +v=sinkhole
};

const TerrainGroup = {
  [TerrainType.PLAIN]: [TerrainType.FOREST, TerrainType.AQUATIC],
  [TerrainType.FOREST]: [TerrainType.PLAIN, TerrainType.TUNDRA],
  [TerrainType.AQUATIC]: [TerrainType.DESERT, TerrainType.PLAIN],
  [TerrainType.DESERT]: [TerrainType.PLAIN, TerrainType.AQUATIC],
  [TerrainType.TUNDRA]: [TerrainType.FOREST, TerrainType.AQUATIC],
}

/**
 * @readonly
 * @enum {string}
 */
const TerrainModifier = {
  VOID: 'Void',
  WATER: 'Water',
  STONE: 'Stone',
};

class Terrain {
  /**
   * @type {string}
   */
  id = null;

  /**
   * @type {TerrainModifier[]}
   */
  modifiers = null;

  /**
   * @type {TerrainType}
   */
  type = null;

  constructor({ modifiers, type }) {
    this.id = Math.random().toString();
    this.modifiers = modifiers;
    this.type = type;
  }
}

/**
 * @type {{
 *   nations: Nation[][];
 *   terrain: Terrain[][];
 * }}
 */
const STATE = {
  nations: [],
  terrain: [],
};

function getRandomFromList(list) {
  return list[Math.ceil(Math.random() * list.length - 1)];
}
function getRandomTerrainType(types) {
  return getRandomFromList(types || Object.values(TerrainType));
}

function weightTerrainGroup(group) {
  return [].concat(
    new Array(9).fill(group[0]),
    new Array(1).fill(group[1]),
  );
}

/**
 * @param {{
 *   nationCount: number;
 *   terrainSize: number;
 * }} settings
 */
function startGame({
  nationCount,
  terrainSize,
}) {
  const nations = document.getElementById('nations');
  STATE.nations = new Array(nationCount)
    .fill(undefined)
    .map((_, i) => {
      const nationTerrain = getRandomTerrainType();
      return new Nation({
        id: i,
        name: Math.random().toString(),
        nationTerrain,
        terrain: new Array(terrainSize)
          .fill(undefined)
          .map(() => [
            new Terrain({ type: getRandomTerrainType(TerrainGroup[nationTerrain]) }),
            new Terrain({ type: getRandomTerrainType(TerrainGroup[nationTerrain]) }),
            new Terrain({ type: getRandomTerrainType(TerrainGroup[nationTerrain]) }),
          ]),
      });
    });

  STATE.nations.forEach((nation) => {
    const ui = nation.buildUi();
    nations.appendChild(ui);
  });
}
startGame({
  nationCount: 3,
  terrainSize: 3,
});
