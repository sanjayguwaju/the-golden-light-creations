"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { 
  getPaintableAreaDetails, 
  calculatePaintRequirement, 
  getPackRecommendations, 
  calculatePackPrices,
  calculateTotalCost,
  SurfaceCondition,
  SURFACE_LABELS,
  Unit 
} from "@/utilities/calculatorLogic";
import type { PDFData } from "@/components/calculator/EstimatePDF";
import { ArrowRight, Calculator } from "lucide-react";

const PDFDownloadButton = dynamic(
  () => import("@/components/calculator/PDFDownloadButton"),
  { ssr: false }
);

interface PaintCalculatorProps {
  sectionLabel?: string;
  title?: string;
  subheading?: string;
}

export const PaintCalculatorSection: React.FC<PaintCalculatorProps> = ({
  sectionLabel,
  title,
  subheading,
}) => {
  const [unit, setUnit] = useState<Unit>("metres");
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.8);
  const [coats, setCoats] = useState<1 | 2 | 3>(2);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [surface, setSurface] = useState<SurfaceCondition>("smooth");
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculation = useMemo(() => {
    const area = getPaintableAreaDetails(
      length,
      width,
      height,
      doors,
      windows,
      includeCeiling,
      unit
    );

    // Standard Premium Emulsion spread rate: ~180 sq.ft/L/coat
    const coverageRate = 180;
    const basePricePerLitre = 550;

    const paintReq = calculatePaintRequirement(
      area.netPaintableSqFt,
      coverageRate,
      coats,
      surface,
      true
    );

    const packPrices = calculatePackPrices(basePricePerLitre);
    const packs = getPackRecommendations(paintReq.totalLitres, packPrices);
    const totalCost = calculateTotalCost(packs, packPrices);

    return {
      area,
      paintReq,
      packs,
      packPrices,
      totalCost,
      coverageRate,
      basePricePerLitre,
    };
  }, [length, width, height, doors, windows, includeCeiling, unit, coats, surface]);

  const [referenceId] = useState(() => `RP-HOME-${Math.floor(100000 + Math.random() * 900000)}`);
  const [generatedDate] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const pdfData = useMemo((): PDFData => {
    return {
      referenceId,
      generatedDate,
      dimensions: {
        length,
        width,
        height,
        doors,
        windows,
        includeCeiling,
        surfaceCondition: surface,
        surfaceLabel: SURFACE_LABELS[surface],
        coats,
        unit: unit === "feet" ? "ft" : "m",
      },
      area: calculation.area,
      results: {
        product: {
          title: "Reliance Premium Acrylic Emulsion",
          pricePerLitre: calculation.basePricePerLitre,
          coverageRate: calculation.coverageRate,
        },
        paintableArea: calculation.area.netPaintableSqFt,
        baseLitres: calculation.paintReq.baseLitres,
        bufferLitres: calculation.paintReq.bufferLitres,
        totalLitres: calculation.paintReq.totalLitres,
        primerLitres: calculation.paintReq.primerLitres,
        packs: calculation.packs,
        packPrices: calculation.packPrices,
        totalCost: calculation.totalCost,
      },
    };
  }, [length, width, height, doors, windows, includeCeiling, unit, coats, surface, calculation, referenceId, generatedDate]);

  return (
    <section className="py-12 md:py-24 bg-reliance-offwhite">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">
            {sectionLabel || "Paint Calculator"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4">
            {title || "Calculate Your Requirements"}
          </h2>
          <p className="text-lg text-reliance-grey">
            {subheading || "Get an accurate, realistic estimate — live as you type."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Inputs */}
          <div className="bg-white p-6 md:p-8 border border-reliance-navy space-y-6">
            {/* Unit Toggle */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-xs font-bold text-reliance-navy uppercase tracking-widest">
                Measurement Unit
              </span>
              <div className="flex bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setUnit("metres")}
                  className={`px-4 py-1.5 text-xs font-bold uppercase transition-all ${
                    unit === "metres"
                      ? "bg-reliance-navy text-white"
                      : "text-reliance-navy hover:text-reliance-gold"
                  }`}
                >
                  Metres (m)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("feet")}
                  className={`px-4 py-1.5 text-xs font-bold uppercase transition-all ${
                    unit === "feet"
                      ? "bg-reliance-navy text-white"
                      : "text-reliance-navy hover:text-reliance-gold"
                  }`}
                >
                  Feet (ft)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sliders */}
              {[
                { 
                  label: "Room Length", 
                  value: length, 
                  set: setLength, 
                  min: unit === "metres" ? 2 : 6, 
                  max: unit === "metres" ? 15 : 50, 
                  step: unit === "metres" ? 0.5 : 1, 
                  unitLabel: unit === "metres" ? "m" : "ft" 
                },
                { 
                  label: "Room Width",  
                  value: width,  
                  set: setWidth,  
                  min: unit === "metres" ? 2 : 6, 
                  max: unit === "metres" ? 15 : 50, 
                  step: unit === "metres" ? 0.5 : 1, 
                  unitLabel: unit === "metres" ? "m" : "ft" 
                },
                { 
                  label: "Ceiling Height", 
                  value: height, 
                  set: setHeight, 
                  min: unit === "metres" ? 2.2 : 7, 
                  max: unit === "metres" ? 5 : 18, 
                  step: unit === "metres" ? 0.1 : 0.5, 
                  unitLabel: unit === "metres" ? "m" : "ft" 
                },
              ].map(({ label, value, set, min, max, step, unitLabel }) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-reliance-navy uppercase tracking-widest">{label}</label>
                    <span className="text-sm font-bold text-reliance-navy">{value} {unitLabel}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => set(Number(e.target.value))}
                    className="w-full h-2 appearance-none cursor-pointer bg-reliance-navy/20 accent-reliance-navy"
                  />
                  <div className="flex justify-between text-[10px] text-reliance-navy/40 font-mono">
                    <span>{min}{unitLabel}</span><span>{max}{unitLabel}</span>
                  </div>
                </div>
              ))}

              {/* Surface type */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-reliance-navy uppercase tracking-widest">Surface Condition</label>
                <select
                  value={surface}
                  onChange={(e) => setSurface(e.target.value as SurfaceCondition)}
                  className="w-full border border-reliance-navy px-4 py-3 text-xs font-bold uppercase tracking-widest text-reliance-navy focus:outline-none focus:ring-1 focus:ring-reliance-navy bg-transparent appearance-none rounded-none cursor-pointer"
                >
                  <option value="smooth">Smooth / Repaint (1.0x)</option>
                  <option value="fresh_plaster">Fresh Plaster (+15% paint)</option>
                  <option value="rough_textured">Rough / Textured (+30% paint)</option>
                </select>
              </div>

              {/* Doors / Windows */}
              {[
                { label: "Doors", value: doors, set: setDoors },
                { label: "Windows", value: windows, set: setWindows },
              ].map(({ label, value, set }) => (
                <div key={label} className="space-y-2">
                  <label className="block text-xs font-bold text-reliance-navy uppercase tracking-widest">{label}</label>
                  <div className="flex items-center justify-between bg-white border border-reliance-navy p-1">
                    <button
                      type="button"
                      onClick={() => set(Math.max(0, value - 1))}
                      className="w-10 h-10 border border-reliance-navy flex items-center justify-center font-bold text-reliance-navy hover:bg-reliance-navy hover:text-white transition-colors"
                    >–</button>
                    <span className="font-bold text-lg text-reliance-navy">{value}</span>
                    <button
                      type="button"
                      onClick={() => set(value + 1)}
                      className="w-10 h-10 border border-reliance-navy flex items-center justify-center font-bold text-reliance-navy hover:bg-reliance-navy hover:text-white transition-colors"
                    >+</button>
                  </div>
                </div>
              ))}

              {/* Coats */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-reliance-navy uppercase tracking-widest">Number of Coats</label>
                <div className="flex gap-px bg-reliance-navy border border-reliance-navy">
                  {[1, 2, 3].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCoats(c as 1 | 2 | 3)}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                        coats === c
                          ? "bg-reliance-navy text-white"
                          : "bg-white text-reliance-navy hover:bg-reliance-offwhite"
                      }`}
                    >
                      {c} Coat{c > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ceiling Checkbox */}
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100/80 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeCeiling}
                    onChange={(e) => setIncludeCeiling(e.target.checked)}
                    className="w-4 h-4 text-reliance-navy accent-reliance-navy cursor-pointer"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-reliance-navy">
                    Include Ceiling (+{Math.round(length * width * (unit === 'metres' ? 10.764 : 1))} sq.ft)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="bg-reliance-navy text-white p-6 md:p-8 sticky top-24 border border-reliance-navy shadow-lg">
            <div className="flex justify-between items-center mb-6 border-b border-reliance-gold/30 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-reliance-gold">Realistic Estimate</h3>
              <span className="text-[11px] text-white/60 font-mono">180 sq.ft/L spread</span>
            </div>

            <div className="space-y-px bg-white/20 border border-white/20 mb-6">
              {[
                { label: "Net Paintable Area", value: `${calculation.area.netPaintableSqFt} sq.ft (${calculation.area.netPaintableSqM} m²)` },
                { label: "Total Paint Required", value: `${calculation.paintReq.totalLitres} Litres` },
                { label: "Base Paint Needed", value: `${calculation.paintReq.baseLitres} Litres` },
                { label: "Recommended Buffer", value: `+${calculation.paintReq.bufferLitres} Litres (10%)` },
                { label: "Coats Selected", value: `${coats} Coat${coats > 1 ? 's' : ''}` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center bg-reliance-navy px-4 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">{r.label}</span>
                  <span className="font-bold text-reliance-gold text-xs">{r.value}</span>
                </div>
              ))}
            </div>

            {/* Pack summary */}
            <div className="bg-white/10 p-3 mb-6 border border-white/10 text-xs">
              <span className="text-white/70 block mb-1 font-bold uppercase tracking-wider text-[10px]">Optimal Pack Selection:</span>
              <div className="text-white font-semibold flex flex-wrap gap-2">
                {calculation.packs[20] > 0 && <span>{calculation.packs[20]}x 20L Drum</span>}
                {calculation.packs[10] > 0 && <span>{calculation.packs[10]}x 10L Bucket</span>}
                {calculation.packs[4] > 0 && <span>{calculation.packs[4]}x 4L Gallon</span>}
                {calculation.packs[1] > 0 && <span>{calculation.packs[1]}x 1L Tin</span>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isClient && (
                <PDFDownloadButton 
                  data={pdfData} 
                  className="w-full flex items-center justify-center gap-2 border border-reliance-gold bg-reliance-gold text-reliance-navy py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-reliance-gold transition-colors cursor-pointer"
                />
              )}

              <Link
                href="/calculator"
                className="w-full flex items-center justify-center gap-2 border border-white/30 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-reliance-navy transition-colors text-center"
              >
                <Calculator className="w-4 h-4" />
                Open Full Calculator
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-[9px] text-white/50 leading-relaxed mt-4 text-center">
              * Coverage calculations follow standard technical data sheets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

