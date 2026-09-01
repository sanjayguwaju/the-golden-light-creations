import type { Access } from "payload";

export const adminsEditorsAndSelf: Access = ({ req: { user } }) => {
  const role = (user as { role?: string })?.role as string;
  if (role === "admin" || role === "editor") {
    return true;
  }

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
