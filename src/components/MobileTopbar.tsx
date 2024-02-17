import Link from "next/link";
import { FaCameraRetro } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { RiMessengerLine } from "react-icons/ri";

const MobileTopbar = () => {
  return (
    <div className="h-full flex items-center justify-between px-4">
      <div className="text-xl font-[700] flex items-center md:justify-center lg:justify-normal gap-2 uppercase py-6 w-full ">
        <FaCameraRetro />
        <span className="">Insta</span>
      </div>
      <div className="flex items-center">
        <Link
          href={"/"}
          className={`group flex items-center gap-3 rounded-md text-xl p-2`}
        >
          <span className="text-xl group-hover:scale-110 transition">
            <RiMessengerLine />
          </span>
        </Link>
        <Link
          href={"/"}
          className={`group flex items-center gap-3 rounded-md text-xl p-2`}
        >
          <span className="text-xl group-hover:scale-110 transition">
            <GoHeart />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileTopbar;
