"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Valid phone number is required."),
  citizenship: z.string().min(2, "Citizenship number is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function ContractorRegistrationForm({ type }: { type: "contractor" | "painter" }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      citizenship: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contractor-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          type,
          status: "pending",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.errors?.[0]?.message || "Failed to submit application");
      }

      setIsSuccess(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-reliance-gold/10 border border-reliance-gold/30 rounded-lg text-center">
        <CheckCircle2 className="w-12 h-12 text-reliance-gold mb-4" />
        <h3 className="text-xl font-bold text-reliance-navy mb-2">Application Submitted!</h3>
        <p className="text-reliance-grey">
          Thank you for your interest in becoming a {type}. Our team will review your application and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">
                Full Name <span className="text-reliance-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">
                  Email Address <span className="text-reliance-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">
                  Phone Number <span className="text-reliance-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="citizenship"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">
                Citizenship Number <span className="text-reliance-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your citizenship number"
                  className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-none bg-reliance-gold text-reliance-navy hover:bg-reliance-navy hover:text-white transition-colors py-6 text-sm font-bold uppercase tracking-widest"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            `Submit Application`
          )}
        </Button>
      </form>
    </Form>
  );
}
