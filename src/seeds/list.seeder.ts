import "dotenv/config";
import payload, { type RequiredDataFromCollectionSlug } from "payload";
import configPromise from "../payload.config";

const createLexicalText = (text: string) => ({
  root: {
    type: "root",
    direction: "ltr" as const,
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
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            type: "text",
            version: 1,
          },
        ],
      },
    ],
  },
});

const noticesSeedData = [
  {
    title: "Public Holiday on the occasion of Fagu Purnima",
    slug: "public-holiday-fagu-purnima",
    priority: "high",
    description: createLexicalText(
      "This is to notify all staff and clients that Reliance Paints will remain closed on the occasion of Fagu Purnima."
    ),
    publishedDate: "2026-03-03T00:00:00.000Z",
    showInPopup: false,
    status: "published",
    attachments: [
      {
        label: "Notice Document",
        externalFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  {
    title: "Result of Managerial Interviews",
    slug: "result-managerial",
    priority: "medium",
    description: createLexicalText(
      "The final results for the recently held interviews have been published."
    ),
    publishedDate: "2026-01-25T00:00:00.000Z",
    showInPopup: false,
    status: "published",
    attachments: [
      {
        label: "Result Document",
        externalFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  {
    title: "Advertisement for Sales Executive Vacancy",
    slug: "advertisement-sales-executive",
    priority: "high",
    description: createLexicalText(
      "Reliance Paints is looking for dedicated and qualified Sales Executives to join our growing team. Eligible candidates can apply before the deadline."
    ),
    publishedDate: "2026-01-13T00:00:00.000Z",
    showInPopup: true,
    popupSettings: {
      popupStartDate: "2026-01-13T00:00:00.000Z",
      popupEndDate: "2026-02-13T00:00:00.000Z",
      displayMode: "full",
    },
    status: "published",
    attachments: [
      {
        label: "Vacancy Detail",
        externalFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  {
    title: "Annual General Meeting (AGM) Notice",
    slug: "annual-general-meeting-notice",
    priority: "low",
    publishedDate: "2025-11-10T00:00:00.000Z",
    description: createLexicalText(
      "Notice is hereby given that the Annual General Meeting of Reliance Paints will be held in the main auditorium."
    ),
    showInPopup: false,
    status: "published",
  },
  {
    title: "Information regarding filling employee positions under service contracts",
    slug: "employee-positions-service-contracts",
    priority: "medium",
    description: createLexicalText(
      "Details concerning the procedures and requirements for filling various employee positions under new service contracts have been published."
    ),
    publishedDate: "2025-08-11T00:00:00.000Z",
    showInPopup: false,
    status: "published",
    attachments: [
      {
        label: "Contract Terms",
        externalFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
];

async function seedNotices(): Promise<void> {
  try {
    await payload.init({ config: configPromise });

    // Give Payload some time to build indexes or sync schemas which locks the DB
    console.log("⏳ Waiting 10s for MongoDB index locks to clear...");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("🌱 Starting notices seeder...");

    // Clear existing list records
    const existing = await payload.find({ collection: "list", limit: 100 });
    if (existing.docs.length > 0) {
      console.log(`🗑️  Deleting ${existing.docs.length} existing documents...`);
      for (const doc of existing.docs) {
        await payload.delete({ collection: "list", id: doc.id });
      }
    }

    // Insert all documents
    const results = [];
    for (const notice of noticesSeedData) {
      results.push(
        await payload.create({
          collection: "list",
          data: notice as unknown as RequiredDataFromCollectionSlug<"list">,
        })
      );
    }

    console.log(`✅ Successfully seeded ${results.length} documents:`);
    results.forEach((r) => console.log(`   • ${r.title} — Priority: ${r.priority}`));
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedNotices();
