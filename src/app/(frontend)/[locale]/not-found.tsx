import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center px-4 bg-white">
      <div className="text-center max-w-2xl mx-auto relative flex flex-col items-center justify-center">
        {/* Background Large Text */}
        <h1 className="text-[150px] md:text-[220px] font-extrabold leading-none tracking-tighter text-reliance-navy/5 select-none">
          404
        </h1>
        
        {/* Foreground Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-12 md:mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-reliance-navy tracking-tight mb-3">
            Oops!
          </h2>
          <p className="text-gray-500 text-lg font-medium mb-8">
            {t("page-not-found")}
          </p>
          
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-3.5 bg-reliance-navy text-white font-semibold tracking-wide hover:bg-reliance-gold transition-all duration-300 rounded-none shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("go-home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
