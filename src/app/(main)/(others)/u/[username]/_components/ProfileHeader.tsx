import Follow from "@/components/Follow";
import { UserWithAll } from "@/types/post";
import { auth } from "@/utils/auth";
import { getFollowings } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";
import FollowCount from "./FollowCount";
type props = {
  user: UserWithAll;
  isMyprofile: boolean;
};
const ProfileHeader = async ({ user, isMyprofile }: props) => {
  const session = await auth();
  const { followingsCounts, followrsCount } = await getFollowings(
    user.username!
  );

  const isFollowing = user.followers.some(
    (follow) => follow.followerId === session?.user?.id
  );

  const postCount = user._count.posts;

  return (
    <div className="flex items-center px-4 sm:px-8 md:px-14 lg:px-20">
      <div className="w-1/4 relative aspect-square ">
        <Image
          src={user.image || "/img/avatar.png"}
          fill
          alt="ProfileImage"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-3 mx-12">
        <div className="flex flex-col lg:flex-row  gap-2 font-semibold">
          <span className="pl-0 p-4 py-1 text-xl">{user.username}</span>
          <div className="flex items-center gap-2">
            {isMyprofile ? (
              <>
                <Link
                  href={`/edit`}
                  className="p-4 py-1 bg-zinc-300 dark:bg-zinc-600 rounded-md"
                >
                  Edit Profile
                </Link>
                <button className="p-4 py-1 text-2xl">
                  <IoMdSettings size={22} />
                </button>
              </>
            ) : (
              <>
                <div className="p-4 py-1 bg-zinc-300 dark:bg-zinc-600 rounded-md">
                  <Follow isFollowing={isFollowing} userId={user.id} />
                </div>
                <button className="p-4 py-1 bg-zinc-300 dark:bg-zinc-600 rounded-md">
                  Messege
                </button>
                <button className="p-4 py-1 text-2xl">
                  <TfiMoreAlt size={20} />
                </button>
              </>
            )}
          </div>
        </div>
        {/* post and like count */}
        <div className="flex gap-x-4 text-lg">
          <span>{postCount} post</span>
          <FollowCount
            followingsCounts={followingsCounts}
            followrsCount={followrsCount}
            username={user.username!}
          />
        </div>
        <span>{user.name}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
