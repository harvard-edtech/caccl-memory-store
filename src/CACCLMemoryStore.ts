// Import libs
import locks from 'locks';

// Import shared types
import CACCLStore from './CACCLStore';

class CACCLMemoryStore implements CACCLStore {
  private primaryStore: Map<string, object>;
  private secondaryStore: Map<string, object>;
  private mutex: locks.Mutex;

  /**
   * Create a new memory store instance
   * @author Gabe Abrams
   * @param minLifespanSec the minimum number of seconds that the store will
   *   keep entries
   */
  constructor(minLifespanSec: number) {
    // Initialize state
    this.primaryStore = new Map<string, object>();
    this.secondaryStore = new Map<string, object>();
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
      this.secondaryStore = new Map<string, object>(this.primaryStore);
      this.primaryStore = new Map<string, object>();
      this.mutex.unlock();
    });
  }

  /**
   * Look up an entry in the store
   * @author Gabe Abrams
   * @param key the key to use in the lookup
   * @returns JSON value object
   */
  public async get(key: string): Promise<object | undefined> {
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
   */
  public async set(key: string, value: object) {
    // Set in primary store
    this.mutex.lock(() => {
      this.primaryStore.set(key, value);
      this.mutex.unlock();
    });
  }
}

export default CACCLMemoryStore;
