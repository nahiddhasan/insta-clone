"use client";
import Link from "next/link";

type props = {
  followrsCount: number;
  followingsCounts: number;
  username: string;
};
const FollowCount = ({ followingsCounts, followrsCount, username }: props) => {
  return (
    <div className="flex gap-2">
      <Link href={`/u/${username}/followers`}>{followrsCount} follower</Link>
      <Link href={`/u/${username}/followings`}>
        {followingsCounts} Following
      </Link>
    </div>
  );
};

export default FollowCount;
