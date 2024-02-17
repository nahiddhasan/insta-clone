import { SessionProvider as SessionProvider2 } from "next-auth/react";
import React from "react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider2>{children}</SessionProvider2>;
};

export default SessionProvider;
