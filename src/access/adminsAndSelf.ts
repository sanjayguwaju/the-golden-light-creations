import type { Access } from "payload";

export const adminsAndSelf: Access = ({ req: { user } }) => {
  if ((user as { role?: string })?.role === "admin") return true;

  // If the user is authenticated, they can access their own document
  if (user) {
    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};
