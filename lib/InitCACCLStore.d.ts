import CACCLStore from './CACCLStore';
/**
 * Create a new store
 * @param minLifespanSec the minimum number of seconds that the store will
 *   keep entries
 */
declare type InitCACCLStore = (minLifespanSec: number) => Promise<CACCLStore>;
export default InitCACCLStore;
