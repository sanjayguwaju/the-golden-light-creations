import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/careers/submit-resume/route";
import { NextRequest } from "next/server";

describe("Submit Resume Route Handler", () => {
  it("rejects request if required fields are missing", async () => {
    const formData = new FormData();
    formData.append("applicantName", "A"); // too short

    const req = new NextRequest("http://localhost:3000/api/careers/submit-resume", {
      method: "POST",
      body: formData,
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("must be at least 2 characters");
  });

  it("rejects invalid email address", async () => {
    const formData = new FormData();
    formData.append("applicantName", "John Doe");
    formData.append("email", "invalid-email");

    const req = new NextRequest("http://localhost:3000/api/careers/submit-resume", {
      method: "POST",
      body: formData,
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("valid email");
  });

  it("rejects missing CV file", async () => {
    const formData = new FormData();
    formData.append("applicantName", "John Doe");
    formData.append("email", "john.doe@example.com");
    formData.append("phone", "+977-9812345678");

    const req = new NextRequest("http://localhost:3000/api/careers/submit-resume", {
      method: "POST",
      body: formData,
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("upload your CV");
  });
});
