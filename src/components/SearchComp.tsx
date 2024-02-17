"use client";
import useOutsideClick from "@/hooks/outsideClick";
import useSearch from "@/store/useSearch";
import { search } from "@/utils/actions";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
interface UserData {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  username: string | null;
  password: string | null;
}
const SearchComp = () => {
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchUsers, setSearchUsers] = useState<UserData[]>([]);
  const handleChange = debounce((e) => {
    if (e.target.value) {
      e.target.value.length > 1 && setSearchInput(e.target.value);
    } else {
      setSearchInput(null);
    }
  }, 500);

  useEffect(() => {
    const searches = async () => {
      const sear = await search(searchInput);
      if (sear) {
        setSearchUsers(sear);
      }
    };
    searches();
  }, [searchInput]);
  const resetInput = () => {
    setSearchInput(null);
    // @ts-ignore;
    inputRef.current.value = "";
  };
  const { isOpen, onClose } = useSearch();
  const searchModal = useOutsideClick(() => {
    onClose();
  });
  return (
    <div
      ref={searchModal}
      className={`${
        isOpen ? "block" : "hidden"
      } sidebar_left absolute bottom-0 sm:left-[70px] lg:left-[240px] top-0 h-[calc(100%-48px)] sm:h-full w-full sm:w-[400px] bg-white dark:bg-zinc-950 z-[9999]`}
    >
      <div className="flex flex-col px-4 h-[150px]">
        <h1 className="text-3xl my-6 mb-10">Search</h1>
        <form className="flex items-center justify-between w-full rounded-lg bg-zinc-800 px-4 p-2">
          <LuSearch className={`mr-2`} size="18" />
          <input
            ref={inputRef}
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search"
            onChange={handleChange}
            className="w-full text-lg border-none outline-none bg-transparent font-light"
          />
          <button
            type="button"
            onClick={resetInput}
            className="bg-zinc-600 rounded-full p-1"
          >
            <RxCross2 size="12" />
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2 mt-4 overflow-y-auto h-[calc(100%-170px)]">
        {/* searchItems */}
        {searchUsers ? (
          searchUsers.map((user) => (
            <div key={user.id} className="hover:bg-zinc-800 px-2">
              <Link href={`/u/${user.username}`} className="flex items-center">
                <Image
                  src={"/img/avatar.png"}
                  height={60}
                  width={60}
                  alt="UserImg"
                  className="rounded-full object-cover mr-2"
                />
                <div className="flex flex-col">
                  <span className="font-bold">{user.username}</span>
                  <span className="font-bold text-sm">{user.name}</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <span className="w-fullsss flex items-center justify-center h-full">
            Nothing found!
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchComp;
