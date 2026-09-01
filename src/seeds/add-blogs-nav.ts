import "dotenv/config";
import payload from "payload";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

const minimalConfig = buildConfig({
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  collections: [],
  globals: [
    {
      slug: "navigation",
      fields: [
        {
          name: "navItems",
          type: "array",
          fields: [
            {
              name: "link",
              type: "group",
              fields: [
                { name: "type", type: "text" },
                { name: "url", type: "text" },
                { name: "label", type: "text" },
                { name: "menuType", type: "text" },
              ],
            },
          ],
        },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || "temp",
});

async function run() {
  try {
    await payload.init({ config: minimalConfig });
    
    // Get current navigation
    const nav = await payload.findGlobal({ slug: "navigation" });
    
    // Append Blogs nav item
    const navItems = nav.navItems || [];
    
    // Check if already exists
    const exists = navItems.some((i: any) => i.link?.label === "Blogs");
    if (exists) {
      console.log("Blogs link already exists in navigation.");
      process.exit(0);
    }
    
    navItems.push({
      link: {
        type: "custom",
        url: "/posts",
        label: "Blogs",
        menuType: "standalone",
      }
    });
    
    await payload.updateGlobal({
      slug: "navigation",
      data: {
        navItems
      }
    });
    
    console.log("Successfully added Blogs to navigation!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
