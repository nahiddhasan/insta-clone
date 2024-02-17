import { PostsWithAll } from "@/types/post";
import { auth } from "@/utils/auth";
import { formatTimeToNow } from "@/utils/formatTime";
import Image from "next/image";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import AddComment from "./AddComment";
import Comments from "./Comments";
import MoreOption from "./MoreOption";
import PostActions from "./PostActions";
import UserAvatar from "./UserAvatar";

const SinglePost = async ({ post }: { post: PostsWithAll }) => {
  const session = await auth();
  return (
    <div className="w-full sm:w-[425px] h-full">
      {/* user div  */}
      <div className="flex items-center justify-between mb-1 px-4 sm:p-0">
        <div className="flex items-center gap-2">
          <UserAvatar image={post.user.image} username={post.user.username!} />
          <BsDot />
          <span>{formatTimeToNow(post.createdAt)}</span>
        </div>
        <MoreOption post={post} userId={session?.user?.id} />
      </div>
      {/* post section  */}
      <div className="ring-1 ring-zinc-300 dark:ring-zinc-800 w-full relative rounded-sm -z-10">
        <div className="h-full w-full relative aspect-square overflow-hidden rounded-sm">
          <Image
            src={post.image}
            alt="cover image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="px-4 sm:p-0">
        {/* actions  */}
        <PostActions post={post} userId={session?.user?.id} />
        {/* post descriptoins  */}
        <div>
          <div className="flex items-center">
            {post.caption && (
              <div className="">
                <Link
                  href={`/u/${post.user.username}`}
                  className="font-bold mr-2 cursor-pointer"
                >
                  {post.user.username}
                </Link>
                <p> {post.caption}</p>
              </div>
            )}
          </div>
          <Comments post={post} />
          <AddComment postId={post.id} />
        </div>
      </div>
      <hr className="h-[1px] border-none bg-zinc-300 dark:bg-zinc-800 my-2" />
    </div>
  );
};

export default SinglePost;
