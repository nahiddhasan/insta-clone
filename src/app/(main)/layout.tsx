import Sidebar from "@/components/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Sidebar>{children}</Sidebar>;
};

export default layout;
