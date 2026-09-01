import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

async function getOrCreateMedia(url: string, filename: string, alt: string): Promise<string> {
  const existing = await payload.find({
    collection: "media",
    where: {
      alt: { equals: alt },
    },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    return existing.docs[0].id as string;
  }

  console.log(`Uploading media: ${alt}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image from ${url}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const doc = await payload.create({
    collection: "media",
    data: { alt },
    file: {
      data: buffer,
      name: filename,
      mimetype: "image/jpeg",
      size: buffer.byteLength,
    },
  });

  return doc.id as string;
}

async function seedNavigation(): Promise<void> {
  try {
    await payload.init({ config: configPromise });

    console.log("Seeding Navigation global...");

    // Get or upload images for Products categories
    const exteriorImageId = await getOrCreateMedia(
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=600&auto=format&fit=crop",
      "exterior-paints.jpg",
      "Exterior Paints"
    );
    const interiorImageId = await getOrCreateMedia(
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop",
      "interior-paints.jpg",
      "Interior Paints"
    );
    const distempersImageId = await getOrCreateMedia(
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
      "distempers.jpg",
      "Distempers"
    );
    const enamelImageId = await getOrCreateMedia(
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
      "enamel-paints.jpg",
      "Enamel Paints"
    );
    const undercoatsImageId = await getOrCreateMedia(
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop",
      "undercoats-and-wall-primers.jpg",
      "Undercoats and Wall Primers"
    );
    const metalPrimerImageId = await getOrCreateMedia(
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
      "metal-primer.jpg",
      "Metal Primer"
    );
    const woodPrimerImageId = await getOrCreateMedia(
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
      "wood-primer.jpg",
      "Wood Primer"
    );

    // Find the first media item to use as a dummy logo if no logo exists yet
    const media = await payload.find({
      collection: "media",
      limit: 1,
    });
    const logoId = media.docs[0]?.id;

    if (!logoId) {
      console.warn("Warning: No media documents found. Please upload a logo manually later.");
    }

    const navigationData = {
      brand: {
        logo: logoId || undefined,
        logoConfiguration: {
          height: 70,
          width: 140,
        },
        brandName: "Reliance Paints",
      },
      navItems: [
        {
          link: {
            type: "custom",
            url: "/",
            label: "Home",
            menuType: "standalone",
          },
        },
        {
          link: {
            type: "custom",
            url: "/products",
            label: "Products",
            menuType: "megaMenu",
            megaMenuTabs: [
              {
                tabLabel: "Paints Categories",
                links: [
                  { link: { type: "custom", url: "/products/all", label: "All Products (Direct)", image: exteriorImageId } },
                  { link: { type: "custom", url: "/products/exterior-paints", label: "Exterior Paints", image: exteriorImageId } },
                  { link: { type: "custom", url: "/products/interior-paints", label: "Interior Paints", image: interiorImageId } },
                  { link: { type: "custom", url: "/products/distempers", label: "Distempers", image: distempersImageId } },
                  { link: { type: "custom", url: "/products/enamel-paints", label: "Enamel Paints", image: enamelImageId } },
                  { link: { type: "custom", url: "/products/undercoats-and-wall-primers", label: "Undercoats and Wall Primers", image: undercoatsImageId } },
                  { link: { type: "custom", url: "/products/metal-primer", label: "Metal Primer", image: metalPrimerImageId } },
                  { link: { type: "custom", url: "/products/wood-primer", label: "Wood Primer", image: woodPrimerImageId } },
                ],
              },
            ],
          },
        },
        {
          link: {
            type: "custom",
            url: "/colors",
            label: "Colors",
            menuType: "standalone",
          },
        },
        {
          link: {
            type: "custom",
            url: "/visualiser",
            label: "Visualiser",
            menuType: "standalone",
          },
        },
        {
          link: {
            type: "custom",
            url: "/about-us",
            label: "Company",
            menuType: "megaMenu",
            megaMenuTabs: [
              {
                tabLabel: "Company Info",
                links: [
                  { link: { type: "custom", url: "/about-us", label: "About Us" } },
                  { link: { type: "custom", url: "/our-team", label: "Our Team" } },
                  { link: { type: "custom", url: "/careers", label: "Careers" } },
                  { link: { type: "custom", url: "/investor-relations", label: "Investor Relations" } },
                  { link: { type: "custom", url: "/sustainability", label: "Sustainability" } },
                  { link: { type: "custom", url: "/certifications-quality-standards", label: "Certifications" } },
                ],
              },
            ],
          },
        },
        {
          link: {
            type: "custom",
            url: "/posts",
            label: "Resources",
            menuType: "megaMenu",
            megaMenuTabs: [
              {
                tabLabel: "Resources Hub",
                links: [
                  { link: { type: "custom", url: "/posts", label: "Blogs" } },
                  { link: { type: "custom", url: "/painting-tips-diy-guides", label: "Painting Tips" } },
                  { link: { type: "custom", url: "/colour-trends", label: "Colour Trends" } },
                  { link: { type: "custom", url: "/media-center", label: "Media Center" } },
                  { link: { type: "custom", url: "/faqs", label: "FAQs" } },
                ],
              },
            ],
          },
        },
        {
          link: {
            type: "custom",
            url: "/contact-us",
            label: "Support",
            menuType: "megaMenu",
            megaMenuTabs: [
              {
                tabLabel: "Support Center",
                links: [
                  { link: { type: "custom", url: "/contact-us", label: "Contact Us" } },
                  { link: { type: "custom", url: "/store-locator", label: "Find a Dealer" } },
                  { link: { type: "custom", url: "/calculator", label: "Paint Calculator" } },
                  { link: { type: "custom", url: "/inspiration", label: "Inspiration" } },
                  { link: { type: "custom", url: "/dealership-inquiry", label: "Become a Dealer" } },
                  { link: { type: "custom", url: "/contractors-program", label: "Contractors" } },
                  { link: { type: "custom", url: "/warranty-registration", label: "Warranty" } },
                ],
              },
            ],
          },
        },
        {
          link: {
            type: "custom",
            url: "/privacy-policy",
            label: "Legal",
            menuType: "subMenu",
            subMenuLinks: [
              { link: { type: "custom", url: "/privacy-policy", label: "Privacy Policy" } },
              { link: { type: "custom", url: "/terms-and-conditions", label: "Terms & Conditions" } },
              { link: { type: "custom", url: "/cookie-policy", label: "Cookie Policy" } },
              { link: { type: "custom", url: "/returns-refunds-policy", label: "Returns & Refunds" } },
              { link: { type: "custom", url: "/shipping-delivery-information", label: "Shipping & Delivery" } },
            ],
          },
        },
      ],
      whatsAppNumber: "9801234567",
      whatsAppUser: "Reliance Support",
    };

    await payload.updateGlobal({
      slug: "navigation",
      data: navigationData as any,
      context: { disableRevalidate: true },
    });

    console.log("Successfully seeded Navigation global with category images!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding Navigation:", err);
    process.exit(1);
  }
}

seedNavigation();
