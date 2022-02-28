import CACCLStore from './CACCLStore';
import CACCLStoreValue from './CACCLStoreValue';
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
    get(key: string): Promise<CACCLStoreValue | undefined>;
    /**
     * Add/overwrite an entry in the store
     * @author Gabe Abrams
     * @param key the key to use for lookups
     * @param value JSON value object
     * @returns previously stored value if there was one
     */
    set(key: string, value: CACCLStoreValue): Promise<CACCLStoreValue | undefined>;
}
export default CACCLMemoryStore;
