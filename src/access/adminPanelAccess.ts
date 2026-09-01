import type { Access } from "payload";

export const adminPanelAccess: Access = ({ req: { user } }) => {
  // Allow access to admin panel for admins, editors, and authors
  // Deny for standard users
  if (!user) return false;

  const role = (user as { role?: string }).role;
  return role === "admin" || role === "editor" || role === "author";
};
