import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

async function seedOurServices(): Promise<void> {
  try {
    await payload.init({ config: configPromise });

    console.log("⏳ Starting Our Services seeder...");

    // Find the home page
    const existing = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "home",
        },
      },
      locale: "all", // get all localized data
      depth: 0,
    });

    if (existing.docs.length === 0) {
      console.log("❌ Home page not found. Please run the home page seeder first.");
      process.exit(1);
    }

    const homePage = existing.docs[0];

    // ─── ENGLISH LOCALIZATION ───
    const englishServices = [
      {
        title: "Interior Paints",
        description: "High quality interior paints.",
        icon: "brush",
      },
      {
        title: "Exterior Paints",
        description: "Weather resistant exterior paints.",
        icon: "sun",
      },
      {
        title: "Primers & Putty",
        description: "Best foundation for your walls.",
        icon: "roller",
      }
    ];

    // ─── NEPALI LOCALIZATION ───
    const nepaliServices = [
      {
        title: "भित्री रङ्ग",
        description: "उच्च गुणस्तरीय भित्री रङ्ग।",
        icon: "brush",
      },
      { title: "बाहिरी रङ्ग", description: "मौसम प्रतिरोधी बाहिरी रङ्ग।", icon: "sun" },
      { title: "प्राइमर र पुट्टी", description: "पर्खालको लागि उत्कृष्ट आधार।", icon: "roller" },
    ];

    // Helper to get exactly English or Nepali layout
    const buildLayout = (locale: "en" | "ne") => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pageLayout = homePage.layout as any;
      const existingLayout = pageLayout?.en || pageLayout || [];
      const newLayout = existingLayout.filter(
        (block: Record<string, unknown>) => block.blockType !== "ourServices"
      );

      newLayout.push({
        blockType: "ourServices",
        isEnabled: true,
        populateBy: "collection",
        badge: locale === "en" ? "Catalog Range" : "उत्पादन सूची",
        title: locale === "en" ? "Products We Offer" : "उत्पादनहरू",
        subtitle:
          locale === "en"
            ? "Reliance Paints Products Directory"
            : "रिलायन्स पेन्ट्स उत्पादन निर्देशिका",
        limit: 6,
        columns: "3",
      });

      return newLayout;
    };

    console.log("🛠️  Updating English locale...");
    await payload.update({
      collection: "pages",
      id: homePage.id,
      data: {
        layout: buildLayout("en"),
      },
      locale: "en",
      context: { disableRevalidate: true },
    });

    console.log("🛠️  Updating Nepali locale...");
    await payload.update({
      collection: "pages",
      id: homePage.id,
      data: {
        layout: buildLayout("ne"),
      },
      locale: "ne",
      context: { disableRevalidate: true },
    });

    console.log(`✅ Successfully seeded localized Our Services on Home Page!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  }
}

seedOurServices();
