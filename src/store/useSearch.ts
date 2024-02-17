import { create } from "zustand";
interface SearchState {
  isOpen: boolean;
}

interface SearchActions {
  onOpen: () => void;
  onClose: () => void;
}
const useSearch = create<SearchState & SearchActions>((set) => ({
  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearch;
