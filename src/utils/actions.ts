"use server";
import { signIn } from "@/utils/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "./auth";
import {
  BookmarkSchema,
  CommentSchema,
  CreatePostScheema,
  DeleteComment,
  DeletePost,
  Follow,
  LikeSchema,
  LoginSchema,
  RegisterSchema,
  UpdatePostScheema,
} from "./zodSchemas";

//create post
export const cratePostAction = async (file: string, caption: string) => {
  const session = await auth();
  const validatedPost = CreatePostScheema.safeParse({ file, caption });
  if (!validatedPost.success) {
    return { error: "Invalid fields error!" };
  }
  const { file: validedFile, caption: validatedCaption } = validatedPost.data;

  try {
    const post = await prisma?.post.create({
      data: {
        userId: session?.user?.id!,
        image: validedFile,
        caption: validatedCaption?.trim(),
      },
    });
    revalidatePath("/");
    return { messege: "Post Created!" };
  } catch (error) {
    console.log(error);
    return { error: "Post creation error!" };
  }
};

//update post
export const updatePostAction = async (
  value: z.infer<typeof UpdatePostScheema>
) => {
  const session = await auth();
  const validatedPost = UpdatePostScheema.safeParse(value);
  if (!validatedPost.success) {
    return { error: "Invalid fields error!" };
  }
  const { caption, postId } = validatedPost.data;

  try {
    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return { error: "Post not found!" };
    }
    if (post.userId !== session?.user?.id) {
      return { error: "You are not owner of this post!" };
    }
    await prisma?.post.update({
      where: {
        id: postId,
      },
      data: {
        userId: session?.user?.id,
        caption: caption?.trim(),
      },
    });
    revalidatePath("/");
    return { messege: "Update succecfull!" };
  } catch (error) {
    console.log(error);
    return { error: "Post creation error!" };
  }
};

//delete post
export const deletePost = async (values: FormDataEntryValue | null) => {
  const session = await auth();
  const validatedId = DeletePost.safeParse({ postId: values });
  if (!validatedId.success) {
    return { error: "Invalid fields error!" };
  }
  const { postId } = validatedId.data;

  try {
    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return { messege: "Post not found!" };
    }
    if (post.userId !== session?.user?.id) {
      return { messege: "You are not owner of this post!" };
    }

    await prisma?.post.delete({
      where: {
        id: postId,
        userId: session.user.id,
      },
    });
    revalidatePath("/");
    return { messege: "Post deleted!" };
  } catch (error) {
    console.log(error);
    return { error: "Post delete error!" };
  }
};

//delete comment
export const deleteComment = async (values: FormDataEntryValue | null) => {
  const session = await auth();
  const validatedId = DeleteComment.safeParse({ commentId: values });
  if (!validatedId.success) {
    return { error: "Invalid fields error!" };
  }
  const { commentId } = validatedId.data;

  try {
    const comment = await prisma?.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      return { messege: "Comment not found!" };
    }
    if (comment.userId !== session?.user?.id) {
      return { messege: "You are not owner of this comment!" };
    }

    await prisma?.comment.delete({
      where: {
        id: commentId,
        userId: session.user.id,
      },
    });
    revalidatePath("/");
    return { messege: "Comment deleted!" };
  } catch (error) {
    console.log(error);
    return { error: "Comment delete error!" };
  }
};

//create comment
export const createComment = async (values: z.infer<typeof CommentSchema>) => {
  const session = await auth();
  const validatedComment = CommentSchema.safeParse(values);
  if (!validatedComment.success) {
    return { error: "Invalid fields error!" };
  }

  const { comment, postId } = validatedComment.data;

  try {
    if (!session) {
      return { error: "You are not logged in!" };
    }
    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return { error: "post not found!" };
    }

    await prisma?.comment.create({
      data: {
        postId,
        userId: session?.user?.id!,
        body: comment.trim(),
      },
    });
    revalidatePath("/");
    return { messege: "Comment added!" };
  } catch (error) {
    console.log(error);
    return { error: "comment creation error!" };
  }
};

//register user
export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedRegisterValues = RegisterSchema.safeParse(values);
  if (!validatedRegisterValues.success) {
    return { error: "Invalid fields error!" };
  }
  const { name, email, password } = validatedRegisterValues.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: "User already exist with this email!" };
    }

    const newUser = await prisma?.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    redirect("/auth/login");
  } catch (error) {
    console.log(error);
    return { error: "Register error!" };
  }
};

//login user
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedLoginValues = LoginSchema.safeParse(values);

  if (!validatedLoginValues.success) {
    return { error: "Invalid fields error!" };
  }
  const { email, password } = validatedLoginValues.data;
  const existingUser = await prisma?.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser || !existingUser.email) {
    return { error: "User does not Exist!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

//like post
export const likePost = async (value: FormDataEntryValue | null) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Please Login to like post!");
  }
  const validatedId = LikeSchema.safeParse({ postId: value });

  if (!validatedId.success) {
    return {
      errors: validatedId.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Like Post.",
    };
  }
  const { postId } = validatedId.data;
  const post = await prisma?.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found!");
  }

  const like = await prisma?.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (like) {
    try {
      await prisma?.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidatePath("/");
      return { messege: "Unlike succesfull!" };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to remove like!");
    }
  }

  try {
    await prisma?.like.create({
      data: {
        postId,
        userId,
      },
    });
    revalidatePath("/");
    return { messege: "Like succesfull!" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add like!");
  }
};

//bookmark post
export const addBookmark = async (value: FormDataEntryValue | null) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("You are not logged in!");
  }
  const validatedId = BookmarkSchema.safeParse({ postId: value });
  if (!validatedId.success) {
    return {
      errors: validatedId.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Like Post.",
    };
  }
  const { postId } = validatedId.data;

  const post = await prisma?.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    throw new Error("Post not found!");
  }

  const savedPost = await prisma?.savedPost.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
  if (savedPost) {
    try {
      await prisma?.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidatePath("/");
      return { messege: "Unbookmark succesfull!" };
    } catch (error) {
      console.log(error);
      throw new Error("Removed from saved post failed!");
    }
  }

  try {
    await prisma?.savedPost.create({
      data: {
        postId,
        userId,
      },
    });
    revalidatePath("/");
    return { messege: "Bookmark succesfull!" };
  } catch (error) {
    console.log(error);
    throw new Error("Add to saved post failed!");
  }
};

export const follow = async (formdata: FormData) => {
  const session = await auth();
  const id = session?.user?.id;
  const { userId } = Follow.parse({
    userId: formdata.get("userId"),
  });
  if (!session || !id) {
    throw new Error("Not logged in!");
  }
  const user = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const follows = await prisma?.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: id,
        followingId: userId,
      },
    },
  });

  if (follows) {
    try {
      await prisma?.follows.delete({
        where: {
          followerId_followingId: {
            followerId: id,
            followingId: userId,
          },
        },
      });
      revalidatePath("/");
      return { messege: "Unfollow Succesfull!" };
    } catch (error) {
      throw new Error("Unfollow failed!");
    }
  }

  try {
    await prisma?.follows.create({
      data: {
        followerId: id,
        followingId: userId,
      },
    });
    revalidatePath("/");
    return { messege: "Follow succesfull!" };
  } catch (error) {
    throw new Error("Follow failed!");
  }
};

export const search = async (value: string | null) => {
  try {
    if (value) {
      const searchResult = await prisma?.user.findMany({
        where: {
          ...(value && { username: { contains: value, mode: "insensitive" } }),
        },
      });
      return searchResult;
    }
  } catch (error) {
    throw new Error("Search failed!");
  }
};
