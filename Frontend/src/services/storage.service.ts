// Typed AsyncStorage wrappers. Use these instead of calling AsyncStorage
// directly so key names stay consistent across the whole app.

import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  AUTH_USER: 'bean_auth_user',
  AUTH_TOKEN: 'bean_auth_token',
  USER_NAME: 'bean_user_name',
  GUARDIAN_NAME: 'bean_guardian_name',
  THEME: 'bean_theme',
} as const;

export const storage = {
  setString: async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value);
  },

  getString: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setObject: async <T>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  getObject: async <T>(key: string): Promise<T | null> => {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  remove: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },

  removeMany: async (keys: string[]): Promise<void> => {
    await AsyncStorage.multiRemove(keys);
  },

  // Clears only the session keys — call this on logout.
  clearSession: async (): Promise<void> => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_USER,
      STORAGE_KEYS.AUTH_TOKEN,
    ]);
  },
};
