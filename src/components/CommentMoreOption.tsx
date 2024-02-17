"use client";
import useOutsideClick from "@/hooks/outsideClick";
import { CommentsWithUser } from "@/types/post";
import { deleteComment } from "@/utils/actions";
import { useState, useTransition } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { toast } from "sonner";

const CommentMoreOption = ({
  comment,
  userId,
}: {
  comment: CommentsWithUser;
  userId?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [commentMoreOpen, setCommentMoreOpen] = useState(false);
  const isOwner = comment.userId === userId;
  const moreRef = useOutsideClick(() => {
    setCommentMoreOpen(false);
  });

  return (
    <div>
      <div onClick={() => setCommentMoreOpen(true)} className="cursor-pointer">
        <TfiMoreAlt size={18} />
      </div>

      {commentMoreOpen && (
        <div className="bg-zinc-900/10 backdrop-blur-sm fixed inset-0 z-[99]">
          <div
            ref={moreRef}
            className="fixed drop-shadow-lg border border-zinc-700 top-[50%] left-[50%] max-h-[90%] h-auto sm:max-h-[85vh] w-[90%] sm:w-[90vw] sm:max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-zinc-700"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <button className="py-3 text-red-600  rounded-sm w-full border-b border-zinc-500 text-center">
                Report
              </button>
              {isOwner && (
                <>
                  <form
                    className="w-full"
                    action={async (formdata: FormData) => {
                      const commentId = formdata.get("commentId");
                      startTransition(async () => {
                        await deleteComment(commentId).then((val) => {
                          if (val.messege) {
                            toast.success(val.messege);
                          }
                          if (val.error) {
                            toast.error(val.error);
                          }
                          setCommentMoreOpen(false);
                        });
                      });
                    }}
                  >
                    <input
                      type="text"
                      value={comment.id}
                      hidden
                      name="commentId"
                    />
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

              <button
                onClick={() => setCommentMoreOpen(false)}
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

export default CommentMoreOption;
