import { uuidv4 } from './helpies.js';

/**
 * @typedef {Record<string, unknown>} SaveSlot
 */

/**
 * @returns {SaveSlot}
 */
function getNewSaveSlot() {
  return {
    id: uuidv4(),
    data: null,
  };
}

class Persistence {
  /**
   * @type {SaveSlot}
   */
  slots;
  
  /**
   * @type {string}
   */
  #key;

  /**
   * @param {{
   *   key: string;
   *   slotCount: number;
   * }} options 
   */
  constructor({
    key,
    slotCount,
  }) {
    this.#key = key;

    let persistedData = [];
    try {
      persistedData = JSON.parse(localStorage.getItem(key));
      if (persistedData === null) {
        throw new Error('');
      }
    } catch (err) {
      persistedData = new Array(slotCount).fill(undefined).map(getNewSaveSlot);
    }
    this.slots = persistedData;
  }

  /**
   * @param {string} id 
   * @param {unknown} data 
   */
  save(id, data) {
    localStorage.setItem(this.#key, JSON.stringify(this.slots.map((slot) => {
      if (slot.id === id) {
        return {
          id,
          data,
        };
      }
      return slot;
    })));
  }

  load(id) {
    return this.slots.find((slot) => slot.id === id);
  }
}

export default Persistence;
