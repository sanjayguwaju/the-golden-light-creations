import type { Access } from "payload";

export const adminsAndEditors: Access = ({ req: { user } }) => {
  const role = (user as { role?: string })?.role as string;
  return role === "admin" || role === "editor";
};
