import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../src/payload.config";
import { defaultTeamMembers } from "../src/utilities/studioDefaults";

async function seedTeam() {
  console.log("🌟 Initializing Payload CMS to seed Team Members...");
  const payload = await getPayload({ config: configPromise });

  // 1. Seed Team Members
  console.log("\n👥 Seeding Team Members in Payload CMS...");
  for (const member of defaultTeamMembers) {
    const existing = await payload.find({
      collection: "team" as any,
      where: {
        name: {
          equals: member.name,
        },
      },
      limit: 1,
    });

    const memberData: any = {
      name: member.name,
      role: member.role,
      photoUrl: member.photoUrl,
      bio: member.bio,
      specialties: member.specialties.map((tag) => ({ tag })),
      socialLinks: {
        linkedin: member.socialLinks.linkedin || "",
        instagram: member.socialLinks.instagram || "",
        twitter: member.socialLinks.twitter || "",
        facebook: member.socialLinks.facebook || "",
        email: member.socialLinks.email || "",
      },
      order: member.order,
      featured: member.featured,
    };

    if (existing.docs.length > 0) {
      const docId = existing.docs[0].id;
      await payload.update({
        collection: "team" as any,
        id: docId,
        data: memberData,
        context: { disableRevalidate: true },
      });
      console.log(`  ✓ Updated team member: ${member.name} (${member.role})`);
    } else {
      const created = await payload.create({
        collection: "team" as any,
        data: memberData,
        context: { disableRevalidate: true },
      });
      console.log(`  ✅ Created team member: ${member.name} (${member.role}) [${created.id}]`);
    }
  }

  // 2. Ensure "studioTeam" block exists on the "about" page in CMS
  console.log("\n📄 Checking 'about' page in CMS Pages collection...");
  const aboutPages = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "about",
      },
    },
    limit: 1,
  });

  if (aboutPages.docs.length > 0) {
    const aboutPage = aboutPages.docs[0];
    const currentLayout = Array.isArray(aboutPage.layout) ? [...aboutPage.layout] : [];

    const hasTeamBlock = currentLayout.some((b: any) => b.blockType === "studioTeam");
    if (!hasTeamBlock) {
      console.log("  Adding studioTeam block to about page layout...");
      const teamBlock = {
        blockType: "studioTeam" as const,
        eyebrow: "The Creative Collective",
        title: "Meet The Artists Behind The Lens",
        subtitle:
          "A world-class collective of directors, cinematographers, portrait masters, and color scientists dedicated to immortalizing timeless emotion.",
      };

      // Insert before studioContact or studioBanner, or push to end
      const bannerIndex = currentLayout.findIndex((b: any) => b.blockType === "studioBanner" || b.blockType === "studioContact");
      if (bannerIndex !== -1) {
        currentLayout.splice(bannerIndex, 0, teamBlock);
      } else {
        currentLayout.push(teamBlock);
      }

      await payload.update({
        collection: "pages",
        id: aboutPage.id,
        data: {
          layout: currentLayout,
        },
        context: { disableRevalidate: true },
      });
      console.log("  ✅ Added studioTeam block to 'about' page in CMS!");
    } else {
      console.log("  ✓ 'about' page layout already contains studioTeam block.");
    }
  } else {
    console.log("  ℹ️ 'about' page document not found in CMS yet (fallback renderer will display it).");
  }

  console.log("\n🎉 Team Members Seeding & CMS Synchronization Complete!\n");
  process.exit(0);
}

seedTeam().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
