import SinglePost from "@/components/SinglePost";
import { getPosts } from "@/utils/data";

const Home = async () => {
  const posts = await getPosts();
  return (
    <main className="flex items-center justify-center flex-col gap-4 p-0 sm:p-4 md:px-8">
      {/* <div className="ring-1 ring-rose-500 w-full ">stroy</div> */}
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </main>
  );
};
export default Home;
