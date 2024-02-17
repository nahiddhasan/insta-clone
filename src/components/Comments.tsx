import { PostsWithAll } from "@/types/post";
import Link from "next/link";

const Comments = ({ post }: { post: PostsWithAll }) => {
  return (
    <div>
      {post.comments?.length ? (
        <Link
          href={`/p/${post.id}`}
          className="text-zinc-800 dark:text-zinc-300"
        >
          View All {post.comments.length}{" "}
          {post.comments.length > 1 ? "comments" : "comment"}
        </Link>
      ) : (
        []
      )}
    </div>
  );
};

export default Comments;
