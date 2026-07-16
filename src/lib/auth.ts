import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { isAdminRole, type Role } from "@/constants/roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;

        await connectToDatabase();
        const dbUser = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
        if (!dbUser?.passwordHash) return null;

        const valid = await bcrypt.compare(password, dbUser.passwordHash);
        if (!valid) return null;

        // Credentials login is reserved for admin-panel staff accounts.
        if (!isAdminRole(dbUser.role)) return null;

        return {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role as Role,
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        await connectToDatabase();
        let dbUser = await User.findOne({ email: user.email.toLowerCase() });
        if (!dbUser) {
          dbUser = await User.create({
            name: user.name ?? user.email.split("@")[0],
            email: user.email.toLowerCase(),
            role: "user",
            image: user.image ?? undefined,
          });
        }
        token.id = dbUser._id.toString();
        token.role = dbUser.role as Role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.role = token.role ?? "user";
      }
      return session;
    },
  },
});
