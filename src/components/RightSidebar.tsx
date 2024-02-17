import { auth } from "@/utils/auth";
import { getAllUsers } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import Follow from "./Follow";
import UserAvatar from "./UserAvatar";

const RightSidebar = async () => {
  const session = await auth();
  const users = await getAllUsers();

  return (
    <div className="p-4 mr-4">
      {/* top user section */}
      <div className="flex items-center gap-2">
        <Image
          src={session?.user?.image || "/img/avatar.png"}
          height={40}
          width={40}
          alt="userImg"
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <Link href={`/u/${session?.user?.username}`}>
            {session?.user?.username}
          </Link>
          <span>{session?.user?.name}</span>
        </div>
      </div>
      {/* suggested user sections */}
      <div>
        <div className="flex items-center justify-between my-3">
          <h1>Suggested for you</h1>
          <span>See all</span>
        </div>
        {users.map((user) => {
          const isFollowing = user.followers.some(
            (follow) => follow.followerId === session?.user?.id
          );
          return (
            <div key={user.id} className="flex items-center justify-between">
              <UserAvatar
                image={user.image}
                username={user.username!}
                name="Suggested for you"
              />
              <div className="text-blue-500 hover:text-white">
                <Follow isFollowing={isFollowing} userId={user.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RightSidebar;
