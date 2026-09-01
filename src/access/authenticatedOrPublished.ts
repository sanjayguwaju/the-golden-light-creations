import type { Access } from "payload";

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  const role = (user as { role?: string })?.role as string;

  // Admins, editors, and authors can see all posts (including drafts)
  if (role === "admin" || role === "editor" || role === "author") {
    return true;
  }

  // Standard users and public guests can only see published posts
  return {
    _status: {
      equals: "published",
    },
  };
};
