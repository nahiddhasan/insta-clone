import { create } from "zustand";
interface CreatePostState {
  isOpen: boolean;
}

interface CreatePostActions {
  onOpen: () => void;
  onClose: () => void;
}
const useCreatePost = create<CreatePostState & CreatePostActions>((set) => ({
  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreatePost;
