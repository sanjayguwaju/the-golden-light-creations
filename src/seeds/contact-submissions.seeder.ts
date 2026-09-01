import "dotenv/config";
import payload, { type RequiredDataFromCollectionSlug } from "payload";
import configPromise from "../payload.config";

const createLexicalText = (text: string) => ({
  root: {
    type: "root",
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

const seedData = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+977-9841234567",
    address: "Baglung Bazaar, Ward 2",
    preferredContactMethod: "phone",
    subject: "general",
    message: "What are the office timings? I would like to schedule a visit for next week.",
    status: "new",
    priority: "normal",
    source: "website",
  },
  {
    name: "Sunita Tamang",
    email: "sunita.t@example.com",
    phone: "+977-9812345678",
    address: "Kusma, Parbat",
    preferredContactMethod: "email",
    subject: "appointment",
    message: "I need to request an urgent meeting with a sales executive. We need a bulk order quotation.",
    status: "under_review",
    priority: "high",
    source: "website",
  },
  {
    name: "Ramesh Thapa",
    email: "ramesh.thapa88@example.com",
    phone: "068-520123",
    address: "Baskot, Baglung",
    preferredContactMethod: "either",
    subject: "billing",
    message: "I found a discrepancy in my recent billing statement regarding the paint delivery charges. I have attached the bill for your review.",
    status: "new",
    priority: "high",
    source: "email",
  },
  {
    name: "Gita Poudel",
    email: "poudel.gita@example.com",
    phone: "+977-9865432109",
    address: "Burtibang, Baglung",
    preferredContactMethod: "phone",
    subject: "feedback",
    message: "The support staff was extremely helpful during my visit. Thank you for the excellent service.",
    status: "resolved",
    priority: "low",
    source: "walk_in",
    adminResponse: createLexicalText(
      "Thank you so much for your kind words! We will definitely pass this feedback to our team."
    ),
    responseChannel: "phone",
    resolutionSummary: "Thanked the patient family for their positive feedback.",
  },
  {
    name: "Nabin Gurung",
    email: "nabingrg.11@example.com",
    phone: "+977-9801122334",
    address: "Galkot, Baglung",
    preferredContactMethod: "email",
    subject: "complaint",
    message: "I had to wait for more than 3 hours in the reception without any help. This is highly unprofessional.",
    status: "replied",
    priority: "urgent",
    source: "website",
    adminResponse: createLexicalText(
      "Dear Nabin, We sincerely apologize for the delay you experienced. A representative will call you shortly to discuss this further."
    ),
    responseChannel: "email",
  },
];

const seedCommonFormSubmissions = async () => {
  try {
    const initializedPayload = await payload.init({
      config: configPromise,
    });

    console.log("🌱 Starting common form submissions seeder...");

    // Delete existing common form submissions first
    const existingSubmissions = await initializedPayload.find({
      collection: "common-form-submissions",
      limit: 100,
      overrideAccess: true,
    });

    if (existingSubmissions.docs.length > 0) {
      console.log(
        `🗑️  Deleting ${existingSubmissions.docs.length} existing common form submissions...`
      );
      for (const submission of existingSubmissions.docs) {
        await initializedPayload.delete({
          collection: "common-form-submissions",
          id: submission.id,
          overrideAccess: true,
        });
      }
    }

    // Insert new dummy data
    for (const data of seedData) {
      await initializedPayload.create({
        collection: "common-form-submissions",
        data: data as unknown as RequiredDataFromCollectionSlug<"common-form-submissions">,
        overrideAccess: true,
      });
    }

    console.log("✅ Successfully seeded 5 common form submissions.");

    // Explicitly exit process after completion
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding common form submissions:", error);
    process.exit(1);
  }
};

seedCommonFormSubmissions();
