import type { AccessArgs, Where } from "payload";
import type { User } from "@/payload-types";

type isAdminOrSelfType = (args: AccessArgs<User>) => boolean | Where;

export const isAdminOrSelf: isAdminOrSelfType = ({ req: { user } }) => {
  if (!user) return false;
  if ((user as { role?: string })?.role === "admin") return true;
  return {
    id: {
      equals: user.id,
    },
  };
};
