export const ROLES = ["super_admin", "admin", "manager", "agent", "user"] as const;
export type Role = (typeof ROLES)[number];

export const ADMIN_ROLES: Role[] = ["super_admin", "admin", "manager", "agent"];

export function isAdminRole(role: string | null | undefined): role is Role {
  return !!role && (ADMIN_ROLES as string[]).includes(role);
}

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
  agent: "Agent",
  user: "User",
};
