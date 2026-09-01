import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

async function seedFooter() {
  await payload.init({ config: configPromise });

  const footerData = {
    companyInfo: {
      description: "Reliance Paints has been providing high-quality paints and coatings for over a decade. We are committed to excellence and customer satisfaction.",
      facebookUrl: "https://facebook.com/reliancepaints",
      instagramUrl: "https://instagram.com/reliancepaints",
      youtubeUrl: "https://youtube.com/reliancepaints",
    },
    quickLinks: [
      { label: "About Us", url: "/about" },
      { label: "Our Services", url: "/services" },
      { label: "Company News", url: "/news" },
      { label: "Careers", url: "/careers" },
      { label: "Contact Us", url: "/contact" },
    ],
    products: [
      { label: "Interior Paints", url: "/products/interior" },
      { label: "Exterior Paints", url: "/products/exterior" },
      { label: "Enamels", url: "/products/enamels" },
      { label: "Primers & Putty", url: "/products/primers-putty" },
      { label: "Waterproofing", url: "/products/waterproofing" },
    ],
    contactInfo: {
      location: "Baglung-01, Baglung, Gandaki Province, Nepal",
      phone: "068-520123 / 522345",
      email: "info@reliancepaints.com",
    },
    bottomBar: {
      copyright: `© ${new Date().getFullYear()} Reliance Paints. All rights reserved.`,
      links: [
        { label: "Privacy Policy", url: "/privacy-policy" },
        { label: "Terms & Conditions", url: "/terms-and-conditions" },
      ],
    },
  };

  const locales = ["en", "ne"];

  for (const locale of locales) {
    await payload.updateGlobal({
      slug: "footer",
      data: footerData,
      locale: locale as "en" | "ne" | "all",
    });
  }

  console.log("✅ Footer seeded successfully for all locales!");
  process.exit(0);
}

seedFooter();
