import { create } from "zustand";
interface UpdatePostState {
  isOpen: boolean;
}

interface UpdatePostActions {
  onOpen: () => void;
  onClose: () => void;
}
const useUpdatePost = create<UpdatePostState & UpdatePostActions>((set) => ({
  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdatePost;
