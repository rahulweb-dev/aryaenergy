import type { DefaultSession } from "next-auth";
import type { Role } from "@/constants/roles";

// next-auth re-exports Session/User/JWT from @auth/core — augmentations must
// target the modules where these interfaces are actually declared, or the
// declaration merge silently no-ops.
declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}
