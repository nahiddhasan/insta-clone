import PostGrid from "@/components/PostGrid";
import { getPostsByUsername } from "@/utils/data";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const posts = await getPostsByUsername(username);
  return (
    <div className="">
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

export default ProfilePage;
