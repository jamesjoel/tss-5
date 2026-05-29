import { MMKV } from 'react-native-mmkv';

// Initialize MMKV storage instance
export const storage = new MMKV();

export const StorageService = {
  /**
   * Save a string or JSON to cache
   */
  set: (key, value) => {
    try {
      const dataStr = typeof value === 'object' ? JSON.stringify(value) : value;
      storage.set(key, dataStr);
      return true;
    } catch (e) {
      console.warn('Storage: Save failed', e);
      return false;
    }
  },

  /**
   * Read string or parse object
   */
  get: (key, isObject = false) => {
    try {
      const value = storage.getString(key);
      if (!value) return null;
      return isObject ? JSON.parse(value) : value;
    } catch (e) {
      console.warn('Storage: Read failed', e);
      return null;
    }
  },

  /**
   * Delete entry
   */
  delete: (key) => {
    storage.delete(key);
  },

  /**
   * Wipe all cache records
   */
  clearAll: () => {
    storage.clearAll();
  },
};

export default StorageService;
