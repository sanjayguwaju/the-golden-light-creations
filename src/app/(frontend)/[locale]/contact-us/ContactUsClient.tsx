"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp,.gif,.pdf,.doc,.docx";

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  phone: z.string().min(10, "Valid phone number is required."),
  address: z.string().min(2, "Address is required."),
  preferredContactMethod: z.enum(["email", "phone", "either"]),
  subject: z.enum([
    "general",
    "dealership",
    "products",
    "professional_services",
    "order_delivery",
    "feedback_complaint",
    "other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters long."),
  attachments: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_MIME_TYPES.includes(files[0].type as (typeof ACCEPTED_MIME_TYPES)[number]),
      "Only JPEG, PNG, WebP, GIF, PDF, DOC and DOCX formats are supported."
    ),
});

type FormValues = z.infer<typeof formSchema>;

// ─── File Upload ──────────────────────────────────────────────────────────────

async function uploadAttachment(fileList: FileList): Promise<string | null> {
  if (!fileList || fileList.length === 0) return null;

  const file = fileList[0];
  const formData = new FormData();

  // Binary file
  formData.append("file", file);

  // Payload CMS requires collection fields as stringified JSON in "_payload"
  formData.append(
    "_payload",
    JSON.stringify({
      title: file.name,
      fileCategory: "form_attachment",
      uploadedFrom: "common-form-submissions",
      isPrivate: true,
    })
  );

  try {
    const res = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.errors?.[0]?.message || "File upload failed");
    }

    const parsed = await res.json();
    return parsed.doc.id as string;
  } catch (e) {
    console.error("File upload error:", e);
    return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ContactUsClient: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".contact-stagger",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      preferredContactMethod: "email",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Step 1 — Upload attachment if provided
      let attachmentId: string | null = null;
      if (values.attachments && values.attachments.length > 0) {
        toast.info("Uploading attachment...");
        attachmentId = await uploadAttachment(values.attachments);
        if (!attachmentId) {
          throw new Error("Could not upload attachment. Please try again.");
        }
      }

      // Step 2 — Submit contact form
      toast.info("Sending message...");
      const response = await fetch("/api/common-form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email || undefined,
          phone: values.phone,
          address: values.address,
          preferredContactMethod: values.preferredContactMethod,
          subject: values.subject,
          message: values.message,
          ...(attachmentId
            ? {
                attachments: [
                  {
                    label: values.attachments?.[0]?.name ?? "Attachment",
                    file: attachmentId,
                  },
                ],
              }
            : {}),
        }),
      });

      const parsedRes = await response.json();
      if (!response.ok) {
        throw new Error(parsedRes.errors?.[0]?.message || "Failed to submit contact form.");
      }

      setTicketCode(parsedRes.doc.ticketCode);
      toast.success("Message sent successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: unknown) {
      toast.error((error as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Success State ────────────────────────────────────────────────────────

  if (ticketCode) {
    return (
      <div className="flex flex-col items-center py-10 space-y-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-none flex items-center justify-center mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold">Message Received!</h2>
        <p className="text-muted-foreground text-lg max-w-lg">
          Thank you for contacting Reliance Paints. Our support team will review your inquiry and
          get back to you through your preferred contact method.
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-none p-6 w-full max-w-md my-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            Your Ticket Code
          </p>
          <div className="text-3xl font-mono font-bold tracking-widest bg-background py-3 rounded-none border">
            {ticketCode}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Please save this code securely. You can reference it if you need further follow-ups.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={() => router.push("/")} className="bg-[#0D1B3E] hover:bg-[#C9A84C] text-white rounded-none">
            Return to Homepage <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // ─── Form ─────────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="contact-stagger">
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">
                  Full Name <span className="text-reliance-gold">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} className="border-reliance-navy rounded-none focus-visible:ring-reliance-navy" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="contact-stagger">
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">
                  Phone Number <span className="text-reliance-gold">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="+977-XXXXXXXXXX" {...field} className="border-reliance-navy rounded-none focus-visible:ring-reliance-navy" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="contact-stagger">
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} className="border-reliance-navy rounded-none focus-visible:ring-reliance-navy" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="contact-stagger">
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">
                  Address <span className="text-reliance-gold">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your physical address" {...field} className="border-reliance-navy rounded-none focus-visible:ring-reliance-navy" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Contact Method */}
          <FormField
            control={form.control}
            name="preferredContactMethod"
            render={({ field }) => (
              <FormItem className="contact-stagger">
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">Preferred Contact Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-reliance-navy rounded-none focus:ring-reliance-navy">
                      <SelectValue placeholder="Select a method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border-reliance-navy">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="either">Either</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="contact-stagger">
                <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">
                  Subject / Inquiry Type <span className="text-reliance-gold">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-reliance-navy rounded-none focus:ring-reliance-navy">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border-reliance-navy">
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="dealership">Dealership Inquiry / Partner</SelectItem>
                    <SelectItem value="products">Product Information / Paints</SelectItem>
                    <SelectItem value="professional_services">Painter / Professional Services</SelectItem>
                    <SelectItem value="order_delivery">Order Status / Delivery</SelectItem>
                    <SelectItem value="feedback_complaint">Feedback / Complaint</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="contact-stagger">
              <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">
                Message <span className="text-reliance-gold">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can we help you?"
                  className="min-h-[120px] resize-none border-reliance-navy rounded-none focus-visible:ring-reliance-navy"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Attachment */}
        <FormField
          control={form.control}
          name="attachments"
          render={({ field: { value: _value, onChange, ...fieldProps } }) => (
            <FormItem className="contact-stagger">
              <FormLabel className="text-xs font-bold uppercase tracking-widest text-reliance-navy">Attachment (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_EXTENSIONS}
                  onChange={(e) => onChange(e.target.files)}
                  {...fieldProps}
                  className="w-full md:max-w-md cursor-pointer file:text-reliance-navy file:font-bold file:uppercase file:tracking-widest border-reliance-navy rounded-none focus-visible:ring-reliance-navy"
                />
              </FormControl>
              <FormDescription className="text-reliance-navy/50 text-xs">
                Upload a screenshot or document (JPEG, PNG, WebP, GIF, PDF, DOC up to 5MB).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-reliance-navy/10 contact-stagger">
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto bg-reliance-navy hover:bg-reliance-gold hover:text-reliance-navy font-bold uppercase tracking-widest text-white rounded-none transition-colors border border-transparent hover:border-reliance-navy">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending Message...
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
      </Form>
    </div>
  );
};
