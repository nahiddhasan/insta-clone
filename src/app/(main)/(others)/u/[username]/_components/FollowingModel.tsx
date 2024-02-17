"use client";
import Follow from "@/components/Follow";
import Modal from "@/components/Modal";
import UserAvatar from "@/components/UserAvatar";
import { FollowingType } from "@/types/post";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TbLoaderQuarter } from "react-icons/tb";
type props = {
  followers: FollowingType[];
  username: string;
  isFollowing: boolean;
};
const FollowingModel = ({ followers, username, isFollowing }: props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (pathname === `/u/${username}/followings`) {
      setOpen(true);
    }
  }, [pathname]);

  if (open) {
    return (
      <div>
        <Modal onClose={() => router.back()}>
          <div className="w-full flex items-center justify-center p-2">
            <h2 className="text-xl font-semibold">Followings</h2>
          </div>
          <hr className="h-[1px] border-none bg-zinc-300 dark:bg-zinc-600 w-full" />
          <div className="w-full px-4 flex flex-col gap-2">
            <form className="flex items-center gap-2 p-2 py-1" action="">
              <CiSearch />
              <input
                className="w-full bg-transparent border-none outline-none font-thin"
                type="text"
                placeholder="search"
              />
              <div className="animate-spin">
                <TbLoaderQuarter />
              </div>
            </form>

            {followers.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <UserAvatar
                  image={item.following.image}
                  username={item.following.username!}
                  name={item.following.name!}
                />
                <div className="px-4 py-1 bg-zinc-600 rounded-lg">
                  <Follow
                    isFollowing={isFollowing}
                    userId={item.following.id}
                  />
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
};

export default FollowingModel;
