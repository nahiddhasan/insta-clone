"use client";

import { follow } from "@/utils/actions";
type props = {
  isFollowing: boolean;
  userId: string;
};
const Follow = ({ isFollowing, userId }: props) => {
  return (
    <form action={follow}>
      <input type="text" name="userId" defaultValue={userId} hidden />
      <button>{isFollowing ? "Unfollow" : "Follow"}</button>
    </form>
  );
};

export default Follow;
