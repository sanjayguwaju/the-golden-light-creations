import "dotenv/config";
import payload from "payload";
import config from "../payload.config";

const albumSeedData = [
  {
    title: "Annual Product Launch",
    slug: "annual-product-launch",
    // These IDs will be populated dynamically in the seeder
    featuredImage: "",
    images: [],
  },
  {
    title: "Factory Building Inauguration",
    slug: "factory-building-inauguration",
    featuredImage: "",
    images: [],
  },
  {
    title: "Staff Training & Development",
    slug: "staff-training-development",
    featuredImage: "",
    images: [],
  },
  {
    title: "Paints Trade Expo",
    slug: "paints-trade-expo",
    featuredImage: "",
    images: [],
  },
];

async function seedAlbums(): Promise<void> {
  try {
    await payload.init({ config });

    console.log("🌱 Starting albums seeder...");

    // Get some media items to use for seeding
    const media = await payload.find({
      collection: "media",
      limit: 10,
    });

    if (media.docs.length === 0) {
      console.warn(
        "⚠️ No media found in database. Please upload some media first to seed albums with images."
      );
      // We'll proceed with empty images if no media exists, but Payload might complain if required
      // Since featuredImage is required in the collection config, this might fail unless media exists.
    }

    const mediaIds = media.docs.map((m) => m.id);

    // Clear existing albums
    const existing = await payload.find({
      collection: "albums",
      limit: 100,
    });
    if (existing.docs.length > 0) {
      console.log(`🗑️  Deleting ${existing.docs.length} existing album records...`);
      await Promise.all(
        existing.docs.map((doc) => payload.delete({ collection: "albums", id: doc.id }))
      );
    }

    // Insert all albums
    console.log(`📋 Inserting ${albumSeedData.length} albums...`);

    for (const [index, album] of albumSeedData.entries()) {
      // Rotate through available media IDs
      const featuredImageId = mediaIds.length > 0 ? mediaIds[index % mediaIds.length] : undefined;

      // Create a few gallery images
      const galleryImages = [];
      if (mediaIds.length > 0) {
        // Take 3-4 images for each album
        for (let i = 0; i < 4; i++) {
          const imgId = mediaIds[(index + i) % mediaIds.length];
          galleryImages.push({
            image: imgId,
            caption: `Moment from ${album.title} - Photo ${i + 1}`,
          });
        }
      }

      await payload.create({
        collection: "albums",
        data: {
          ...album,
          featuredImage: featuredImageId as never,
          images: galleryImages as never,
        },
      });
    }

    console.log(`✅ Successfully seeded ${albumSeedData.length} albums.`);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedAlbums();
