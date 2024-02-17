import authConfig from "@/utils/auth-config";
import { prisma } from "@/utils/connct";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { getUserById } from "./data";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    // error: "/auth/error",
  },

  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      if (!existingUser.username) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const name = existingUser.name?.split(" ").join("").toLowerCase();
        const usernamewitnum = `${name}${randomNum}`;
        const user = await prisma.user.findUnique({
          where: {
            username: name,
          },
        });
        let username;
        if (!user) {
          username = name;
        } else {
          username = usernamewitnum;
        }
        await prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            username: username,
          },
        });
      }
      token.username = existingUser.username;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
