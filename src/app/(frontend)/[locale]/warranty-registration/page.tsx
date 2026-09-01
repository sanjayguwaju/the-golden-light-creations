import type { Metadata } from "next";
import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { WarrantyRegistrationForm } from "@/components/warranty/WarrantyRegistrationForm";
import type { Product, Store } from "@/payload-types";

export function generateMetadata(): Metadata {
  const title = "Warranty Registration | Reliance Paints";
  const description =
    "Register your Reliance Paints products to activate your warranty. Secure your purchase and get peace of mind with our quality guarantee.";
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://reliancepaints.com";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Reliance Paints",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Reliance Paints Warranty Registration",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  // Fetch all active products for the dropdown
  const { docs: products } = await payload.find({
    collection: "products",
    sort: "title",
    depth: 0,
    limit: 1000,
  });

  // Fetch all stores (dealers) for the dropdown
  const { docs: stores } = await payload.find({
    collection: "stores",
    sort: "storeName",
    depth: 0,
    limit: 1000,
    select: {
      id: true,
      storeName: true,
    },
  });

  // Fetch contact details from SiteSettings and Footer globals
  const [siteSettings, footerData] = await Promise.all([
    payload.findGlobal({ slug: "site-settings" }).catch(() => null),
    payload.findGlobal({ slug: "footer" }).catch(() => null),
  ]);

  const supportPhone =
    siteSettings?.contactDetails?.phone ||
    footerData?.contactInfo?.phone ||
    "+977 1 4444444";
  const supportEmail =
    siteSettings?.contactDetails?.email ||
    footerData?.contactInfo?.email ||
    "info@reliancepaints.com";

  return (
    <div className="min-h-screen bg-reliance-offwhite flex flex-col pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-reliance-gold/10 text-reliance-gold rounded-none border border-reliance-navy shadow-[4px_4px_0_0_#0D1B3E] mb-4">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-reliance-navy uppercase">
            Warranty Registration
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Protect your investment and guarantee the quality of your Reliance Paints products by
            registering your warranty below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Benefits & Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] p-8 rounded-none">
              <h3 className="text-xl font-bold text-reliance-navy mb-6 border-b border-reliance-navy/10 pb-4 uppercase tracking-widest">
                Why Register?
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 text-[#C9A84C]">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-reliance-navy">Quality Assurance</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ensure your paint products meet our high standards for durability and color
                      retention.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 text-[#C9A84C]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-reliance-navy">Faster Support</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Registered products get priority customer service and faster resolution for
                      any issues.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 text-[#C9A84C]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-reliance-navy">Complete Protection</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Activate your full warranty coverage against peeling, fading, or manufacturing
                      defects.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-reliance-navy text-white p-8 rounded-none shadow-[8px_8px_0_0_#C9A84C] relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay"></div>
               <div className="relative z-10">
                 <h4 className="text-lg font-bold mb-2 text-reliance-gold uppercase tracking-widest">Need Help?</h4>
                 <p className="text-sm text-white/80 mb-4 font-light">
                   If you are having trouble registering your warranty or can&apos;t find your batch
                   number, please contact our support team.
                 </p>
                  <a
                    href={`tel:${supportPhone.replace(/\s+/g, "")}`}
                    className="font-bold tracking-widest text-lg hover:text-reliance-gold transition-colors block"
                  >
                    {supportPhone}
                  </a>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="font-bold text-reliance-gold mt-1 hover:underline transition-colors block text-sm sm:text-base"
                  >
                    {supportEmail}
                  </a>
               </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-8">
            <WarrantyRegistrationForm products={products as Product[]} stores={stores as Store[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
