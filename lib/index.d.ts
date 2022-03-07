import CACCLMemoryStore from './CACCLMemoryStore';
/**
 * Create a new memory store
 * @author Gabe Abrams
 * @param minLifespanSec the minimum number of seconds that the store will
 *   keep entries
 */
declare const initCACCLMemoryStore: (minLifespanSec: number) => Promise<CACCLMemoryStore>;
export default initCACCLMemoryStore;
