import "dotenv/config";
import payload, { type RequiredDataFromCollectionSlug } from "payload";
import configPromise from "../payload.config";

const staffSeedData = [
  {
    titlePrefix: "mr",
    fullName: "Ram Sharma",
    slug: "ram-sharma",
    designation: "Managing Director",
    department: "management",
    roleType: "executive",
    specialization: "Business Administration",
    employmentType: "full_time",
    joinDate: "2010-01-01",
    phone: "9857670001",
    email: "ram.sharma@reliancepaints.com",
    biography: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Mr. Ram Sharma is the Managing Director of Reliance Paints with over 20 years of experience in the paint industry.",
              },
            ],
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      },
    },
    qualifications: [
      { degree: "MBA", institution: "Kathmandu University", year: 2005 },
    ],
    languagesSpoken: [{ language: "Nepali" }, { language: "English" }, { language: "Hindi" }],
    availabilitySchedule: [
      { day: "sunday", hours: "9AM - 5PM" },
      { day: "monday", hours: "9AM - 5PM" },
      { day: "tuesday", hours: "9AM - 5PM" },
      { day: "wednesday", hours: "9AM - 5PM" },
      { day: "thursday", hours: "9AM - 5PM" },
      { day: "friday", hours: "9AM - 1PM" },
    ],
    address: {
      street: "Nayabazar",
      city: "Baglung",
      district: "Baglung",
      province: "Gandaki",
      zipCode: "33200",
    },
    emergencyContact: {
      name: "Sita Sharma",
      relationship: "Spouse",
      emergencyPhone: "9800000001",
      emergencyEmail: "sita.sharma@gmail.com",
    },
    isActive: true,
    showOnWebsite: true,
    displayOrder: 1,
  },
  {
    titlePrefix: "ms",
    fullName: "Anita Thapa",
    slug: "anita-thapa",
    designation: "Sales Manager",
    department: "sales",
    roleType: "manager",
    specialization: "Marketing",
    employmentType: "full_time",
    joinDate: "2015-05-15",
    phone: "9857670002",
    email: "anita.thapa@reliancepaints.com",
    biography: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Ms. Anita Thapa is the Sales Manager at Reliance Paints.",
              },
            ],
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      },
    },
    qualifications: [
      { degree: "BBA", institution: "Pokhara University", year: 2012 },
    ],
    languagesSpoken: [{ language: "Nepali" }, { language: "English" }],
    availabilitySchedule: [
      { day: "sunday", hours: "10AM - 5PM" },
      { day: "monday", hours: "10AM - 5PM" },
      { day: "tuesday", hours: "10AM - 5PM" },
      { day: "wednesday", hours: "10AM - 5PM" },
      { day: "thursday", hours: "10AM - 5PM" },
    ],
    address: {
      street: "Srijana Chowk",
      city: "Pokhara",
      district: "Kaski",
      province: "Gandaki",
      zipCode: "33700",
    },
    emergencyContact: {
      name: "Ramesh Thapa",
      relationship: "Spouse",
      emergencyPhone: "9800000002",
      emergencyEmail: "ramesh.thapa@gmail.com",
    },
    isActive: true,
    showOnWebsite: true,
    displayOrder: 2,
  }
];

async function seedStaffs(): Promise<void> {
  try {
    await payload.init({ config: configPromise });

    console.log("⏳ Waiting 10s for MongoDB index locks to clear...");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("🌱 Starting staff seeder...");

    const existing = await payload.find({ collection: "staffs", limit: 100 });
    if (existing.docs.length > 0) {
      console.log(`🗑️  Deleting ${existing.docs.length} existing staff records...`);
      for (const doc of existing.docs) {
        await payload.delete({ collection: "staffs", id: doc.id });
      }
    }

    const results = [];
    for (const staff of staffSeedData) {
      results.push(
        await payload.create({
          collection: "staffs",
          data: staff as unknown as RequiredDataFromCollectionSlug<"staffs">,
        })
      );
    }

    console.log(`✅ Successfully seeded ${results.length} staff members:`);
    results.forEach((r) =>
      console.log(`   • ${r.titlePrefix?.toUpperCase() || ''}. ${r.fullName} — ${r.designation}`)
    );
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedStaffs();
