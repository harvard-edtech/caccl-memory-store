// Import libs
import locks from 'locks';

// Import shared types
import CACCLStore from './CACCLStore';
import CACCLStoreValue from './CACCLStoreValue';

class CACCLMemoryStore implements CACCLStore {
  private primaryStore: Map<string, CACCLStoreValue>;
  private secondaryStore: Map<string, CACCLStoreValue>;
  private mutex: locks.Mutex;

  /**
   * Create a new memory store instance
   * @author Gabe Abrams
   * @param minLifespanSec the minimum number of seconds that the store will
   *   keep entries
   */
  constructor(minLifespanSec: number) {
    // Initialize state
    this.primaryStore = new Map<string, CACCLStoreValue>();
    this.secondaryStore = new Map<string, CACCLStoreValue>();
    this.mutex = locks.createMutex();

    // Calculate a swap interval
    const swapIntervalSec = Math.ceil(minLifespanSec / 2);

    // Start a swap process
    setInterval(
      () => {
        this.rotate();
      },
      swapIntervalSec,
    );
  }

  /**
   * Rotate primary store and secondary store
   * @author Gabe Abrams
   */
  private async rotate() {
    this.mutex.lock(() => {
      this.secondaryStore = new Map<string, CACCLStoreValue>(this.primaryStore);
      this.primaryStore = new Map<string, CACCLStoreValue>();
      this.mutex.unlock();
    });
  }

  /**
   * Look up an entry in the store
   * @author Gabe Abrams
   * @param key the key to use in the lookup
   * @returns JSON value object
   */
  public async get(key: string): Promise<CACCLStoreValue | undefined> {
    // Look up in either store
    return (
      this.primaryStore.get(key)
      ?? this.secondaryStore.get(key)
      ?? undefined
    );
  }

  /**
   * Add/overwrite an entry in the store
   * @author Gabe Abrams
   * @param key the key to use for lookups
   * @param value JSON value object
   * @returns previously stored value if there was one
   */
  public async set(key: string, value: CACCLStoreValue): Promise<CACCLStoreValue | undefined> {
    return new Promise((resolve) => {
      // Set in primary store
      this.mutex.lock(() => {
        const prevValue = this.get(key);
        this.primaryStore.set(key, value);
        this.mutex.unlock();

        // Finish
        resolve(prevValue ?? undefined);
      });
    });
  }
}

export default CACCLMemoryStore;
