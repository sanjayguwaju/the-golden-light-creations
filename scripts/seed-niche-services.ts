import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../src/payload.config";
import { defaultServices } from "../src/utilities/studioDefaults";

async function seedNicheServices() {
  console.log("🌟 Initializing Payload CMS to seed niche services and VIP category...");
  const payload = await getPayload({ config: configPromise });

  // 1. Seed or find the VIP / Celebrity Category
  console.log("\n🏷️ Checking Categories for 'Public Figures & Celebrities'...");
  let vipCategory = null;
  const existingCat = await payload.find({
    collection: "categories",
    where: {
      slug: {
        equals: "vip-celebrities",
      },
    },
    limit: 1,
  });

  if (existingCat.docs.length > 0) {
    vipCategory = existingCat.docs[0];
    console.log(`  ✓ Category already exists: ${vipCategory.title}`);
  } else {
    vipCategory = await payload.create({
      collection: "categories",
      data: {
        title: "Public Figures & Celebrities",
        slug: "vip-celebrities",
      },
    });
    console.log(`  ✅ Created category: Public Figures & Celebrities (${vipCategory.id})`);
  }

  // 2. Seed or update Services collection in database
  console.log("\n🛠️ Seeding Services in Payload CMS...");
  for (let i = 0; i < defaultServices.length; i++) {
    const srv = defaultServices[i];
    const existing = await payload.find({
      collection: "services",
      where: {
        slug: {
          equals: srv.slug,
        },
      },
      limit: 1,
    });

    const serviceData: any = {
      title: srv.name,
      serviceNumber: srv.num,
      slug: srv.slug,
      shortDescription: srv.desc,
      tagline: srv.tagline || "",
      icon: srv.icon || "camera",
      heroImageUrl: srv.heroImageUrl || "",
      overview: srv.overview || srv.desc,
      targetAudience: srv.targetAudience || "High-Profile Clients & Discerning Brands",
      confidentialityNotice: srv.confidentialityNotice || "Strict NDA Compliance Guaranteed",
      deliverables: srv.deliverables || [],
      processSteps: srv.processSteps || [],
      faqs: srv.faqs || [],
      featured: true,
      order: (i + 1) * 10,
    };

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "services",
        data: serviceData,
      });
      console.log(`  ✅ Created service: [${srv.num}] ${srv.name} (/services/${srv.slug})`);
    } else {
      await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data: serviceData,
      });
      console.log(`  🔄 Updated service: [${srv.num}] ${srv.name} (/services/${srv.slug})`);
    }
  }

  // 3. Seed sample case study post for Mayors & Celebrities if not exists
  console.log("\n📰 Checking Case Study Post for Mayors & Celebrities...");
  const postSlug = "civic-leadership-4k-behind-the-lens-mayor-dignitary-campaigns-nepal";
  const existingPost = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: postSlug,
      },
    },
    limit: 1,
  });

  if (existingPost.docs.length === 0) {
    // Find an uploaded media item for hero
    const mediaDocs = await payload.find({
      collection: "media",
      limit: 1,
    });
    const heroMediaId = mediaDocs.docs.length > 0 ? mediaDocs.docs[0].id : undefined;

    if (heroMediaId) {
      const samplePost = await payload.create({
        collection: "posts",
        data: {
          title: "Civic Leadership in 4K: Behind the Lens of Mayor & Dignitary Campaigns in Nepal",
          slug: postSlug,
          categories: [vipCategory.id],
          heroImage: heroMediaId,
          publishedAt: new Date().toISOString(),
          _status: "published",
          meta: {
            title: "Civic Leadership in 4K: Mayor & Dignitary Campaigns | The Golden Light Creations",
            description: "How The Golden Light Creations produces broadcast-grade keynote addresses, infrastructure reveals, and citizen engagement reels for Nepal's civic leaders.",
          },
          content: {
            root: {
              type: "root",
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "In an era where citizens consume information in vertical micro-seconds, civic governance requires more than traditional press conferences. Modern mayors, municipal authorities, and public leaders across Nepal are embracing cinema-grade visual storytelling to communicate policy, celebrate public milestones, and forge genuine trust with citizens.",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                },
                {
                  type: "heading",
                  tag: "h2",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Speed & Dignity: The 3-Hour Press Turnaround",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "When a city mayor inaugurates a clean water initiative or addresses a regional economic summit, news cycles cannot wait for next-week edits. Our on-site field editing units grade, color-match, and dispatch broadcast-resolution photo reels to national press wires and social managers within 180 minutes of the event closing.",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                },
                {
                  type: "quote",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Authentic leadership is not manufactured in a studio; it is captured in the eyes of citizens seeing genuine progress in their streets.",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                },
                {
                  type: "heading",
                  tag: "h2",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Strict NDA & Security Protocol on Closed Sets",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Working with visiting dignitaries and municipal heads demands absolute discretion. Every technician on our closed set operates under hardware-level encrypted storage, vetted security badges, and strict non-disclosure terms, guaranteeing that sensitive civic developments remain private until official state release.",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                },
              ],
            },
          },
        },
      });
      console.log(`  ✅ Created sample case study post: ${samplePost.title}`);
    }
  } else {
    console.log(`  ✓ Sample case study post already exists: ${existingPost.docs[0].title}`);
  }

  console.log("\n✨ Seeding completed successfully!");
  process.exit(0);
}

seedNicheServices().catch((err) => {
  console.error("❌ Error seeding niche services:", err);
  process.exit(1);
});
