"use client";
import useUpdatePost from "@/store/useUpdatePost";
import { updatePostAction } from "@/utils/actions";
import { UpdatePostScheema } from "@/utils/zodSchemas";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Modal from "./Modal";

type props = {
  file: string;
  caption?: string | null;
  postId: string;
  userId: string;
};
const EditPostModal = ({ file, caption, postId, userId }: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, onOpen } = useUpdatePost();

  useEffect(() => {
    if (pathname === `/p/${postId}/edit`) {
      onOpen();
    }
  }, [pathname]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UpdatePostScheema>>();

  const handleUpdate = (values: z.infer<typeof UpdatePostScheema>) => {
    const { caption } = values;
    startTransition(async () => {
      updatePostAction({ caption, postId, userId }).then((val) => {
        if (val.messege) {
          toast.success(val.messege);
        }
        if (val.error) {
          toast.error(val.error);
        }
        onClose();
        router.push(`/p/${postId}`);
      });
    });
  };

  if (isOpen) {
    return (
      <Modal onClose={() => router.back()} width={"lg"}>
        <div className="w-full flex items-center justify-between p-2">
          <h2 className="text-xl font-semibold">Update your post</h2>
          <button
            form="form"
            disabled={isPending}
            className="font-bold text-blue-500 hover:text-white"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
        <hr className="h-[1px] border-none bg-zinc-300 dark:bg-zinc-600 w-full" />
        <div className="flex w-full flex-col sm:flex-row">
          <div className="flex-[2] flex w-full relative items-center flex-col justify-center">
            <div className="relative h-full w-full min-h-[350px]">
              <Image
                src={file}
                fill
                alt="postImg"
                className="object-cover overflow-hidden"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="p-2 px-3 flex items-center gap-2">
              <Image
                src={session?.user?.image || "/img/avatar.png"}
                height={30}
                width={30}
                alt="userImage"
                className="object-cover rounded-full"
              />
              <span>{session?.user?.username}</span>
            </div>
            <div className="px-4">
              <form action="" onSubmit={handleSubmit(handleUpdate)} id="form">
                <textarea
                  id=""
                  rows={4}
                  defaultValue={caption}
                  placeholder="Write a caption..."
                  {...register("caption", {
                    maxLength: {
                      value: 120,
                      message: "Maxmium value 120 character!",
                    },
                  })}
                  className="w-full bg-transparent border-none outline-none resize-none"
                />

                {errors?.caption && (
                  <p className="bg-red-600 text-sm rounded-sm p-1">
                    {errors?.caption?.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
};

export default EditPostModal;
