import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../payload.config";

async function run() {
  try {
    const payload = await getPayload({ config: configPromise });

    for (const locale of ["en", "ne"]) {
      console.log(`Checking navigation for locale: ${locale}...`);
      const nav: any = await payload.findGlobal({
        slug: "navigation",
        locale: locale as any,
        depth: 2,
      });

      if (!nav || !nav.navItems) {
        console.log(`No navItems found for locale: ${locale}`);
        continue;
      }

      let modified = false;
      const updatedNavItems = nav.navItems.map((item: any) => {
        const label = item.link?.label?.toLowerCase() || "";
        const url = item.link?.url?.toLowerCase() || "";

        if (label === "company" || url === "/about-us") {
          const tabs = item.link.megaMenuTabs || [];
          const updatedTabs = tabs.map((tab: any) => {
            const links = tab.links || [];
            const hasOurTeam = links.some(
              (l: any) =>
                l.link?.url === "/our-team" ||
                l.link?.label?.toLowerCase() === "our team"
            );

            if (!hasOurTeam) {
              console.log(`Adding Our Team to ${tab.tabLabel || "Company"} links in locale: ${locale}...`);
              modified = true;
              return {
                ...tab,
                links: [
                  ...links.slice(0, 1),
                  {
                    link: {
                      type: "custom",
                      url: "/our-team",
                      label: locale === "ne" ? "हाम्रो टोली" : "Our Team",
                    },
                  },
                  ...links.slice(1),
                ],
              };
            }
            return tab;
          });

          return {
            ...item,
            link: {
              ...item.link,
              megaMenuTabs: updatedTabs,
            },
          };
        }
        return item;
      });

      if (modified) {
        await payload.updateGlobal({
          slug: "navigation",
          locale: locale as any,
          data: {
            ...nav,
            navItems: updatedNavItems,
          },
        });
        console.log(`Successfully updated navigation for locale: ${locale}!`);
      } else {
        console.log(`Our Team already exists in navigation for locale: ${locale}.`);
      }
    }

    console.log("Navigation update complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error updating navigation:", err);
    process.exit(1);
  }
}

run();
