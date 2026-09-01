import type { AccessArgs } from "payload";
import type { User } from "@/payload-types";

type isAdminOrStaffType = (args: AccessArgs<User>) => boolean;

export const isAdminOrStaff: isAdminOrStaffType = ({ req: { user } }) => {
  if (!user) return false;
  return Boolean((user as { role?: string })?.role === "admin" || (user as { role?: string })?.role === "staff");
};
