import { userPost } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { FaComment } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

const PostGrid = ({ posts }: { posts: userPost[] | null }) => {
  return (
    <div className="grid grid-cols-3 gap-1 h-full">
      {posts?.length
        ? posts.map((post) => (
            <Link
              key={post.id}
              href={`/p/${post.id}`}
              className="group relative"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={post.image}
                  fill
                  alt="PostImg"
                  className="object-cover"
                />
              </div>
              <div className="hidden opacity-0 group-hover:opacity-100 transition-all group-hover:flex absolute top-0 left-0 bg-zinc-900/35 aspect-square w-full items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <GoHeartFill size={22} /> {post._count && post._count.likes}
                </div>
                <div className="flex items-center gap-2 text-white">
                  <FaComment size={22} />
                  {post._count && post._count.comments}
                </div>
              </div>
            </Link>
          ))
        : null}
    </div>
  );
};

export default PostGrid;
