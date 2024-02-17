"use client";
import useOutsideClick from "@/hooks/outsideClick";
import { PostsWithAll } from "@/types/post";
import { deletePost } from "@/utils/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { toast } from "sonner";

type props = {
  post: PostsWithAll;
  userId?: string;
};

const MoreOption = ({ post, userId }: props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const isOwner = post.userId === userId;
  const moreRef = useOutsideClick(() => {
    setMoreOpen(false);
  });

  return (
    <div>
      <div onClick={() => setMoreOpen(true)} className="cursor-pointer">
        <TfiMoreAlt size={20} />
      </div>

      {moreOpen && (
        <div className="bg-zinc-900/10 backdrop-blur-sm fixed inset-0 z-[99]">
          <div
            ref={moreRef}
            className="fixed drop-shadow-lg border dark:border-zinc-700 top-[50%] left-[50%] max-h-[90%] h-auto sm:max-h-[85vh] w-[90%] sm:w-[90vw] sm:max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white dark:bg-zinc-700"
          >
            <div className="flex flex-col items-center justify-center h-full">
              {isOwner && (
                <>
                  <Link
                    href={`/p/${post.id}/edit`}
                    className="py-3 text-green-500  rounded-sm w-full border-b border-zinc-500 text-center"
                  >
                    Edit
                  </Link>

                  <form
                    className="w-full"
                    action={async (formdata: FormData) => {
                      const postId = formdata.get("postId");
                      startTransition(async () => {
                        await deletePost(postId).then((val) => {
                          if (val.messege) {
                            toast.success(val.messege);
                          }
                          if (val.error) {
                            toast.error(val.error);
                          }
                          setMoreOpen(false);
                          router.push("/");
                        });
                      });
                    }}
                  >
                    <input type="text" value={post.id} hidden name="postId" />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="disabled:cursor-not-allowed py-3 text-red-600 rounded-sm w-full border-b border-zinc-500 text-center"
                    >
                      Delete
                    </button>
                  </form>
                </>
              )}
              <button className="py-3 rounded-sm w-full border-b border-zinc-500 text-center">
                Follow
              </button>
              <button className="py-3 rounded-sm w-full border-b border-zinc-500 text-center">
                Copy Link
              </button>
              <button className="py-3 rounded-sm w-full border-b border-zinc-500 text-center">
                Share to
              </button>
              <button className="py-3 rounded-sm w-full border-b border-zinc-500 text-center">
                Add to favorite
              </button>
              <button className="py-3 rounded-sm w-full border-b border-zinc-500 text-center">
                Go to post
              </button>{" "}
              <button className="py-3 rounded-sm w-full border-b border-zinc-500 text-center">
                Report
              </button>
              <button
                onClick={() => setMoreOpen(false)}
                className="py-3 rounded-sm w-full text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreOption;
