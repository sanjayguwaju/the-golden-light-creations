"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Eye, Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import type { FeedbackBlock as FeedbackBlockProps } from "@/payload-types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  address: z.string().min(2, "Address is required."),
  phone: z.string().min(10, "Valid phone number is required."),
  subject: z.enum([
    "general",
    "appointment",
    "feedback",
    "complaint",
    "emergency",
    "billing",
    "other",
  ]),
  message: z
    .string()
    .min(10, "Details must be at least 10 characters.")
    .max(250 * 5, "Maximum 250 words approx."),
});

type FormValues = z.infer<typeof formSchema>;

export const FeedbackBlock: React.FC<FeedbackBlockProps> = ({
  title = "Feedback",
  description,
  viewCount = 6727,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      subject: "feedback",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/common-form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email || undefined,
          phone: values.phone,
          address: values.address,
          subject: values.subject,
          message: values.message,
          source: "website",
        }),
      });

      const parsedRes = await response.json();
      if (!response.ok) {
        throw new Error(parsedRes.errors?.[0]?.message || "Failed to submit feedback.");
      }

      setTicketCode(parsedRes.doc.ticketCode);
      toast.success("Feedback sent successfully!");
      form.reset();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (ticketCode) {
    return (
      <div className="container max-w-4xl py-20 text-center">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-10 space-y-4">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
            Feedback Received!
          </h2>
          <p className="text-green-600 dark:text-green-300">
            Thank you for your feedback. Your ticket code is <strong>{ticketCode}</strong>.
          </p>
          <Button variant="outline" onClick={() => setTicketCode(null)} className="mt-4">
            Send Another Feedback
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb Section */}
      <div className="bg-muted py-3">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-primary hover:underline">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container py-8 max-w-6xl">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1 text-foreground font-medium cursor-pointer">
                          Name :<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            {...field}
                            className="bg-background border-input rounded-md focus:ring-green-500 focus:border-green-500"
                          />
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
                      <FormItem>
                        <FormLabel className="flex gap-1 text-foreground font-medium cursor-pointer">
                          Email:<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email:"
                            {...field}
                            className="bg-background border-input rounded-md focus:ring-green-500 focus:border-green-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address - Full Width */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="flex gap-1 text-foreground font-medium cursor-pointer">
                          Address:<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Address"
                            {...field}
                            className="bg-background border-input rounded-md focus:ring-green-500 focus:border-green-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Office Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1 text-foreground font-medium cursor-pointer">
                          Office Phone: <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Office Phone:"
                            {...field}
                            className="bg-background border-input rounded-md focus:ring-green-500 focus:border-green-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1 text-foreground font-medium cursor-pointer">
                          Type:<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-input rounded-md">
                              <SelectValue placeholder="Choose..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="appointment">Appointment</SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Details - Full Width */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="flex gap-1 text-foreground font-medium cursor-pointer">
                          Details:<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please write in a maximum of 250 words."
                            className="min-h-[150px] bg-background border-input rounded-md focus:ring-green-500 focus:border-green-500 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded font-medium transition-colors h-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* View Count Section */}
        <div className="flex justify-end items-center gap-1 text-green-600 dark:text-green-500 mt-8 text-sm font-medium">
          <Eye className="w-4 h-4" />
          <span>{viewCount}</span>
        </div>
      </div>
    </div>
  );
};
