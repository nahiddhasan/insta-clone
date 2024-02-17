"use client";

import { createComment } from "@/utils/actions";
import { CommentSchema } from "@/utils/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AddComment = ({ postId }: { postId: string }) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
  });
  const inputValue = watch("comment");

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    startTransition(() => {
      createComment(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data.messege) {
          toast.success(data.messege);
        }
        reset();
      });
    });
  };
  return (
    <form className="flex w-full" action="" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" defaultValue={postId} {...register("postId")} hidden />
      <input
        type="text"
        placeholder="Add a comment"
        autoComplete="off"
        {...register("comment")}
        className=" border-none outline-none w-full bg-transparent mb-1"
      />
      {errors.comment && <span>{errors.comment.message}</span>}
      {inputValue && inputValue.trim().length > 0 && (
        <button
          disabled={isPending}
          type="submit"
          className="mr-2 text-blue-600"
        >
          Post
        </button>
      )}
    </form>
  );
};

export default AddComment;
