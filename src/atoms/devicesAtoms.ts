import { atom } from "jotai";
import { Thing } from "../types/types";
import { atomWithStorage } from "jotai/utils";
import { createAsyncStorageAdapter } from "./initAtoms";

const deviceStorage = createAsyncStorageAdapter<Thing[]>();

export const devices = atomWithStorage<Thing[] | null>(
  "devices",
  null,
  deviceStorage
);

export const device = atom<Thing>({ icon: "home", name: "" } as Thing);

export const loadingDevices = atom(false)