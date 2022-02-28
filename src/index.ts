import CACCLMemoryStore from './CACCLMemoryStore';

/**
 * Create a new memory store
 * @param minLifespanSec the minimum number of seconds that the store will
 *   keep entries
 */
const initCACCLMemoryStore = async (minLifespanSec: number) => {
  return new CACCLMemoryStore(minLifespanSec);
};

export default initCACCLMemoryStore;
