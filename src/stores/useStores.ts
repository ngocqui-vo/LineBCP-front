import cachedKeys from "@/contants/cachedKeys";
import { create } from "zustand";

type AllQueryKeys = keyof typeof cachedKeys;

const useStore = create<{ [key: string]: any }>((set) => ({
  state: {},
  save: (key: AllQueryKeys, value: any) => {
    return set((rootState) => ({
      state: {
        ...rootState.state,
        [key]: value,
      },
    }));
  },
}));

export const useSave = () => useStore((rootState) => rootState.save);
export const useGet = (key: AllQueryKeys) => useStore((rootState) => rootState.state?.[key]);
export default useStore;
