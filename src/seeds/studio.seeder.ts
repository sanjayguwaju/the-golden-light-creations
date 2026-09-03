import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../payload.config";
import {
  defaultPortfolio,
  defaultFilms,
  defaultServices,
  defaultTestimonials,
  defaultStudioSettings,
} from "../utilities/getStudioData";

async function seedStudio() {
  console.log("🌟 Initializing Payload CMS for The Golden Light Creations Seeder...");
  const payload = await getPayload({ config: configPromise });

  console.log("\n📸 Seeding Portfolio items...");
  for (let i = 0; i < defaultPortfolio.length; i++) {
    const item = defaultPortfolio[i];
    const existing = await payload.find({
      collection: "portfolio",
      where: {
        title: { equals: item.title },
      },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await (payload as any).create({
        collection: "portfolio",
        data: {
          title: item.title,
          category: item.category,
          imageUrl: item.src,
          location: item.location,
          featured: true,
          order: (i + 1) * 10,
        },
      });
      console.log(`  ✓ Created portfolio item: ${item.title}`);
    } else {
      console.log(`  - Portfolio item already exists: ${item.title}`);
    }
  }

  console.log("\n🎬 Seeding Films...");
  for (let i = 0; i < defaultFilms.length; i++) {
    const film = defaultFilms[i];
    const existing = await payload.find({
      collection: "films",
      where: {
        title: { equals: film.title },
      },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await (payload as any).create({
        collection: "films",
        data: {
          title: film.title,
          category: film.category as any,
          videoUrl: film.videoUrl,
          posterUrl: film.thumb,
          duration: film.duration,
          featured: true,
          order: (i + 1) * 10,
        },
      });
      console.log(`  ✓ Created film: ${film.title}`);
    } else {
      console.log(`  - Film already exists: ${film.title}`);
    }
  }

  console.log("\n✨ Seeding Services...");
  for (let i = 0; i < defaultServices.length; i++) {
    const srv = defaultServices[i];
    const existing = await payload.find({
      collection: "services",
      where: {
        serviceNumber: { equals: srv.num },
      },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await (payload as any).create({
        collection: "services",
        data: {
          title: srv.name,
          serviceNumber: srv.num,
          shortDescription: srv.desc,
          icon: srv.icon as any,
          featured: true,
          order: (i + 1) * 10,
        },
      });
      console.log(`  ✓ Created service: [${srv.num}] ${srv.name}`);
    } else {
      console.log(`  - Service already exists: [${srv.num}] ${srv.name}`);
    }
  }

  console.log("\n💬 Seeding Testimonials...");
  for (let i = 0; i < defaultTestimonials.length; i++) {
    const t = defaultTestimonials[i];
    const existing = await payload.find({
      collection: "testimonials",
      where: {
        clientName: { equals: t.name },
      },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "testimonials",
        data: {
          clientName: t.name,
          roleOrEvent: t.role,
          quote: t.text,
          rating: t.rating,
          avatarUrl: t.avatar,
          featured: true,
          order: (i + 1) * 10,
        },
      });
      console.log(`  ✓ Created testimonial: ${t.name}`);
    } else {
      console.log(`  - Testimonial already exists: ${t.name}`);
    }
  }

  console.log("\n⚙️ Updating Studio Settings global...");
  try {
    await payload.updateGlobal({
      slug: "studio-settings",
      data: defaultStudioSettings,
    });
    console.log("  ✓ Studio Settings updated with luxury defaults.");
  } catch (err) {
    console.warn("  - Note on studio-settings global update:", err);
  }

  console.log("\n🎉 The Golden Light Creations database seeding completed successfully!");
  process.exit(0);
}

seedStudio().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
