import CACCLStoreValue from './CACCLStoreValue';
interface CACCLStore {
    /**
     * Get the value stored at a specific key
     * @param key the key to use for the lookup
     * @returns stored JSON object or undefined if none found
     */
    get(key: string): Promise<CACCLStoreValue | undefined>;
    /**
     * Store
     * @param key
     * @param value
     * @returns previously stored value if there was one
     */
    set(key: string, value: CACCLStoreValue): Promise<CACCLStoreValue | undefined>;
}
export default CACCLStore;
