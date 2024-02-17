"use client";
import { UserWithAll } from "@/types/post";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiBookmark } from "react-icons/ci";
import { FaUserTag } from "react-icons/fa";
import { IoMdGrid } from "react-icons/io";
import { MdSlowMotionVideo } from "react-icons/md";
type props = {
  user: UserWithAll;
  isMyprofile: boolean;
};

const profileTabs = [
  {
    name: "Posts",
    href: "",
    icon: <IoMdGrid />,
  },
  {
    name: "Saved",
    href: "saved",
    icon: <CiBookmark />,
    isMyself: true,
  },
  {
    name: "Reels",
    href: "reels",
    icon: <MdSlowMotionVideo />,
  },
  {
    name: "Tagged",
    href: "tagged",
    icon: <FaUserTag />,
  },
];

const ProfileTabs = ({ user, isMyprofile }: props) => {
  const pathname = usePathname();
  const filteredTabs = !isMyprofile
    ? profileTabs.filter((tab) => !tab.isMyself)
    : profileTabs;

  return (
    <div className="flex gap-6 items-center justify-center">
      {filteredTabs.map((tab) => {
        const profilePage = `/u/${user.username}`;
        const isActive =
          tab.href === ""
            ? pathname === profilePage
            : pathname === `${profilePage}/${tab.href}`;
        return (
          <Link
            key={tab.name}
            href={`/u/${user.username}/${tab.href}`}
            className={`${
              isActive ? "border-t-2 border-white" : ""
            } p-2 flex items-center gap-2`}
          >
            {tab.icon}
            <span className="hidden sm:block">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
