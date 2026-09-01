import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_noStore as noStore } from "next/cache";

export const getNotices = async () => {
  noStore();
  const payload = await getPayload({ config: configPromise });

  const notices = await payload.find({
    collection: "list",
    where: {
      and: [
        {
          status: {
            equals: "published",
          },
        },
        {
          targetAudience: {
            not_equals: "staff_only",
          },
        },
        {
          showInPopup: {
            equals: true,
          },
        },
      ],
    },
    sort: "-updatedAt",
    depth: 1,
  });
  return notices.docs;
};
