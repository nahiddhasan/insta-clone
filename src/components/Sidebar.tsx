import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import Bottombar from "./Bottombar";
import CreatePostModal from "./CreatePostModal";
import LeftSidebar from "./LeftSidebar";
import SearchComp from "./SearchComp";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex h-full">
      <CreatePostModal />
      <SearchComp />
      <div className="hidden sm:block sm:w-[70px] lg:w-[300px] border-r border-zinc-300 dark:border-zinc-800 relative">
        <LeftSidebar user={session.user} />
      </div>
      <div className="fixed bottom-0 left-0 z-10 w-full sm:hidden bg-white dark:bg-zinc-950 border-t border-zinc-300 dark:border-zinc-700  items-center">
        {/* mobilebottombar */}
        <Bottombar user={session.user} />
      </div>
      <div className="w-full h-full overflow-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
