import AddComment from "@/components/AddComment";
import CommentMoreOption from "@/components/CommentMoreOption";
import MoreOption from "@/components/MoreOption";
import PostActions from "@/components/PostActions";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/utils/auth";
import { getSinglePost } from "@/utils/data";
import { formatTimeToNow } from "@/utils/formatTime";
import Image from "next/image";
import Link from "next/link";

const SinglePostPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { id } = params;
  const singlePost = await getSinglePost(id);
  if (!singlePost) {
    return "Post not found!";
  }

  const dat = formatTimeToNow(singlePost.createdAt);
  console.log(dat);
  return (
    <div className="flex items-center justify-center h-full ">
      <div className="flex h-[85%] mx-10 w-full ring-1 ring-zinc-800">
        <div className="relative hidden md:block flex-[2] h-full w-full border-r border-zinc-800">
          <Image
            src={singlePost?.image!}
            fill
            alt=""
            className="object-contain"
          />
        </div>
        <div className="flex-1 flex justify-between flex-col h-full">
          <div className=" flex items-center justify-between p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Image
                src={singlePost?.user.image || "/img/avatar.png"}
                width={30}
                height={30}
                alt="userImg"
                className="object-cover rounded-full"
              />
              <Link href={`/u/${singlePost?.user.username}`}>
                {singlePost?.user.username}
              </Link>
              <button className="text-blue-500">follow</button>
            </div>
            <MoreOption post={singlePost} userId={session?.user?.id} />
          </div>
          {/* post caption  */}
          <div className="flex-[4] overflow-y-auto">
            {singlePost?.caption && (
              <div className="px-4 py-2">
                {/* post user  */}
                <div className="flex items-center gap-2">
                  <UserAvatar
                    image={singlePost.user.image}
                    username={singlePost.user.username!}
                    name={formatTimeToNow(singlePost.createdAt)}
                  />
                </div>
                {/* cpation  */}
                <p className="ml-10">{singlePost?.caption}</p>
              </div>
            )}

            {/* comments here  */}
            {singlePost?.comments.length ? (
              singlePost?.comments?.map((comment) => (
                <div key={comment.id} className="px-4 py-2 group">
                  {/* comment user  */}
                  <div className="flex items-center justify-between ">
                    <UserAvatar
                      image={comment.user.image}
                      username={comment.user.username!}
                      name={formatTimeToNow(comment.createdAt)}
                    />
                    <div className="md:hidden md:group-hover:block">
                      <CommentMoreOption
                        comment={comment}
                        userId={session?.user?.id}
                      />
                    </div>
                  </div>
                  {/* comment  */}
                  <div className="flex items-center justify-between w-full">
                    <p className="ml-10">{comment?.body}</p>
                    {/* <span className="p-2">like</span> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center text-2xl">
                No comments yet.
              </div>
            )}
          </div>

          <div className="px-4 py-2 flex-[2] border-t border-zinc-800">
            <PostActions post={singlePost} userId={userId} />
            <div className="flex items-center gap-2">
              <Image
                src={session?.user?.image || "/img/avatar.png"}
                width={30}
                height={30}
                alt="userImg"
                className="object-cover rounded-full"
              />

              <AddComment postId={singlePost.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
