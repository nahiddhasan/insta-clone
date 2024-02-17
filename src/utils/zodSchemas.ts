import { z } from "zod";

export const CreatePostScheema = z.object({
  file: z.string(),
  caption: z
    .string()
    .max(120, {
      message: "Maximum 120 charecter!",
    })
    .optional(),
});

export const UpdatePostScheema = z.object({
  caption: z
    .string()
    .max(120, {
      message: "Maximum 120 charecter!",
    })
    .optional(),
  userId: z.string(),
  postId: z.string(),
});
//delete Post schema
export const DeletePost = z.object({
  postId: z.string(),
});

//delete comment schema
export const DeleteComment = z.object({
  commentId: z.string(),
});

//comment schema
export const CommentSchema = z.object({
  comment: z.string(),
  postId: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email Required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

//register schema
export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required!",
  }),
  email: z.string().email({
    message: "Email is Required!",
  }),
  password: z.string().min(6, {
    message: "Minumum 6 characters required!",
  }),
});

//like schema
export const LikeSchema = z.object({
  postId: z.string(),
});

//bookmark schema
export const BookmarkSchema = z.object({
  postId: z.string(),
});

//follow schema
export const Follow = z.object({
  userId: z.string(),
});
