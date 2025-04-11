import { create } from "zustand";

const useRedirectionStore = create((set) => ({
  isRedirecting: false,

  setIsRedirecting: (value) => set({ isRedirecting: value }),
}));

export default useRedirectionStore;
