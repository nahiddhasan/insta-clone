"use client";
import { PostsWithAll } from "@/types/post";
import { addBookmark } from "@/utils/actions";
import { SavedPost } from "@prisma/client";
import { useOptimistic } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
const Bookmark = ({
  post,
  userId,
}: {
  post: PostsWithAll;
  userId?: string;
}) => {
  const predicate = (bookmark: SavedPost) =>
    bookmark.postId === post.id && bookmark.userId === userId;
  const [optimisticBookmark, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedPosts,
    //@ts-ignore
    (state: SavedPost[], newSaved: SavedPost) =>
      state.some(predicate)
        ? state.filter((savedPost) => savedPost.userId !== userId)
        : [...state, newSaved]
  );

  return (
    <div>
      <form
        action={async (formdata: FormData) => {
          const postId = formdata.get("postId");
          addOptimisticBookmark({ postId, userId });
          await addBookmark(postId);
        }}
      >
        <input type="text" defaultValue={post.id} name="postId" hidden />
        <button type="submit">
          {optimisticBookmark?.some(predicate) ? (
            <IoBookmark size={22} />
          ) : (
            <IoBookmarkOutline size={22} />
          )}
        </button>
      </form>
    </div>
  );
};

export default Bookmark;
