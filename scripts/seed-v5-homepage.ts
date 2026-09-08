import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../src/payload.config";

const LOCALES = ["en", "ne", "ko", "hr", "hi", "zh", "fr", "it", "ru"];

export const v5HomepageBlocksData = [
  {
    blockType: "v5Hero",
    videoUrl: "/v5/hero-video.mp4",
    posterUrl: "/hero-poster.jpg",
    showScrollCue: true,
    showAccentStrip: true,
  },
  {
    blockType: "v5Stats",
    pullUp: true,
    stats: [
      { num: "5+", label: "Years of Craft" },
      { num: "300+", label: "Projects Delivered" },
      { num: "250+", label: "Happy Clients" },
      { num: "10M+", label: "Social Reach" },
    ],
  },
  {
    blockType: "v5Services",
    eyebrow: "What We Offer",
    title: "Premium creative services, built for people who notice detail",
    description:
      "From intimate weddings to full commercial campaigns — every service is shot, edited, and delivered to a cinema-grade standard.",
    services: [
      {
        idx: "01",
        title: "Wedding Photography",
        description:
          "Timeless luxury coverage capturing every intimate emotion and golden detail of your day.",
        link: "#contact",
      },
      {
        idx: "02",
        title: "Cinematic Videography",
        description:
          "Wedding films crafted like feature productions — emotional, gripping, and built to last.",
        link: "#contact",
      },
      {
        idx: "03",
        title: "Drone Coverage",
        description:
          "Aerial perspectives that reveal the scale of your venue and the grandeur of the moment.",
        link: "#contact",
      },
      {
        idx: "04",
        title: "Event Coverage",
        description:
          "Full documentation of corporate galas, cultural celebrations, and milestone occasions.",
        link: "#contact",
      },
      {
        idx: "05",
        title: "Concert Photography",
        description:
          "High-energy live coverage that captures the raw power of a performance in motion.",
        link: "#contact",
      },
      {
        idx: "06",
        title: "Music Video Production",
        description:
          "Concept-to-screen production — artistic, cinematic, and built around your sound.",
        link: "#contact",
      },
    ],
  },
  {
    blockType: "v5Portfolio",
    eyebrow: "Our Work",
    title: "A visual portfolio, shaped by light",
    ctaText: "Explore Full Portfolio",
    ctaLink: "/portfolio",
    items: [
      {
        title: "Wedding — Kathmandu",
        imageUrl:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
        size: "tall",
      },
      {
        title: "Bride Portrait — Pokhara",
        imageUrl:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85",
        size: "standard",
      },
      {
        title: "Corporate Gala",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85",
        size: "standard",
      },
      {
        title: "Fashion Editorial",
        imageUrl:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85",
        size: "tall",
      },
      {
        title: "Couple Session — Nagarkot",
        imageUrl:
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=85",
        size: "standard",
      },
      {
        title: "Concert Coverage",
        imageUrl:
          "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&q=85",
        size: "standard",
      },
    ],
  },
  {
    blockType: "v5LiveEvents",
    eyebrow: "On Location",
    title: "Live events, concerts & festival coverage",
    description:
      "Real coverage from real stages — festival crowds, headline performers, and the energy of a live show captured frame by frame.",
    items: [
      {
        title: "GE Fest — Main Stage",
        imageUrl: "/v5/ge-fest-main-stage-performance.jpg",
        span: "tall",
      },
      {
        title: "Festival Crowd Coverage",
        imageUrl: "/v5/festival-crowd.jpg",
        span: "wide",
      },
      {
        title: "Live Vocal Performance",
        imageUrl: "/v5/vocalist-performing-live.jpg",
        span: "standard",
      },
      {
        title: "On-Stage Performance",
        imageUrl: "/v5/guitarist-on-stage.jpg",
        span: "standard",
      },
      {
        title: "Headline Performance",
        imageUrl: "/v5/headline-performer-on-stage.jpg",
        span: "tall",
      },
      {
        title: "Crowd Interaction",
        imageUrl: "/v5/performer-waving-to-crowd.jpg",
        span: "standard",
      },
      {
        title: "Stage Coverage",
        imageUrl: "/v5/performer-on-stage.jpg",
        span: "standard",
      },
    ],
  },
  {
    blockType: "v5Packages",
    eyebrow: "Wedding Packages",
    title: "Choose the coverage that fits your day",
    description:
      "Every package includes a dedicated team, professional color grading, and a private delivery gallery.",
    packages: [
      {
        name: "Standard",
        price: "Starting at NPR 35,000",
        featured: false,
        features: [
          { item: "1 Photographer" },
          { item: "1 Videographer" },
          { item: "Highlight Video" },
          { item: "Long Video" },
          { item: "Unlimited Photos" },
        ],
        buttonText: "Enquire",
        buttonLink: "#contact",
      },
      {
        name: "Premium",
        price: "Starting at NPR 65,000",
        featured: true,
        badge: "Most Popular",
        features: [
          { item: "Drone + 1 Drone Pilot" },
          { item: "1 Photographer" },
          { item: "1 Videographer" },
          { item: "Highlight + Long Video" },
          { item: "64GB Pendrive" },
          { item: "Karizma Album" },
          { item: "Unlimited Photos" },
        ],
        buttonText: "Enquire",
        buttonLink: "#contact",
      },
      {
        name: "Gold",
        price: "Starting at NPR 50,000",
        featured: false,
        features: [
          { item: "1 Photographer" },
          { item: "1 Videographer" },
          { item: "Highlight Video" },
          { item: "Long Video" },
          { item: "Karizma Album" },
          { item: "Unlimited Photos" },
        ],
        buttonText: "Enquire",
        buttonLink: "#contact",
      },
    ],
  },
  {
    blockType: "v5About",
    eyebrow: "Our Story",
    title: "Crafting timeless visual stories across Nepal since 2019",
    quote:
      "Every love story is rare, intimate, and sacred. We document feelings, not just poses.",
    paragraph:
      "From royal palace weddings in Kathmandu Valley to high-altitude cinematic pre-wedding shoots in the Himalayas, our team blends international film-grade cameras with heartfelt cultural storytelling.",
    imageUrl:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=85",
    buttonText: "Read Our Full Story",
    buttonLink: "/about",
  },
  {
    blockType: "v5Founder",
    eyebrow: "A Message From Our Founder",
    title: "Every frame we deliver carries a name and a promise behind it",
    quote:
      "We don't just shoot — we create emotions. That's not a tagline for us, it's the standard every shoot is held to.",
    message1:
      "I started The Golden Light Creations in 2019 with one camera and a simple belief: that the most important moments in a person's life deserve to be told with honesty, patience, and craft. Since then, that belief has taken our team from intimate Kathmandu weddings to festival main stages across Nepal.",
    message2:
      "Every project we take on — big or small — gets the same attention to light, timing, and emotion. That is the standard I hold our entire team to, and it's the reason clients trust us with their most meaningful days.",
    founderName: "Suresh Lama",
    founderTagTitle: "Founder & Creative Director",
    founderSignRole: "Founder, The Golden Light Creations",
    portraitUrl:
      "/v5/suresh-lama-founder-of-the-golden-light-creations.jpg",
  },
  {
    blockType: "v5Testimonials",
    eyebrow: "Client Love",
    title: "What our clients say",
    testimonials: [
      {
        quote:
          "The Golden Light Creations transformed our wedding into a cinematic masterpiece. Every frame felt like a painting.",
        name: "Priya Maharjan",
        role: "Bride · Kathmandu",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      },
      {
        quote:
          "Professional, punctual, and incredibly talented. The aftermovie became our brand's most-viewed content.",
        name: "Suman KC",
        role: "Event Director · Lalitpur",
        avatarUrl:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
      },
      {
        quote:
          "I wanted my wedding photos to look like they belonged in a luxury magazine. That's exactly what I got.",
        name: "Anisha Tamang",
        role: "Bride · Bhaktapur",
        avatarUrl:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
      },
    ],
  },
  {
    blockType: "v5CtaBand",
    eyebrow: "2026 Commissions Open",
    title: "Let's capture your next visual masterpiece",
    buttonText: "Book Your Shoot",
    buttonLink: "#contact",
  },
  {
    blockType: "v5Contact",
    eyebrow: "Get In Touch",
    title: "Book your dream shoot",
    phone: "+977 981 017 5322",
    email: "info@thegoldenlightcreations.com",
    address: "Kathmandu, Nepal",
    serviceOptions: [
      { label: "Wedding Photography & Film" },
      { label: "Cinematic Videography" },
      { label: "Drone Coverage" },
      { label: "Event Coverage" },
      { label: "Concert Photography" },
      { label: "Music Video Production" },
    ],
  },
];

async function seedV5Homepage() {
  console.log("🌟 Connecting to Payload CMS to seed V5 Homepage blocks...");
  const payload = await getPayload({ config: configPromise });

  // 1. Update the 'home' page across all locales with the 11 V5 blocks
  console.log("📄 Populating 'home' page layout with all 11 V5 Editorial blocks...");
  for (const loc of LOCALES) {
    const pageRes = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: "home" },
      },
      locale: loc as any,
      limit: 1,
    });

    if (pageRes.docs.length > 0) {
      const pageDoc = pageRes.docs[0];
      await payload.update({
        collection: "pages",
        id: pageDoc.id,
        locale: loc as any,
        data: {
          title: pageDoc.title || "Home",
          hero: { type: "none" as any },
          layout: v5HomepageBlocksData as any,
        },
        context: { disableRevalidate: true },
      });
      console.log(`  ✓ Updated 'home' page with V5 blocks for locale: [${loc}]`);
    } else {
      // Create home page if it doesn't exist yet for this locale
      await payload.create({
        collection: "pages",
        locale: loc as any,
        data: {
          title: "Home",
          slug: "home",
          hero: { type: "none" as any },
          layout: v5HomepageBlocksData as any,
        },
        context: { disableRevalidate: true },
      });
      console.log(`  ✓ Created 'home' page with V5 blocks for locale: [${loc}]`);
    }
  }

  // 2. Also ensure a dedicated 'v5' page document exists so editors can view /v5 in the CMS and on the site!
  console.log("\n📄 Ensuring dedicated 'v5' page document exists in CMS...");
  for (const loc of LOCALES) {
    const v5Res = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: "v5" },
      },
      locale: loc as any,
      limit: 1,
    });

    if (v5Res.docs.length === 0) {
      await payload.create({
        collection: "pages",
        locale: loc as any,
        data: {
          title: "V5 Editorial Experience",
          slug: "v5",
          hero: { type: "none" as any },
          layout: v5HomepageBlocksData as any,
        },
        context: { disableRevalidate: true },
      });
      console.log(`  ✓ Created dedicated 'v5' page for locale: [${loc}]`);
    } else {
      await payload.update({
        collection: "pages",
        id: v5Res.docs[0].id,
        locale: loc as any,
        data: {
          title: v5Res.docs[0].title || "V5 Editorial Experience",
          hero: { type: "none" as any },
          layout: v5HomepageBlocksData as any,
        },
        context: { disableRevalidate: true },
      });
      console.log(`  ✓ Updated dedicated 'v5' page for locale: [${loc}]`);
    }
  }

  console.log("\n🎉 V5 Homepage blocks and full data populated successfully!");
  process.exit(0);
}

seedV5Homepage().catch((err) => {
  console.error("❌ Failed to populate V5 homepage data:", err);
  process.exit(1);
});
