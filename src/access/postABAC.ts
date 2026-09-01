import type { Access } from "payload";

export const postABAC: Access = ({ req: { user } }) => {
  const role = (user as { role?: string })?.role as string;

  // Admins and editors can access any post
  if (role === "admin" || role === "editor") {
    return true;
  }

  // Authors can only access posts where they are listed in the 'authors' relationship array
  if (role === "author" && user) {
    return {
      authors: {
        equals: user.id,
      },
    };
  }

  return false;
};
