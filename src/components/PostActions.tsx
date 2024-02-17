"use client";
import { PostsWithAll } from "@/types/post";
import { likePost } from "@/utils/actions";
import Link from "next/link";
import { useOptimistic } from "react";
import { FaRegComment } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { toast } from "sonner";
import Bookmark from "./Bookmark";
import Like from "./Like";

type props = {
  post: PostsWithAll;
  userId?: string;
};
const PostActions = ({ post, userId }: props) => {
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
    <div className="py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start w-full gap-x-2">
          <div className="flex flex-col items-center">
            <form
              action={async (formdata: FormData) => {
                const postId = formdata.get("postId");
                addOptimisticLike({ postId, userId });
                await likePost(postId);
              }}
            >
              <input type="text" name="postId" hidden defaultValue={post.id} />
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
          </div>
          <Link scroll={false} href={`/p/${post.id}`} className="">
            <FaRegComment size={22} />
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/p/${post.id}`
              );
              toast.success("Link copied to clipboard", {
                icon: <FaLink size={22} />,
              });
            }}
          >
            <IoPaperPlaneOutline size={22} />
          </button>
        </div>
        <Bookmark post={post} userId={userId} />
      </div>
      {optimisticLikes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {optimisticLikes.length}{" "}
          {optimisticLikes.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
};

export default PostActions;
