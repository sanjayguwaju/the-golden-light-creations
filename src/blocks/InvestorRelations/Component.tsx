"use client";

import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { 
  Building2, 
  FileText, 
  Download, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Mail, 
  Phone, 
  ExternalLink,
  Filter
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RichText from "@/components/RichText";

type ReportItem = {
  title: string;
  year: number;
  type: "annual" | "quarterly" | "financial" | "presentation" | "press" | string;
  fileUrl?: string;
  file?: any;
};

type Props = {
  heroTitle?: string;
  heroSubtitle?: string;
  overviewTitle?: string;
  overviewContent?: any;
  reportsSectionTitle?: string;
  reports?: ReportItem[];
};

export const InvestorRelationsBlock: React.FC<Props> = ({
  heroTitle = "Investor Relations",
  heroSubtitle = "Explore Reliance Paints corporate governance, financial reports, annual disclosures, and investor information.",
  overviewTitle = "Company Overview & Strategic Growth",
  overviewContent,
  reportsSectionTitle = "Financial Statements & Annual Reports",
  reports = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // GSAP Entrance Animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".ir-hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".ir-hero-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".ir-hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".ir-stat-card", { y: 30, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.3");
    },
    { scope: containerRef }
  );

  // Available Years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(reports.map((r) => r.year).filter(Boolean)));
    return years.sort((a, b) => b - a);
  }, [reports]);

  // Filtered Reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesYear = selectedYear === "all" || String(r.year) === selectedYear;
      const matchesType = selectedType === "all" || r.type === selectedType;
      return matchesYear && matchesType;
    });
  }, [reports, selectedYear, selectedType]);

  const defaultReports: ReportItem[] = reports && reports.length > 0 ? reports : [
    {
      title: "Annual Report FY 2024-25",
      year: 2025,
      type: "annual",
      fileUrl: "/documents/reliance-annual-report-2024-25.pdf",
    },
    {
      title: "Audited Financial Statements FY 2023-24",
      year: 2024,
      type: "financial",
      fileUrl: "/documents/reliance-financials-2023-24.pdf",
    },
    {
      title: "Corporate Presentation & Growth Outlook 2024",
      year: 2024,
      type: "presentation",
      fileUrl: "/documents/reliance-corporate-presentation-2024.pdf",
    },
    {
      title: "Annual Report FY 2022-23",
      year: 2023,
      type: "annual",
      fileUrl: "/documents/reliance-annual-report-2022-23.pdf",
    },
  ];

  const displayReports = reports && reports.length > 0 ? filteredReports : defaultReports;

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="relative bg-reliance-navy text-white pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-reliance-gold rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-reliance-red rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-reliance-gold font-semibold">Investor Relations</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="ir-hero-badge inline-flex items-center gap-2 bg-reliance-gold/15 border border-reliance-gold/30 px-3.5 py-1 text-reliance-gold text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Governance & Transparency</span>
            </div>

            <h1 className="ir-hero-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heroTitle}
            </h1>

            <p className="ir-hero-sub text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* KPI Performance Highlights */}
      <section className="-mt-10 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="ir-stat-card bg-white p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Heritage</span>
              <div className="p-2 bg-reliance-navy/5 text-reliance-navy">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-reliance-navy">30+ Years</p>
            <p className="text-xs text-slate-500 mt-1">Pioneering coatings in Nepal</p>
          </div>

          <div className="ir-stat-card bg-white p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Manufacturing</span>
              <div className="p-2 bg-reliance-gold/10 text-reliance-gold">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-reliance-navy">ISO 9001:2015</p>
            <p className="text-xs text-slate-500 mt-1">Certified modern automated plant</p>
          </div>

          <div className="ir-stat-card bg-white p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Distribution</span>
              <div className="p-2 bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-reliance-navy">500+ Outlets</p>
            <p className="text-xs text-slate-500 mt-1">Nationwide dealer network</p>
          </div>

          <div className="ir-stat-card bg-white p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Compliance</span>
              <div className="p-2 bg-blue-50 text-blue-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-reliance-navy">100% NS Mark</p>
            <p className="text-xs text-slate-500 mt-1">Nepal Standard certified products</p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Company Overview Section */}
        <div className="bg-white p-8 md:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-reliance-gold">
              Corporate Overview
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-reliance-navy">
              {overviewTitle}
            </h2>
          </div>

          {overviewContent ? (
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              <RichText data={overviewContent} />
            </div>
          ) : (
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                Reliance Paints Pvt. Ltd. stands as one of Nepal’s foremost paint and coating manufacturers. Founded on principles of unwavering quality, environmental stewardship, and cutting-edge polymer chemistry, we develop exterior emulsions, luxury interior paints, weather-resistant primers, and protective enamels engineered specifically to endure the Himalayas’ unique climate.
              </p>
              <p>
                Our state-of-the-art manufacturing facility in Birgunj features computerized color tinting, advanced automated dispersion units, and rigorous in-house quality testing laboratories. We maintain transparent corporate disclosures, sustainable manufacturing standards, and consistent shareholder value creation.
              </p>
            </div>
          )}
        </div>

        {/* Reports & Disclosures Section */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-reliance-gold">
                Financial Filings
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-reliance-navy">
                {reportsSectionTitle}
              </h2>
            </div>

            {/* Filter controls */}
            {availableYears.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Year:
                </span>
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-3 py-1 text-xs font-bold transition-colors ${
                    selectedYear === "all"
                      ? "bg-reliance-navy text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  All
                </button>
                {availableYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(String(yr))}
                    className={`px-3 py-1 text-xs font-bold transition-colors ${
                      selectedYear === String(yr)
                        ? "bg-reliance-navy text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReports.map((report, idx) => {
              const downloadUrl = report.file?.url || report.fileUrl || "#";
              return (
                <div
                  key={idx}
                  className="group bg-white p-6 border border-slate-200 hover:border-reliance-gold shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-reliance-navy/5 text-reliance-navy text-[11px] font-extrabold uppercase tracking-wider">
                        {report.type || "Annual Report"}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {report.year}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 border border-slate-100 inline-block text-reliance-navy group-hover:bg-reliance-navy group-hover:text-white transition-colors">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-reliance-navy group-hover:text-reliance-gold transition-colors leading-snug">
                        {report.title}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-reliance-navy text-reliance-navy hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Document
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investor Contact CTA */}
        <div className="bg-reliance-navy text-white p-8 md:p-12 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-reliance-gold">
              Stakeholder Relations
            </span>
            <h3 className="text-2xl font-bold text-white">
              Have Inquiries or Need Financial Disclosures?
            </h3>
            <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
              Our corporate secretariat and investor desk is available for official inquiries, annual reports, and investor relations information.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 bg-reliance-gold hover:bg-reliance-gold/90 text-reliance-navy text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-xs"
            >
              <Mail className="w-4 h-4" />
              Contact Investor Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
