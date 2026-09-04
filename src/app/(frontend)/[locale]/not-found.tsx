import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 bg-white text-[#0A0A0A]">
      <div className="text-center max-w-2xl mx-auto relative flex flex-col items-center justify-center">
        {/* Background Large Text */}
        <h1 className="text-[140px] md:text-[220px] font-extralight leading-none tracking-tighter text-black/5 select-none font-serif">
          404
        </h1>

        {/* Foreground Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8 md:mt-16">
          <span className="text-[#C0171E] text-xs font-mono uppercase tracking-widest mb-3">
            Scene Not Found
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-[#0A0A0A] tracking-tight mb-4">
            Framed Out of Focus
          </h2>
          <p className="text-[#0A0A0A]/60 text-base md:text-lg font-light mb-8 max-w-md">
            {t("page-not-found") || "The page or visual story you are looking for has been relocated or does not exist."}
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C0171E] text-white font-semibold tracking-wider uppercase text-xs hover:bg-[#A01018] transition-all duration-300 rounded-full shadow-lg hover:shadow-2xl hover:scale-105"
          >
            {t("go-home") || "Return to Studio"}
          </Link>
        </div>
      </div>
    </div>
  );
}
