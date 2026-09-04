import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { StudioContact } from "@/components/studio/StudioContact";
import { getStudioSettings } from "@/utilities/getStudioData";

export const metadata: Metadata = {
  title: "Book a Shoot & Contact | The Golden Light Creations",
  description:
    "Contact The Golden Light Creations in Kathmandu, Nepal. Book wedding photography, cinematic films, drone coverage, and commercial branding.",
};

export default async function ContactPage() {
  const settings = await getStudioSettings();

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-28">
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/50 uppercase mb-4 sm:mb-6">
          <Link href="/" className="hover:text-[#F5B301] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#F5B301]" />
          <span className="text-[#F5B301]">Contact</span>
        </div>

        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
            Let&apos;s Connect
          </span>
          <span className="w-8 sm:w-10 h-[1px] bg-[#F5B301]/60" />
        </div>

        <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-3 sm:mb-4">
          Contact &amp; <em className="text-[#F5B301] not-italic">Bookings</em>
        </h1>
        <p className="font-poppins text-xs sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
          Ready to turn your vision into eternal cinema? Reach out directly via phone, WhatsApp, or
          submit your inquiry below. Our team is available 7 days a week.
        </p>
      </div>

      {/* Luxury Contact & Booking Form */}
      <StudioContact contact={settings.contact} />
    </div>
  );
}
