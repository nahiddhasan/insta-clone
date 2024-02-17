import MobileTopbar from "@/components/MobileTopbar";
import RightSidebar from "@/components/RightSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="mb-2 border-b dark:border-zinc-700 sticky top-0 left-0 w-full sm:hidden dark:bg-zinc-950 h-10">
        {/* mobiletopbar */}
        <MobileTopbar />
      </div>
      <div className="w-full">{children}</div>
      <div className="hidden lg:block w-[500px]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default layout;
