import type { AccessArgs } from "payload";
import type { User } from "@/payload-types";

type isAdminType = (args: AccessArgs<User>) => boolean;

export const isAdmin: isAdminType = ({ req: { user } }) => {
  return Boolean((user as { role?: string })?.role === "admin");
};
