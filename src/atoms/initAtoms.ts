import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "../types/auth";
import { atomWithStorage } from "jotai/utils";

export const createAsyncStorageAdapter = <T>() => ({
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  },
  setItem: async (key: string, newValue: T | null) => {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
});
const authStorage = createAsyncStorageAdapter<auth>();

export const authAtom = atomWithStorage<auth | null>("Auth", null, authStorage);
