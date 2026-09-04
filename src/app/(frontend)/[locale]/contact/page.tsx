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
    <div className="bg-white text-[#0A0A0A] min-h-screen">
      {/* Breadcrumb Header: Red Background with White Text */}
      <div className="bg-[#C0171E] text-white pt-32 pb-14 sm:pb-16 px-4 sm:px-8 border-b border-[#A01018]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/70 uppercase mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white font-bold">Contact</span>
          </div>

          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#FFD04A] uppercase">
              Let&apos;s Connect
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#FFD04A]/60" />
          </div>

          <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-3 sm:mb-4 text-white">
            Contact &amp; <em className="text-[#FFD04A] not-italic">Bookings</em>
          </h1>
          <p className="font-poppins text-xs sm:text-base text-white/90 max-w-2xl font-light leading-relaxed">
            Ready to turn your vision into eternal cinema? Reach out directly via phone, WhatsApp, or
            submit your inquiry below. Our team is available 7 days a week.
          </p>
        </div>
      </div>

      {/* Luxury Contact & Booking Form (White background, black text) */}
      <StudioContact contact={settings.contact} />
    </div>
  );
}
