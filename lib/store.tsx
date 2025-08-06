import { posix } from "path";
import { create } from "zustand";

export interface Store {
  position: number[];
  setPosition: (x: number[]) => void;
}

export const useStore = create<Store>((set) => ({
  position: [1],
  setPosition: (x: number[]) => set(() => ({ position: x })),
}));
