"use client";
import useCreatePost from "@/store/useCreatePost";
import useSearch from "@/store/useSearch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCameraRetro } from "react-icons/fa";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdExplore, MdOutlineExplore, MdSlowMotionVideo } from "react-icons/md";
import {
  RiHome2Fill,
  RiHome2Line,
  RiMessengerFill,
  RiMessengerLine,
  RiSearchFill,
  RiSearchLine,
  RiUser3Line,
} from "react-icons/ri";
import SidebarMore from "./SidebarMore";

type props = {
  id: string;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  image?: string | null;
};

const LeftSidebar = ({ user }: { user: props }) => {
  const pathname = usePathname();
  const { onOpen } = useCreatePost();
  const { onOpen: searchOpen, isOpen, onClose } = useSearch();
  const handleSearch = () => {
    if (isOpen) {
      onClose();
    } else {
      searchOpen();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-4">
      <div className="w-full">
        <div className="text-3xl font-[700] flex items-center md:justify-center lg:justify-normal gap-2 uppercase py-6 w-full ">
          <FaCameraRetro />
          <span className="sm:hidden lg:block">Insta</span>
        </div>
        <div>
          <Link
            href={"/"}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              {pathname === "/" ? <RiHome2Fill /> : <RiHome2Line />}
            </span>
            <span className={` sm:hidden lg:block`}>Home</span>
          </Link>

          <div
            onClick={handleSearch}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              {isOpen ? <RiSearchFill /> : <RiSearchLine />}
            </span>
            <span className={` sm:hidden lg:block`}>Search</span>
          </div>

          <Link
            href={"/explore"}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              {pathname === "/explore" ? <MdExplore /> : <MdOutlineExplore />}
            </span>
            <span className={` sm:hidden lg:block`}>Explore</span>
          </Link>

          <Link
            href={"/reels"}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              {pathname === "/reels" ? (
                <MdSlowMotionVideo />
              ) : (
                <MdSlowMotionVideo />
              )}
            </span>
            <span className={` sm:hidden lg:block`}>Reels</span>
          </Link>

          <Link
            href={"/messeges"}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              {pathname === "/messeges" ? (
                <RiMessengerFill />
              ) : (
                <RiMessengerLine />
              )}
            </span>
            <span className={` sm:hidden lg:block`}>Messeges</span>
          </Link>

          <Link
            href={"/notifications"}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              {pathname === "/notifications" ? (
                <IoNotificationsSharp />
              ) : (
                <IoMdNotificationsOutline />
              )}
            </span>
            <span className={` sm:hidden lg:block`}>Notifications</span>
          </Link>

          <div
            onClick={() => onOpen()}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              <IoIosAddCircleOutline />
            </span>
            <span className={` sm:hidden lg:block`}>Create</span>
          </div>
          <Link
            href={`/u/${user?.username}`}
            className="group flex items-center gap-3 rounded-md text-xl p-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300 cursor-pointer "
          >
            <span className="text-2xl group-hover:scale-110 transition">
              {user?.image ? (
                <Image
                  src={user.image}
                  height={26}
                  width={26}
                  alt="ProfileImg"
                  className="object-cover rounded-full overflow-hidden"
                />
              ) : (
                <RiUser3Line />
              )}
            </span>
            <span className={` sm:hidden lg:block`}>Profile</span>
          </Link>
        </div>
      </div>
      <SidebarMore />
    </div>
  );
};

export default LeftSidebar;
