"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle2, Upload, FileText, X } from "lucide-react";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;
const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx";

const formSchema = z.object({
  applicantName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Valid phone number is required."),
  coverLetter: z.string().optional(),
  cv: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "CV is required.")
    .refine(
      (files) => files && files.length > 0 && files[0].size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (files) =>
        files &&
        files.length > 0 &&
        ACCEPTED_MIME_TYPES.includes(files[0].type as (typeof ACCEPTED_MIME_TYPES)[number]),
      "Only PDF, DOC and DOCX formats are supported."
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface JobApplicationFormProps {
  careerId: string;
  jobType?: string;
  department?: string;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  careerId,
  jobType,
  department,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      if (!values.cv || values.cv.length === 0) {
        throw new Error("CV / Resume file is required.");
      }
      const file = values.cv[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("applicantName", values.applicantName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("appliedFor", careerId);
      if (jobType) formData.append("applicationType", jobType);
      if (department) formData.append("preferredDepartment", department);
      if (values.coverLetter) formData.append("coverLetter", values.coverLetter);

      toast.info("Uploading and submitting application...");
      const res = await fetch("/api/careers/submit-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit application. Please try again.");
      }

      setIsSuccess(true);
      toast.success("Application submitted successfully!");
    } catch (error: unknown) {
      toast.error((error as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center py-12 px-6 space-y-6 text-center animate-in fade-in zoom-in duration-500 bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-none">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-none flex items-center justify-center mb-2 border border-green-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-reliance-navy dark:text-white uppercase">Application Received!</h2>
        <p className="text-reliance-grey dark:text-slate-300 text-lg max-w-lg">
          Thank you for applying to Reliance Paints. Our HR team will review your qualifications and contact you if your profile matches our requirements.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] p-6 md:p-10 rounded-none">
      <h3 className="text-2xl md:text-3xl font-bold text-reliance-navy dark:text-white uppercase mb-2">
        Submit Your Application
      </h3>
      <p className="text-reliance-grey dark:text-slate-400 text-sm mb-8 border-b pb-4">
        Fill out the form below and attach your latest resume/CV. Fields marked with <span className="text-red-500">*</span> are required.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-reliance-navy dark:text-slate-200 font-bold uppercase text-xs tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" className="rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-reliance-navy dark:text-slate-200 font-bold uppercase text-xs tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" className="rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-reliance-navy dark:text-slate-200 font-bold uppercase text-xs tracking-wider">
                    Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+977-98XXXXXXXX" className="rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Drag & Drop File Upload Field */}
          <FormField
            control={form.control}
            name="cv"
            render={({ field: { value: _value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-reliance-navy dark:text-slate-200 font-bold uppercase text-xs tracking-wider">
                  Upload Resume / CV (PDF, DOC, DOCX - Max 5MB) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative border-2 border-dashed border-reliance-navy/30 hover:border-reliance-gold bg-reliance-offwhite dark:bg-slate-800/50 p-6 text-center transition-colors cursor-pointer group">
                    <Input
                      type="file"
                      accept={ACCEPTED_EXTENSIONS}
                      onChange={(e) => {
                        const files = e.target.files;
                        onChange(files);
                        if (files && files.length > 0) {
                          setSelectedFile(files[0]);
                        } else {
                          setSelectedFile(null);
                        }
                      }}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      {...fieldProps}
                    />

                    {selectedFile ? (
                      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-reliance-navy p-4 relative z-20">
                        <div className="flex items-center gap-3 truncate">
                          <FileText className="w-6 h-6 text-reliance-gold shrink-0" />
                          <div className="text-left truncate">
                            <p className="text-sm font-bold text-reliance-navy dark:text-white truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-reliance-grey">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            onChange(undefined);
                          }}
                          className="text-reliance-navy hover:text-red-600 p-1 h-auto"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 pointer-events-none">
                        <Upload className="w-8 h-8 text-reliance-navy group-hover:text-reliance-gold mx-auto transition-colors" />
                        <p className="text-sm font-bold text-reliance-navy dark:text-white uppercase tracking-wider">
                          Drag & Drop your CV here, or <span className="text-reliance-gold underline">Browse</span>
                        </p>
                        <FormDescription className="text-xs text-reliance-grey">
                          Supported formats: PDF, DOC, DOCX (Max size 5MB)
                        </FormDescription>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-reliance-navy dark:text-slate-200 font-bold uppercase text-xs tracking-wider">
                  Cover Letter (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you are a great fit for this role at Reliance Paints..."
                    className="min-h-[140px] resize-none rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy rounded-none h-14 text-sm font-bold uppercase tracking-widest transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Application...
                </>
              ) : (
                <>
                  Submit Application <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
