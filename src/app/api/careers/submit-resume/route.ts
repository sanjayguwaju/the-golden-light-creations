import { getPayload } from "payload";
import configPromise from "@payload-config";
import { NextResponse, type NextRequest } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const applicantName = (formData.get("applicantName") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const preferredDepartment = (formData.get("preferredDepartment") as string || "General / Any Department").trim();
    const applicationType = (formData.get("applicationType") as string || "general").trim();
    const appliedFor = (formData.get("appliedFor") as string || "").trim();
    const coverLetter = (formData.get("coverLetter") as string || "").trim();

    // 1. Validation
    if (!applicantName || applicantName.length < 2) {
      return NextResponse.json(
        { error: "Applicant name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 7) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    if (!file || typeof file === "string" || !file.size) {
      return NextResponse.json(
        { error: "Please upload your CV / Resume file." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });

    // 2. Upload file to 'files' collection
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileDoc = await payload.create({
      collection: "files",
      locale: "en",
      data: {
        title: `${applicantName} - Resume (${file.name})`,
        fileCategory: "cv",
        uploadedFrom: appliedFor ? "careers" : "talent-network",
        isPrivate: true,
      },
      file: {
        data: fileBuffer,
        mimetype: file.type || "application/pdf",
        name: file.name,
        size: file.size,
      },
      overrideAccess: true,
    });

    if (!fileDoc?.id) {
      throw new Error("Failed to store resume document in storage.");
    }

    // 3. Create job application
    const jobApp = await payload.create({
      collection: "job-applications",
      data: {
        applicantName,
        email,
        phone,
        applicationType: (applicationType as any) || (appliedFor ? "specific" : "general"),
        preferredDepartment,
        appliedFor: appliedFor || undefined,
        coverLetter: coverLetter || undefined,
        cv: fileDoc.id,
        status: "new",
      },
      overrideAccess: true,
    });

    return NextResponse.json({
      success: true,
      message: "Resume submitted successfully! Our HR team will review your application.",
      applicationId: jobApp.id,
    });
  } catch (error: any) {
    console.error("Error in submit-resume API route:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to submit resume. Please try again later.",
      },
      { status: 500 }
    );
  }
}
