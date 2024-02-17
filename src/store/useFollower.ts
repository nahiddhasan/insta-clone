import { create } from "zustand";

interface FollowerActions {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useFollower = create<FollowerActions>((set) => ({
  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFollower;
