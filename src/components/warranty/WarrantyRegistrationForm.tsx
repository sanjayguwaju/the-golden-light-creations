"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product, Store } from "@/payload-types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
] as const;
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp,.gif,.pdf";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Valid phone number is required."),
  productPurchased: z.string().min(1, "Please select a product."),
  batchNumber: z.string().min(2, "Batch number is required."),
  purchaseDate: z.string().min(1, "Purchase date is required."),
  dealerInfo: z.string().min(2, "Please enter the store or dealer name."),
  volume: z.string().min(1, "Please enter the volume (e.g. 4L, 10L)."),
  invoice: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Invoice is required.")
    .refine(
      (files) => files && files.length > 0 && files[0].size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (files) =>
        files &&
        files.length > 0 &&
        ACCEPTED_MIME_TYPES.includes(files[0].type as (typeof ACCEPTED_MIME_TYPES)[number]),
      "Only JPG, PNG, WEBP, GIF, and PDF formats are supported."
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface WarrantyRegistrationFormProps {
  products: Product[];
  stores: Store[];
}

export const WarrantyRegistrationForm: React.FC<WarrantyRegistrationFormProps> = ({
  products,
  stores,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      productPurchased: "",
      batchNumber: "",
      purchaseDate: "",
      dealerInfo: "",
      volume: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Step 1: Upload Invoice
      if (!values.invoice || values.invoice.length === 0) {
        throw new Error("Invoice file is required");
      }
      const file = values.invoice[0];
      const formData = new FormData();
      formData.append("file", file);

      // Pass Payload CMS file metadata
      formData.append(
        "_payload",
        JSON.stringify({
          title: `Invoice - ${values.customerName}`,
          fileCategory: "warranty_invoice",
          uploadedFrom: "common-form-submissions",
          isPrivate: true,
        })
      );

      toast.info("Uploading invoice...");
      const fileRes = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!fileRes.ok) {
        const err = await fileRes.json();
        throw new Error(err?.errors?.[0]?.message || "Invoice upload failed");
      }

      const fileData = await fileRes.json();
      const fileId = fileData.doc.id;

      // Step 2: Submit Warranty Registration
      toast.info("Submitting registration...");
      const appRes = await fetch("/api/warranties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: values.customerName,
          email: values.email,
          phone: values.phone,
          productPurchased: values.productPurchased,
          batchNumber: values.batchNumber,
          purchaseDate: new Date(values.purchaseDate).toISOString(),
          dealerInfo: values.dealerInfo,
          volume: values.volume,
          invoice: fileId,
          status: "pending",
        }),
      });

      if (!appRes.ok) {
        const parsedRes = await appRes.json();
        throw new Error(parsedRes.errors?.[0]?.message || "Failed to submit registration.");
      }

      setIsSuccess(true);
      toast.success("Warranty registered successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: unknown) {
      toast.error((error as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center py-16 px-6 space-y-6 text-center animate-in fade-in zoom-in duration-500 bg-white border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] rounded-none">
        <div className="w-24 h-24 bg-reliance-gold/10 text-reliance-gold flex items-center justify-center mb-4 border border-reliance-navy shadow-[4px_4px_0_0_#0D1B3E]">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-reliance-navy uppercase tracking-widest">Registration Successful!</h2>
        <p className="text-reliance-grey text-lg max-w-xl">
          Thank you for registering your product warranty. Your submission is currently pending verification. You will be contacted via email once your warranty is activated.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-6 rounded-none border-reliance-navy text-reliance-navy font-bold uppercase tracking-widest hover:bg-reliance-navy hover:text-white"
        >
          Register Another Product
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] p-6 md:p-10 rounded-none">
      <h3 className="text-2xl font-bold text-reliance-navy mb-8 border-b border-reliance-navy/10 pb-4 uppercase tracking-widest">
        Warranty Details
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Full Name <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold" {...field} />
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
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Email Address <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold" {...field} />
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
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Phone Number <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="+977-XXXXXXXXXX" className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Purchase Date <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input type="date" className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-reliance-navy/10">
            <FormField
              control={form.control}
              name="productPurchased"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Product Purchased <span className="text-reliance-red">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-none border-reliance-navy focus:ring-reliance-gold">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none border-reliance-navy">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Liters / Volume <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. 4L, 10L, 20L" className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="batchNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Batch Number <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. BT-2023-XYZ" className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs text-reliance-grey">You can find this on the product packaging.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dealerInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Purchased From (Dealer/Store) <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter store name..." className="rounded-none border-reliance-navy focus-visible:ring-reliance-gold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4 border-t border-reliance-navy/10">
            <FormField
              control={form.control}
              name="invoice"
              render={({ field: { value: _value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-reliance-navy uppercase tracking-widest">Upload Invoice / Bill <span className="text-reliance-red">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={ACCEPTED_EXTENSIONS}
                      onChange={(e) => onChange(e.target.files)}
                      className="w-full cursor-pointer file:text-reliance-navy file:font-bold rounded-none border-reliance-navy focus-visible:ring-reliance-gold"
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-reliance-grey">
                    Upload a clear image or PDF of your purchase receipt (Max 5MB).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-reliance-navy hover:bg-reliance-gold text-white rounded-none h-14 text-sm font-bold uppercase tracking-widest transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Registering Warranty...
                </>
              ) : (
                <>
                  Register Warranty <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
