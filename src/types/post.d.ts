import { Comment, Follows, Like, Post, SavedPost, User } from "@prisma/client";
export type CommentsWithUser = Comment & { user: User };
export type LikesWithUser = Like & { user: User };
export type SavedPostsWithUser = SavedPost & { user: User };

export type PostsWithAll = Post & {
  user: User;
  likes?: Like[] | null;
  comments?: Comment[] | null;
  savedPosts?: SavedPost[] | null;
};

export type PostsWithComment = Post & {
  user: User;
  likes?: Like[] | null;
  comments?: CommentsWithUser[] | null;
  savedPosts?: SavedPost[] | null;
};
type userPost = Post & {
  _count?: {
    comments: number;
    likes: number;
  };
};

type savedPost = SavedPost & {
  post: post;
};

type user = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  username: string | null;
};

export type UserWithAll = user & {
  followers: Follows[];
  _count: {
    posts: number;
  };
};

export type FollowingType = Follows & {
  following: User;
};

export type FollowerType = Follows & {
  follower: User;
};
