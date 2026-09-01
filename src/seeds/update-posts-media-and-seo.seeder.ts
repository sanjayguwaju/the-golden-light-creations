import "dotenv/config";
import { getPayload } from "payload";
import config from "@payload-config";

const CATEGORIES_DATA = [
  { title: "Inspiration", slug: "inspiration" },
  { title: "Painting Tips & DIY Guides", slug: "painting-tips-diy-guides" },
  { title: "Color Trends & Ideas", slug: "color-trends-ideas" },
  { title: "Home Improvement", slug: "home-improvement" },
  { title: "Product Guides & Primer", slug: "product-guides-primer" },
  { title: "Eco-Friendly & Sustainability", slug: "eco-friendly-sustainability" },
];

const POSTS_ENRICHMENT_DATA: Record<
  string,
  {
    heroImageFilename: string;
    categorySlug: string;
    metaTitle: string;
    metaDescription: string;
  }
> = {
  "discover-beautiful-spaces-with-reliance-paints": {
    heroImageFilename: "Modern Living Room with Trendy Wall Colors.jpeg",
    categorySlug: "inspiration",
    metaTitle: "Discover Beautiful Spaces with Reliance Paints | Color & Interior Ideas",
    metaDescription: "Explore inspiring modern interiors, vibrant color combinations, and premium wall finishes to transform every room in your home with Reliance Paints.",
  },
  "keep-walls-looking-fresh": {
    heroImageFilename: "Modern Living Room.jpg",
    categorySlug: "painting-tips-diy-guides",
    metaTitle: "How to Keep Your Walls Looking Fresh for Years | Maintenance Tips",
    metaDescription: "Essential wall care advice, cleaning techniques, and protective painting practices to ensure your interior walls look vibrant and newly painted for years.",
  },
  "five-common-painting-mistakes": {
    heroImageFilename: "Professional Painter Rolling a Perfect Wall.jpeg",
    categorySlug: "painting-tips-diy-guides",
    metaTitle: "5 Common Painting Mistakes & How to Avoid Them | Expert Guide",
    metaDescription: "Avoid bubbling, uneven streaks, and poor paint adhesion. Learn the 5 most common DIY painting pitfalls and professional contractor solutions.",
  },
  "why-primer-is-essential": {
    heroImageFilename: "Interior Wall Preparation.webp",
    categorySlug: "product-guides-primer",
    metaTitle: "Why Primer is Essential Before Painting | Surface Preparation",
    metaDescription: "Discover why applying a quality primer like Reliance Wall Primer is crucial for true color payoff, moisture protection, and long-lasting durability.",
  },
  "interior-vs-exterior-paint": {
    heroImageFilename: "beautifully painted modern house.jpeg",
    categorySlug: "product-guides-primer",
    metaTitle: "Interior vs Exterior Paint: What's the Difference? | Paint Guide",
    metaDescription: "Understand the resin formulations, weather resistance, UV blockers, and VOC differences between interior emulsions and exterior protective paints.",
  },
  "how-to-choose-perfect-paint": {
    heroImageFilename: "Modern Interior with Distinct Color Palettes.jpeg",
    categorySlug: "home-improvement",
    metaTitle: "How to Choose the Perfect Paint for Your Home | Color & Finish Guide",
    metaDescription: "Step-by-step guide to selecting ideal color palettes, light reflectance values, and durable finishes for living rooms, bedrooms, kitchens, and exteriors.",
  },
  "how-weather-affects-exterior-painting-projects": {
    heroImageFilename: "beautifully painted modern house.jpeg",
    categorySlug: "painting-tips-diy-guides",
    metaTitle: "How Weather Affects Exterior Painting Projects | Best Season to Paint",
    metaDescription: "Learn how monsoon humidity, extreme heat, and seasonal changes in Nepal affect paint drying times, adhesion, and exterior paint lifespan.",
  },
  "preparing-your-home-before-painting-a-complete-checklist": {
    heroImageFilename: "Interior Wall Preparation.webp",
    categorySlug: "home-improvement",
    metaTitle: "Preparing Your Home Before Painting: A Complete Checklist",
    metaDescription: "Follow this room preparation guide: moving furniture, washing walls, filling cracks, applying painter's tape, and priming surfaces like a pro.",
  },
  "how-to-keep-painted-walls-looking-new-for-years": {
    heroImageFilename: "Modern Living Room.jpg",
    categorySlug: "home-improvement",
    metaTitle: "How to Keep Painted Walls Looking New for Years | Wall Care Guide",
    metaDescription: "Prevent stains, mildew, and scuffs on high-traffic walls. Simple cleaning solutions and maintenance routines to preserve paint luster.",
  },
  "common-painting-mistakes-and-how-to-avoid-them": {
    heroImageFilename: "Professional Painter Rolling a Perfect Wall.jpeg",
    categorySlug: "painting-tips-diy-guides",
    metaTitle: "Common Painting Mistakes & How to Avoid Them | Expert Tips",
    metaDescription: "Avoid roller marks, bleeding edges, and inadequate drying times with these proven application techniques for residential and commercial painters.",
  },
  "choosing-the-perfect-paint-finish-for-every-room": {
    heroImageFilename: "bright, modern living room.jpeg",
    categorySlug: "home-improvement",
    metaTitle: "Choosing the Perfect Paint Finish for Every Room: Matte to High Gloss",
    metaDescription: "Compare matte, eggshell, satin, semi-gloss, and high-gloss sheens to find the right balance of durability and aesthetic elegance for every room.",
  },
  "the-psychology-of-color-how-paint-affects-mood": {
    heroImageFilename: "Modern Interior with Distinct Color Palettes.jpeg",
    categorySlug: "inspiration",
    metaTitle: "The Psychology of Color: How Paint Affects Mood & Productivity",
    metaDescription: "Discover how blues inspire calm, yellows boost energy, and earthy greens create serenity in residential homes and modern workspaces.",
  },
  "painting-tips-small-spaces": {
    heroImageFilename: "Bright Small Living Room with Light-Colored Walls.jpeg",
    categorySlug: "home-improvement",
    metaTitle: "Painting Tips for Small Spaces: Visual Tricks to Expand Rooms",
    metaDescription: "Transform compact rooms with light-reflecting colors, monochromatic walls, vertical accent stripes, and ceiling paint tricks.",
  },
  "eco-friendly-painting-sustainable-choices": {
    heroImageFilename: "Bright Eco-Friendly Living Room with Indoor.jpeg",
    categorySlug: "eco-friendly-sustainability",
    metaTitle: "Eco-Friendly Painting: Low-VOC & Sustainable Paint Options",
    metaDescription: "Breathe cleaner air indoors with Reliance Paints zero-VOC, heavy-metal-free, and eco-certified paints designed for healthy living.",
  },
  "ultimate-guide-exterior-paint-durability": {
    heroImageFilename: "Beautiful Modern Home with Freshly Painted Exterior.jpeg",
    categorySlug: "product-guides-primer",
    metaTitle: "Ultimate Guide to Exterior Paint Durability in Nepal's Climate",
    metaDescription: "Protect your exterior walls against monsoon rains, UV degradation, algae, and thermal cracking with Reliance Double Dfence & Ultra Protec.",
  },
  "top-5-color-trends-2024": {
    heroImageFilename: "Modern Living Room with Trendy Wall Colors.jpeg",
    categorySlug: "color-trends-ideas",
    metaTitle: "Top 5 Color Trends: Inspiring Palettes to Transform Your Space",
    metaDescription: "Explore trending neutral warm tones, calming earthy terracottas, and rich oceanic hues forecast by top architectural designers.",
  },
};

async function seed() {
  const payload = await getPayload({ config });
  console.log("Starting Posts Image, Category, and SEO enrichment...");

  // 1. Ensure categories exist
  const categoryMap = new Map<string, string>(); // slug -> id
  for (const cat of CATEGORIES_DATA) {
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      categoryMap.set(cat.slug, existing.docs[0].id);
      console.log(`Found category: ${cat.title} (${existing.docs[0].id})`);
    } else {
      const created = await payload.create({
        collection: "categories",
        data: {
          title: cat.title,
          slug: cat.slug,
          generateSlug: false,
        },
      });
      categoryMap.set(cat.slug, created.id);
      console.log(`Created category: ${cat.title} (${created.id})`);
    }
  }

  // 2. Fetch all media assets
  const mediaDocs = await payload.find({
    collection: "media",
    depth: 0,
    limit: 300,
  });

  const mediaMap = new Map<string, string>(); // filename -> id
  mediaDocs.docs.forEach((m) => {
    if (m.filename) {
      mediaMap.set(m.filename, m.id);
    }
  });
  console.log(`Indexed ${mediaMap.size} media filenames.`);

  // Fallback image in case exact filename not found
  const fallbackMediaId = mediaDocs.docs[0]?.id;

  // 3. Fetch all posts
  const posts = await payload.find({
    collection: "posts",
    depth: 0,
    limit: 100,
    draft: true,
  });

  console.log(`Processing ${posts.docs.length} posts...`);

  let updatedCount = 0;
  for (const post of posts.docs) {
    const enrichment = POSTS_ENRICHMENT_DATA[post.slug];
    if (!enrichment) {
      console.log(`No specific enrichment data for post slug: ${post.slug}, using general fallback`);
      continue;
    }

    const mediaId = mediaMap.get(enrichment.heroImageFilename) || fallbackMediaId;
    const categoryId = categoryMap.get(enrichment.categorySlug);

    const updateData: Record<string, any> = {
      heroImage: mediaId,
      meta: {
        title: enrichment.metaTitle,
        description: enrichment.metaDescription,
        image: mediaId,
      },
      _status: "published",
    };

    if (categoryId) {
      updateData.categories = [categoryId];
    }

    await payload.update({
      collection: "posts",
      id: post.id,
      data: updateData,
      context: {
        disableRevalidate: true,
      },
    });

    console.log(`✅ Updated Post: "${post.title}" (slug: ${post.slug})`);
    console.log(`   - heroImage: ${mediaId} (${enrichment.heroImageFilename})`);
    console.log(`   - category: ${enrichment.categorySlug} (${categoryId})`);
    console.log(`   - meta.title: ${enrichment.metaTitle}`);
    console.log(`   - meta.image: ${mediaId}`);
    updatedCount++;
  }

  console.log(`\n🎉 Successfully enriched all ${updatedCount} posts with mandatory heroImage, categories, and full SEO metadata!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error running posts enrichment seed:", err);
  process.exit(1);
});
