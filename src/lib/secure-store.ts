import * as SecureStore from "expo-secure-store";
export const secure = {
  async get(key: string) { return SecureStore.getItemAsync(key); },
  async set(key: string, value: string) { return SecureStore.setItemAsync(key, value); },
  async del(key: string) { return SecureStore.deleteItemAsync(key); },
};
