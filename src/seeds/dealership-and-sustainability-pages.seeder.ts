import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../payload.config";

const createLexicalDoc = (paragraphs: string[]) => {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            type: "text",
            version: 1,
          },
        ],
      })),
      direction: "ltr",
    },
  };
};

async function seedPages() {
  console.log("--- Seeding Dealership Inquiry & Sustainability Pages ---");
  const payload = await getPayload({ config: configPromise });

  // Find any existing form for dealership
  const forms = await payload.find({
    collection: "forms",
    limit: 10,
  });

  const dealershipFormId = forms.docs.length > 0 ? forms.docs[0].id : undefined;

  const pagesToSeed = [
    {
      title: "Dealership Inquiry",
      slug: "dealership-inquiry",
      _status: "published",
      publishedAt: new Date().toISOString(),
      layout: [
        {
          blockType: "dealershipInquiry",
          title: "Dealership Inquiry",
          subtitle:
            "Join Nepal’s fastest growing paint network. Expand your business with industry-leading products, generous dealership margins, and comprehensive marketing support.",
          content: createLexicalDoc([
            "Reliance Paints is expanding its nationwide distribution footprint. We invite dynamic paint entrepreneurs, building material dealers, and established hardware retail merchants across Nepal to partner with us.",
            "As an authorized Reliance Paints dealer, you gain access to our complete lineup of premium interior & exterior emulsions, weather primers, enamels, and wood finishes, backed by localized marketing collateral, automated tinting systems, and guaranteed margins.",
          ]),
          form: dealershipFormId,
        },
      ],
    },
    {
      title: "Sustainability & Green Commitment",
      slug: "sustainability",
      _status: "published",
      publishedAt: new Date().toISOString(),
      layout: [
        {
          blockType: "sustainability",
          hero: {
            title: "Our Commitment to Sustainability",
            subtitle:
              "At Reliance Paints, we believe in protecting both your walls and our planet. Our eco-friendly, zero-VOC and low-odor formulations ensure cleaner indoor air and sustainable manufacturing for generations to come.",
          },
          introduction: createLexicalDoc([
            "Sustainability isn't just a corporate objective for Reliance Paints—it is central to how we formulate every batch of paint. From sourcing non-toxic pigments to operating zero-liquid-discharge automated plants in Birgunj, our operations are optimized to safeguard the Himalayan ecosystem.",
            "We engineer durable, long-lasting exterior and interior coatings that resist extreme weather, reduce the frequency of repainting, and drastically minimize material waste over the life cycle of every structure.",
          ]),
          pillars: [
            {
              title: "Zero & Ultra-Low VOC Formulations",
              description:
                "Water-based, non-toxic formulations eliminate harmful volatile organic compounds, ensuring safe indoor air quality for your family and painters.",
            },
            {
              title: "Zero Liquid Discharge Manufacturing",
              description:
                "100% of production wastewater is recycled through state-of-the-art filtration systems at our Birgunj automated facility.",
            },
            {
              title: "Energy-Efficient Modern Plant",
              description:
                "Automated energy-optimized dispersion mills reduce carbon emissions per metric ton of coating produced.",
            },
            {
              title: "Sustainable Recyclable Packaging",
              description:
                "Our durable HDPE and steel paint pails are engineered from recyclable materials with minimal single-use plastic waste.",
            },
          ],
          metrics: [
            {
              value: "0%",
              title: "Heavy Metals",
              description: "100% lead, mercury, and chromium free formulations",
            },
            {
              value: "100%",
              title: "Water Recycling",
              description: "Zero liquid industrial effluent discharged into rivers",
            },
            {
              value: "500k+",
              title: "Liters Saved",
              description: "Recycled water reused in sustainable plant utilities",
            },
            {
              value: "ISO 14001",
              title: "Eco Standard",
              description: "Certified environmental management system compliance",
            },
          ],
        },
      ],
    },
  ];

  for (const page of pagesToSeed) {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: page.slug } },
      limit: 1,
      draft: true,
    });

    if (existing.docs.length > 0) {
      console.log(`Updating existing page '${page.slug}'...`);
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data: page as any,
        context: { disableRevalidate: true },
      });
    } else {
      console.log(`Creating new page '${page.slug}'...`);
      await payload.create({
        collection: "pages",
        data: page as any,
        context: { disableRevalidate: true },
      });
    }
  }

  console.log("✅ Successfully seeded Dealership Inquiry & Sustainability pages into pages collection!");
  process.exit(0);
}

seedPages().catch((err) => {
  console.error("Error seeding pages:", err);
  process.exit(1);
});
