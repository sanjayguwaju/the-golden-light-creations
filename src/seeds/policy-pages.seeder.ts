import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

const createLexicalDoc = (sections: Array<{ heading?: string; paragraphs: string[] }>) => {
  const children: any[] = [];

  for (const section of sections) {
    if (section.heading) {
      children.push({
        type: "heading",
        tag: "h2",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: section.heading,
            type: "text",
            version: 1,
          },
        ],
      });
    }

    for (const paragraph of section.paragraphs) {
      children.push({
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
            text: paragraph,
            type: "text",
            version: 1,
          },
        ],
      });
    }
  }

  return {
    root: {
      type: "root",
      direction: "ltr" as const,
      format: "",
      indent: 0,
      version: 1,
      children,
    },
  };
};

export const seedPolicyPages = async () => {
  try {
    await payload.init({ config: configPromise });

    console.log("🌱 Starting Legal & Policy Pages seeder in pages collection...");

    const policyPages = [
      {
        slug: "shipping-delivery-information",
        title: "Shipping & Delivery Information",
        _status: "published",
        publishedAt: new Date().toISOString(),
        meta: {
          title: "Shipping & Delivery Information | Reliance Paints",
          description: "Learn about Reliance Paints delivery options, timelines, order tracking, and freight guidelines.",
        },
        layout: [
          {
            blockType: "shippingDelivery",
            title: "Shipping & Delivery Information",
            lastUpdated: new Date().toISOString(),
            introText:
              "We strive to deliver your premium paints and accessories with the utmost care and efficiency. Review our shipping methods, tracking procedures, and delivery policies below.",
            shippingMethods: [
              {
                title: "Standard Delivery",
                description:
                  "Our reliable standard shipping option for non-urgent orders. Delivered safely via our trusted logistics partners.",
                timeframe: "3-5 Business Days",
                cost: "Rs. 250 (Free over Rs. 5,000)",
              },
              {
                title: "Express Shipping",
                description:
                  "Get your paint faster to start your project right away. Priority handling and expedited transit.",
                timeframe: "1-2 Business Days",
                cost: "Rs. 500",
              },
              {
                title: "Store Pickup",
                description:
                  "Order online and pick up at your nearest authorized Reliance Paints dealer. We will notify you when it is ready.",
                timeframe: "Same Day or Next Day",
                cost: "Free",
              },
            ],
            trackingInfo: {
              title: "Order Tracking & Notifications",
              description:
                "Once your order is dispatched, you will receive a confirmation email and SMS containing your tracking number and a link to trace your delivery in real-time. Please allow up to 24 hours for the tracking information to become active after receiving the notification.",
            },
            faqs: [
              {
                question: "Do you ship internationally?",
                answer:
                  "Currently, we only ship within Nepal through our standard logistics network. For bulk international orders, please contact our support team.",
              },
              {
                question: "What if my paint is damaged during transit?",
                answer:
                  "We use specialized packaging to ensure paints do not spill or dent. However, if you receive a damaged product, please contact us within 24 hours of delivery with photos, and we will arrange a replacement.",
              },
              {
                question: "Can I change my shipping address after placing an order?",
                answer:
                  "Address changes are only possible if the order has not yet been dispatched. Please contact customer support immediately to request an address modification.",
              },
            ],
          },
        ],
      },
      {
        slug: "privacy-policy",
        title: "Privacy Policy",
        _status: "published",
        publishedAt: new Date().toISOString(),
        meta: {
          title: "Privacy Policy | Reliance Paints",
          description: "Read the Reliance Paints Privacy Policy to understand how we collect, use, and protect your personal information.",
        },
        layout: [
          {
            blockType: "policyDocument",
            title: "Privacy Policy",
            lastUpdated: new Date().toISOString(),
            content: createLexicalDoc([
              {
                heading: "1. Information We Collect",
                paragraphs: [
                  "Reliance Paints ('we', 'our', or 'us') respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website, register warranties, or contact our customer support.",
                  "We may collect personal identification information including your name, email address, phone number, physical address, and product purchase history when you voluntarily submit inquiries or participate in warranty registrations.",
                ],
              },
              {
                heading: "2. How We Use Your Information",
                paragraphs: [
                  "We use collected information to provide and maintain our services, verify warranty certificates, respond to inquiries, process dealership applications, and improve your user experience across our digital tools such as the paint calculator and shade visualizer.",
                  "We do not sell, rent, or lease your personal data to third parties for commercial marketing purposes.",
                ],
              },
              {
                heading: "3. Data Security & Storage",
                paragraphs: [
                  "We implement industry-standard administrative and technical security measures to safeguard your personal data against unauthorized access, loss, destruction, or alteration. Access to your personal data is restricted to authorized employees and contractors who need the information to perform specific support functions.",
                ],
              },
              {
                heading: "4. Contact Us Regarding Your Privacy",
                paragraphs: [
                  "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us at privacy@reliancepaintsnepal.com or visit our corporate office in Baglung / Kathmandu, Nepal.",
                ],
              },
            ]),
          },
        ],
      },
      {
        slug: "terms-and-conditions",
        title: "Terms and Conditions",
        _status: "published",
        publishedAt: new Date().toISOString(),
        meta: {
          title: "Terms and Conditions | Reliance Paints",
          description: "Review the official terms and conditions governing the use of Reliance Paints products, warranties, and website services.",
        },
        layout: [
          {
            blockType: "policyDocument",
            title: "Terms & Conditions",
            lastUpdated: new Date().toISOString(),
            content: createLexicalDoc([
              {
                heading: "1. Acceptance of Terms",
                paragraphs: [
                  "By accessing or using the Reliance Paints website, catalog, color selector, calculator, or warranty registration services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations of Nepal.",
                  "If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
                ],
              },
              {
                heading: "2. Product Usage & Technical Application",
                paragraphs: [
                  "All technical specifications, theoretical coverage values, thinning ratios, and drying times provided on our website and product sheets represent standard laboratory performance. Actual performance may vary depending on surface porosity, weather conditions, applicator technique, and surface preparation.",
                  "Users must follow recommended surface preparation steps (cleaning, scraping, priming) as detailed in product technical data sheets to ensure warranty validity.",
                ],
              },
              {
                heading: "3. Intellectual Property Rights",
                paragraphs: [
                  "All materials, logos, trademarks, photographs, color formulations, and software contained on this website are the intellectual property of Reliance Paints Pvt. Ltd. and are protected by applicable copyright and trademark laws.",
                ],
              },
              {
                heading: "4. Limitation of Liability",
                paragraphs: [
                  "In no event shall Reliance Paints or its authorized dealers be liable for any indirect, incidental, special, or consequential damages arising out of the misuse or improper application of products without following certified application guidelines.",
                ],
              },
            ]),
          },
        ],
      },
      {
        slug: "cookie-policy",
        title: "Cookie Policy",
        _status: "published",
        publishedAt: new Date().toISOString(),
        meta: {
          title: "Cookie Policy | Reliance Paints",
          description: "Understand how Reliance Paints uses cookies and tracking technologies to enhance your browsing experience.",
        },
        layout: [
          {
            blockType: "policyDocument",
            title: "Cookie Policy",
            lastUpdated: new Date().toISOString(),
            content: createLexicalDoc([
              {
                heading: "1. What Are Cookies",
                paragraphs: [
                  "Cookies are small text files that are stored on your computer or mobile device when you visit websites. They help the website remember your preferences, selected language (English / Nepali), saved color shades, and calculation history to provide a seamless browsing experience.",
                ],
              },
              {
                heading: "2. How We Use Cookies",
                paragraphs: [
                  "We use essential cookies to maintain core platform navigation, language switching, theme preferences (light/dark), and session continuity.",
                  "We also use aggregate analytics cookies (such as Google Analytics) to understand how visitors interact with our product pages, color trends, and visualizer tools, allowing us to continuously improve site performance.",
                ],
              },
              {
                heading: "3. Managing Your Cookie Preferences",
                paragraphs: [
                  "You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings. However, disabling essential cookies may affect how you interact with our website and its interactive tools.",
                ],
              },
            ]),
          },
        ],
      },
      {
        slug: "returns-refunds-policy",
        title: "Returns and Refunds Policy",
        _status: "published",
        publishedAt: new Date().toISOString(),
        meta: {
          title: "Returns & Refunds Policy | Reliance Paints",
          description: "Read our Returns & Refunds Policy to understand how to return products, claim warranties, and receive eligible refunds.",
        },
        layout: [
          {
            blockType: "policyDocument",
            title: "Returns & Refunds Policy",
            lastUpdated: new Date().toISOString(),
            content: createLexicalDoc([
              {
                heading: "1. Returns Eligibility",
                paragraphs: [
                  "At Reliance Paints, we strive to ensure you are fully satisfied with your purchase. You have 30 days to return standard paint products from the date you received your shipment or picked up your order from an authorized dealer.",
                  "To be eligible for a return, the product container must be unopened, in its original factory seal, and in the same pristine condition that you received it.",
                ],
              },
              {
                heading: "2. Non-Returnable Items",
                paragraphs: [
                  "Custom tinted paints (paints mixed to custom shade codes at dealer tinting machines), open containers, and discounted clearance items are non-returnable unless a verified manufacturing defect is identified by a technical service representative.",
                ],
              },
              {
                heading: "3. Refunds Process",
                paragraphs: [
                  "Once we receive and inspect your returned merchandise, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed via original payment method or store credit within 7-10 business days.",
                ],
              },
              {
                heading: "4. Damaged or Defective Items",
                paragraphs: [
                  "If your paint container arrives damaged or leaking during transit, please notify customer support within 24 hours of delivery with photographic evidence. We will arrange a free replacement immediately.",
                ],
              },
            ]),
          },
        ],
      },
    ];

    for (const pageData of policyPages) {
      const existing = await payload.find({
        collection: "pages",
        where: {
          slug: { equals: pageData.slug },
        },
        limit: 1,
        draft: true,
      });

      if (existing.docs.length > 0) {
        console.log(`Updating existing page '${pageData.slug}'...`);
        await payload.update({
          collection: "pages",
          id: existing.docs[0].id,
          data: pageData as any,
          context: { disableRevalidate: true },
        });
      } else {
        console.log(`Creating new page '${pageData.slug}'...`);
        await payload.create({
          collection: "pages",
          data: pageData as any,
          context: { disableRevalidate: true },
        });
      }
    }

    console.log("✅ Successfully seeded all 5 policy pages into pages collection!");
  } catch (error) {
    console.error(`❌ Error seeding policy pages: ${error}`);
  } finally {
    process.exit(0);
  }
};

seedPolicyPages();
