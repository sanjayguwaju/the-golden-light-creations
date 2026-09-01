import React from "react";
import Link from "next/link";
import { ActionGallery } from "@/components/ActionGallery";
import {
  getInspirationSpaces,
  DESIGNER_PALETTES,
} from "@/utilities/inspirationData";
import {
  Sparkles,
  Eye,
  Calculator,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface InspirationGalleryBlockProps {
  isEnabled?: boolean;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  roomTypeFilter?: string | null;
  limit?: number | null;
  showFilters?: boolean | null;
  showDesignerPalettes?: boolean | null;
  showCtaBanners?: boolean | null;
  locale?: string;
}

export const InspirationGalleryBlock: React.FC<InspirationGalleryBlockProps> = async (
  props
) => {
  if (props.isEnabled === false) return null;

  const allSpaces = await getInspirationSpaces(props.locale || "en");
  const limit = typeof props.limit === "number" ? props.limit : 9;
  const initialRoom = props.roomTypeFilter || "all";

  const spaces =
    initialRoom !== "all"
      ? allSpaces.filter((s) => s.roomType === initialRoom).slice(0, limit)
      : allSpaces.slice(0, limit);

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-t border-reliance-navy/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          {props.title && (
            <p className="text-xs font-bold uppercase tracking-widest text-reliance-gold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {props.title}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy">
            {props.subtitle || "Discover Beautiful Spaces & Color Harmonies"}
          </h2>
          {props.description && (
            <p className="text-reliance-navy/70 text-base max-w-2xl mt-2 font-sans">
              {props.description}
            </p>
          )}
        </div>

        {/* Gallery */}
        <ActionGallery
          images={spaces}
          showFilters={props.showFilters !== false}
          initialRoomFilter={initialRoom}
        />

        {/* Optional Designer Palettes */}
        {props.showDesignerPalettes && (
          <div className="mt-20 pt-16 border-t border-reliance-navy/15">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-reliance-gold mb-2">
                Curated Harmonies
              </p>
              <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-reliance-navy">
                Designer Palette Pairings
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DESIGNER_PALETTES.map((pal) => (
                <div
                  key={pal.id}
                  className="bg-white border border-reliance-navy/15 p-6 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="px-2 py-0.5 bg-reliance-navy text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                      {pal.roomRecommendation}
                    </span>
                    <h4 className="text-xl font-display uppercase tracking-tight text-reliance-navy mb-1">
                      {pal.name}
                    </h4>
                    <p className="text-reliance-navy/70 text-xs font-sans mb-4">
                      {pal.tagline}
                    </p>

                    <div className="space-y-2">
                      {pal.colors.map((c) => (
                        <div
                          key={c.name}
                          className="flex items-center justify-between p-2 bg-[#FAF8F5] border border-reliance-navy/10"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 border border-reliance-navy/20 shrink-0"
                              style={{ backgroundColor: c.hexCode }}
                            />
                            <span className="text-xs font-bold text-reliance-navy">
                              {c.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-reliance-navy/50 uppercase font-mono">
                            {c.hexCode}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-reliance-navy/10">
                    <Link
                      href={`/visualiser?color=${pal.colors[0].slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-reliance-navy hover:text-reliance-gold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-reliance-gold" />
                      Try in Visualizer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional CTA Banners */}
        {props.showCtaBanners && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="bg-reliance-navy text-white p-8 border border-reliance-navy flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-reliance-gold text-xs font-bold uppercase tracking-wider mb-2">
                  <Eye className="w-3.5 h-3.5" />
                  Room Visualizer
                </span>
                <h3 className="text-2xl font-display uppercase tracking-tight text-white mb-2">
                  Test Colors on Your Walls
                </h3>
                <p className="text-white/80 text-xs font-sans leading-relaxed">
                  Upload photos of your rooms and test different paint shades in
                  real-time before purchasing.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/visualiser"
                  className="inline-flex items-center gap-2 bg-reliance-gold hover:bg-white text-reliance-navy px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all"
                >
                  Open Visualizer
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-[#ECE7DF] text-reliance-navy p-8 border border-reliance-navy/20 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-reliance-navy text-xs font-bold uppercase tracking-wider mb-2">
                  <Calculator className="w-3.5 h-3.5 text-reliance-gold" />
                  Paint Estimator
                </span>
                <h3 className="text-2xl font-display uppercase tracking-tight text-reliance-navy mb-2">
                  Calculate Paint Requirements
                </h3>
                <p className="text-reliance-navy/80 text-xs font-sans leading-relaxed">
                  Enter your room dimensions to receive accurate volume
                  estimates and download official PDF cost reports.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all"
                >
                  Estimate Paint
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
