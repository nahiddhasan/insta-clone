"use client";
import { PostsWithAll } from "@/types/post";
import { likePost } from "@/utils/actions";
import { Like } from "@prisma/client";
import { useOptimistic } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const Like = ({ post, userId }: { post: PostsWithAll; userId?: string }) => {
  const predicate = (like: Like) =>
    like.userId === userId && like.postId === post.id;
  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      state.some(predicate)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  );
  return (
    <div className="flex flex-col items-center">
      <form
        action={async (formdata: FormData) => {
          const postId = formdata.get("postId");
          addOptimisticLike({ postId, userId });
          await likePost(postId);
        }}
      >
        <input type="text" name="postId" hidden value={post.id} />
        {optimisticLikes.some(predicate) ? (
          <button className="text-red-600" type="submit">
            <GoHeartFill size={22} />
          </button>
        ) : (
          <button type="submit">
            <GoHeart size={22} />
          </button>
        )}
      </form>
      {optimisticLikes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {optimisticLikes.length}{" "}
          {optimisticLikes.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
};

export default Like;
