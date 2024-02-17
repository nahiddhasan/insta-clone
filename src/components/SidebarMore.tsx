"use client";
import useOutsideClick from "@/hooks/outsideClick";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import ToggleTheme from "./ToggleTheme";

const SidebarMore = () => {
  const [more, setMore] = useState(false);
  const moreRef = useOutsideClick(() => {
    setMore(false);
  });
  const { data: session } = useSession();

  return (
    <div className="relative w-full ">
      <div
        onClick={() => setMore(!more)}
        className=" flex items-center p-2 rounded-md gap-2 cursor-pointer group dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-all duration-300"
      >
        <span className="group-hover:scale-110">
          <GiHamburgerMenu size={24} />
        </span>
        <span className="text-xl sm:hidden lg:block">More</span>
      </div>
      <div
        ref={moreRef}
        className={`${
          more ? "block" : "hidden"
        } bg-white dark:bg-zinc-800 ring-1 ring-zinc-400 dark:ring-zinc-600  shadow-xl flex flex-col  w-[250px] absolute left-2 bottom-full p-2 rounded-md`}
      >
        <div className="flex items-center p-2 rounded-md gap-2 cursor-pointer dark:hover:bg-zinc-700 hover:bg-gray-200 transition-all duration-300">
          <span className="">
            <IoMdSettings size={22} />
          </span>
          <span className="text-xl">Settings</span>
        </div>
        <Link
          href={`/u/${session?.user?.username}/saved`}
          className="flex items-center p-2 rounded-md gap-2 cursor-pointer dark:hover:bg-zinc-700 hover:bg-gray-200 transition-all duration-300"
        >
          <span className="">
            <FaRegBookmark size={22} />
          </span>
          <span className="text-xl">Saved</span>
        </Link>
        <ToggleTheme />
        <hr className="h-[1px] border-none bg-zinc-400 dark:bg-zinc-600 my-2" />
        <div className="flex items-center p-2 rounded-md gap-2 cursor-pointer dark:hover:bg-zinc-700 hover:bg-gray-200 transition-all duration-300">
          <span
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="text-xl"
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarMore;
