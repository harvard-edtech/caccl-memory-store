import CACCLStore from './CACCLStore';
declare class CACCLMemoryStore implements CACCLStore {
    private primaryStore;
    private secondaryStore;
    private mutex;
    /**
     * Create a new memory store instance
     * @author Gabe Abrams
     * @param minLifespanSec the minimum number of seconds that the store will
     *   keep entries
     */
    constructor(minLifespanSec: number);
    /**
     * Rotate primary store and secondary store
     * @author Gabe Abrams
     */
    private rotate;
    /**
     * Look up an entry in the store
     * @author Gabe Abrams
     * @param key the key to use in the lookup
     * @returns JSON value object
     */
    get(key: string): Promise<object | undefined>;
    /**
     * Add/overwrite an entry in the store
     * @author Gabe Abrams
     * @param key the key to use for lookups
     * @param value JSON value object
     */
    set(key: string, value: object): Promise<void>;
}
export default CACCLMemoryStore;