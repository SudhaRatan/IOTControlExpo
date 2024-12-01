import auth from "../types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage } from "jotai/utils";

const authStorageAdapter = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) as auth : null;
  },
  setItem: async (key: string, newValue: auth | null) => {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};
export const authAtom = atomWithStorage<auth | null>("Auth", null, authStorageAdapter);
