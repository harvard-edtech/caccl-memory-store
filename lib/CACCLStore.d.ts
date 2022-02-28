interface CACCLStore {
    /**
     * Get the value stored at a specific key
     * @param key the key to use for the lookup
     * @returns stored JSON object or undefined if none found
     */
    get(key: string): Promise<object | undefined>;
    /**
     * Store
     * @param key
     * @param value
     */
    set(key: string, value: object): Promise<void>;
}
export default CACCLStore;
