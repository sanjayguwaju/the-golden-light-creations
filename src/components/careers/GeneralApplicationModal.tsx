"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle2, Upload, FileText, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const formSchema = z.object({
  applicantName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Valid phone number is required."),
  preferredDepartment: z.string().min(1, "Please select a preferred department."),
  coverLetter: z.string().optional(),
  cv: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "CV / Resume is required.")
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

const DEPARTMENTS = [
  "Production & Manufacturing",
  "Quality Assurance",
  "Research & Development",
  "Sales & Marketing",
  "Supply Chain & Logistics",
  "Finance & Administration",
  "Human Resources",
  "Customer Service",
  "Information Technology",
  "General / Any Department",
];

interface GeneralApplicationModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const GeneralApplicationModal: React.FC<GeneralApplicationModalProps> = ({
  children,
  isOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      email: "",
      phone: "",
      preferredDepartment: "General / Any Department",
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
      formData.append("preferredDepartment", values.preferredDepartment);
      formData.append("applicationType", "general");
      if (values.coverLetter) {
        formData.append("coverLetter", values.coverLetter);
      }

      toast.info("Uploading and submitting resume...");
      const res = await fetch("/api/careers/submit-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit resume. Please try again.");
      }

      setIsSuccess(true);
      toast.success("Resume submitted successfully to Reliance Paints Talent Network!");
    } catch (error: unknown) {
      toast.error((error as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    form.reset();
    setSelectedFile(null);
    setIsSuccess(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(resetState, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-white dark:bg-slate-900 border border-reliance-navy shadow-[12px_12px_0_0_#0D1B3E] rounded-none">
        {isSuccess ? (
          <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-reliance-gold/10 text-reliance-gold mx-auto flex items-center justify-center border border-reliance-gold">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-bold text-reliance-navy dark:text-white uppercase">
              Resume Received!
            </DialogTitle>
            <DialogDescription className="text-reliance-grey dark:text-slate-300 max-w-md mx-auto">
              Thank you for expressing interest in Reliance Paints. Our HR team will evaluate your profile and contact you when a relevant position opens up.
            </DialogDescription>
            <Button
              onClick={() => handleOpenChange(false)}
              className="bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy font-bold uppercase tracking-widest px-8 py-3 rounded-none transition-colors"
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-left border-b pb-4">
              <DialogTitle className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-reliance-navy dark:text-white">
                Join Our Talent Network
              </DialogTitle>
              <DialogDescription className="text-reliance-grey dark:text-slate-400">
                Submit your details and resume. We will keep your profile on file for future opportunities matching your qualifications.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
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
                        <Input placeholder="e.g. Ram Shrestha" className="rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold" {...field} />
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
                        <Input type="email" placeholder="ram@example.com" className="rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
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

                <FormField
                  control={form.control}
                  name="preferredDepartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-reliance-navy dark:text-slate-200 font-bold uppercase text-xs tracking-wider">
                        Preferred Department <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none border-reliance-navy/30 focus:ring-reliance-gold">
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none border-reliance-navy">
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* CV File Upload */}
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
                          accept=".pdf,.doc,.docx"
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
                          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-reliance-navy p-3 relative z-20">
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
                              Drag & Drop your resume here, or <span className="text-reliance-gold underline">Browse</span>
                            </p>
                            <FormDescription className="text-xs text-reliance-grey">
                              Supports PDF, DOC, DOCX formats up to 5MB
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
                      Cover Letter / Note (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us briefly about your background, career goals, or why you'd like to work at Reliance Paints..."
                        className="min-h-[100px] resize-none rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isSubmitting}
                  className="border-reliance-navy text-reliance-navy hover:bg-slate-100 rounded-none font-bold uppercase tracking-wider text-xs h-11 px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy rounded-none font-bold uppercase tracking-wider text-xs h-11 px-8 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Resume <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
