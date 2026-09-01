import type { Metadata } from "next";

import React from "react";
import { ContactUsClient } from "./ContactUsClient";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Mail, Phone, MapPin } from "lucide-react";
import { StoreLocator } from "@/components/home/StoreLocator";
import { BrandMarquee } from "@/components/home/BrandMarquee";

export function generateMetadata(): Metadata {
  const title = 'Contact Us | Reliance Paints'
  const description = 'Get in touch with Reliance Paints for general inquiries, product information, or dealer support.'
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://reliancepaints.com'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Reliance Paints',
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: 'Reliance Paints Contact' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const footerData = await payload.findGlobal({
    slug: "footer",
    depth: 1,
  });

  const contact = footerData?.contactInfo;
  const orgTitle = "Reliance Paints";
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://reliancepaints.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: orgTitle,
    url: siteUrl,
    description: 'Nepal\'s trusted paint manufacturer and retailer.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact?.location || 'Kathmandu, Nepal',
      addressCountry: 'NP',
    },
    telephone: contact?.phone,
    email: contact?.email,
    sameAs: [
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      process.env.NEXT_PUBLIC_SOCIAL_X,
    ].filter(Boolean),
  }

  return (
    <div className="min-h-screen bg-reliance-offwhite flex flex-col pt-12 md:pt-24 pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4 lg:px-16 max-w-[1440px]">
        <div className="mb-16 text-center space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold">Reach Out</p>
          <h1 className="text-4xl lg:text-5xl lg:text-7xl font-bold tracking-tight text-reliance-navy">Get in Touch.</h1>
          <p className="text-reliance-grey text-lg max-w-2xl mx-auto">
            We are here to assist you with all your painting needs. Contact {orgTitle} using the details below or fill out the form.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start mb-24">
          {/* Left Column: Reliance Paints Information */}
          <div className="lg:col-span-2 space-y-8 bg-white p-8 md:p-12 border border-reliance-navy h-full shadow-[8px_8px_0_0_#0D1B3E]">
            <div>
              <h2 className="text-2xl font-bold text-reliance-navy mb-2 uppercase tracking-wide">{orgTitle}</h2>
              <p className="text-muted-foreground text-sm font-medium">Premium Quality Paints</p>
            </div>
            
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-semibold border-b border-reliance-navy/10 pb-3">Contact Information</h3>
              
              {contact?.location && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-reliance-navy/10 text-reliance-navy rounded-none mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1 uppercase tracking-wider text-[11px]">Our Location</h4>
                    <p className="text-[15px] font-semibold whitespace-pre-line">{contact.location}</p>
                  </div>
                </div>
              )}
              
              {contact?.phone && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-reliance-navy/10 text-reliance-navy rounded-none mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1 uppercase tracking-wider text-[11px]">Phone Number</h4>
                    <p className="text-[15px] font-semibold" style={{ direction: "ltr" }}>{contact.phone}</p>
                  </div>
                </div>
              )}
              
              {contact?.email && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-reliance-navy/10 text-reliance-navy rounded-none mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1 uppercase tracking-wider text-[11px]">Email Address</h4>
                    <a href={`mailto:${contact.email}`} className="text-[15px] font-semibold hover:text-reliance-navy transition-colors">{contact.email}</a>
                  </div>
                </div>
              )}

              {contact?.branches && contact.branches.length > 0 && (
                <div className="pt-6 mt-6 border-t border-reliance-navy/10 space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase tracking-wider text-[11px]">Branch Offices</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {contact.branches.map((branch: any, idx: number) => (
                      <div key={idx} className="space-y-1.5">
                        <h5 className="font-bold text-reliance-navy text-[15px]">{branch.name}</h5>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{branch.location}</p>
                        {branch.phone && (
                          <div className="flex items-center gap-2 text-sm font-medium pt-1">
                            <Phone className="w-3.5 h-3.5 text-reliance-gold shrink-0" />
                            <span style={{ direction: "ltr" }}>{branch.phone}</span>
                          </div>
                        )}
                        {branch.email && (
                          <div className="flex items-center gap-2 text-sm font-medium pt-0.5">
                            <Mail className="w-3.5 h-3.5 text-reliance-gold shrink-0" />
                            <span>{branch.email}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3 bg-white w-full border border-reliance-navy p-6 md:p-12 shadow-[8px_8px_0_0_#0D1B3E]">
            <h3 className="text-2xl font-bold mb-8 text-reliance-navy uppercase tracking-tight">Send us a Message</h3>
            <ContactUsClient />
          </div>
        </div>
      </div>
      
      {/* Premium Blocks */}
      <BrandMarquee />
      <StoreLocator />
    </div>
  );
}
