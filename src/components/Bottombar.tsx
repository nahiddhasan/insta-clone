"use client";
import useCreatePost from "@/store/useCreatePost";
import useSearch from "@/store/useSearch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdSlowMotionVideo } from "react-icons/md";
import {
  RiHome2Fill,
  RiHome2Line,
  RiSearchFill,
  RiSearchLine,
  RiUser3Line,
} from "react-icons/ri";
type props = {
  id: string;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  image?: string | null;
};
const Bottombar = ({ user }: { user: props }) => {
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
    <div className="flex items-center justify-between h-full px-4">
      <Link
        href={"/"}
        className={`group flex items-center gap-3 rounded-md text-xl p-2`}
      >
        <span className="text-4xl group-hover:scale-110 transition">
          {pathname === "/" ? <RiHome2Fill /> : <RiHome2Line />}
        </span>
      </Link>
      <div
        onClick={handleSearch}
        className="group flex items-center gap-3 rounded-md text-xl p-2"
      >
        <span className="text-4xl group-hover:scale-110 transition">
          {isOpen ? <RiSearchFill /> : <RiSearchLine />}
        </span>
      </div>

      <div
        onClick={() => onOpen()}
        className="group flex items-center gap-3 rounded-md text-xl p-2"
      >
        <span className="text-4xl group-hover:scale-110 transition">
          <IoIosAddCircleOutline />
        </span>
      </div>
      <Link
        href={"/reels"}
        className="group flex items-center gap-3 rounded-md text-xl p-2"
      >
        <span className="text-4xl group-hover:scale-110 transition">
          {pathname === "/reels" ? (
            <MdSlowMotionVideo />
          ) : (
            <MdSlowMotionVideo />
          )}
        </span>
      </Link>
      <Link
        href={`/u/${user?.username}`}
        className="flex items-center gap-3 rounded-md text-xl p-2 "
      >
        <span
          className={`${
            pathname === `/u/${user?.username}`
              ? "ring-4 ring-zinc-300 rounded-full"
              : ""
          } text-4xl`}
        >
          {user?.image ? (
            <Image
              src={user.image}
              height={30}
              width={30}
              alt="ProfileImg"
              className="object-cover rounded-full overflow-hidden "
            />
          ) : (
            <RiUser3Line />
          )}
        </span>
      </Link>
    </div>
  );
};

export default Bottombar;
