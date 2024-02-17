import PostGrid from "@/components/PostGrid";
import { getSavedPostsByUsername } from "@/utils/data";

const SavedPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const savedPosts = await getSavedPostsByUsername(username);
  const posts = savedPosts.map((savedPost) => savedPost.post);

  return (
    <div>
      {posts.length ? (
        <PostGrid posts={posts} />
      ) : (
        <div className="flex items-center justify-center">
          No Saved Post found!
        </div>
      )}
    </div>
  );
};

export default SavedPage;
