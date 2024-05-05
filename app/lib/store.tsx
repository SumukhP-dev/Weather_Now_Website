import { create } from "zustand";

export const useStore = create((set) => ({
  sliderPosition: 0,
}));
