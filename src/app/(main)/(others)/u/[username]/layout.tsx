import { auth } from "@/utils/auth";
import { getUserByUsername } from "@/utils/data";
import React from "react";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileTabs from "./_components/ProfileTabs";
type props = {
  children: React.ReactNode;
  params: { username: string };
};
const layout = async ({ children, params }: props) => {
  const { username } = params;
  const session = await auth();
  const user = await getUserByUsername(username);
  if (!user) {
    return "User not found!";
  }
  const isMyprofile = session?.user?.username === user.username;

  return (
    <div className="px-0 sm:px-[80px] pt-10">
      <ProfileHeader user={user} isMyprofile={isMyprofile} />
      <hr className="h-[1px] border-none bg-zinc-300 dark:bg-zinc-800 mt-6" />
      {/* post and saved post */}
      <ProfileTabs user={user} isMyprofile={isMyprofile} />
      <div>{children}</div>
    </div>
  );
};

export default layout;
