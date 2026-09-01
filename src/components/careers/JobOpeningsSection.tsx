"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowRight, Briefcase, Filter, X } from "lucide-react";
import type { Career } from "@/payload-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeneralApplicationModal } from "./GeneralApplicationModal";

interface JobOpeningsSectionProps {
  careers: Career[];
}

export const JobOpeningsSection: React.FC<JobOpeningsSectionProps> = ({ careers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Dynamically calculate unique departments and counts
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = { All: careers.length };
    careers.forEach((c) => {
      if (c.department) {
        counts[c.department] = (counts[c.department] || 0) + 1;
      }
    });
    return counts;
  }, [careers]);

  const departments = useMemo(() => {
    const set = new Set(careers.map((c) => c.department).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [careers]);

  const jobTypes = [
    { label: "All Types", value: "All" },
    { label: "Full-Time", value: "full-time" },
    { label: "Part-Time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];

  // Filter careers based on search, department, and type
  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesSearch =
        searchTerm === "" ||
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDepartment === "All" || career.department === selectedDepartment;

      const matchesType =
        selectedType === "All" || career.type === selectedType;

      return matchesSearch && matchesDept && matchesType;
    });
  }, [careers, searchTerm, selectedDepartment, selectedType]);

  const hasActiveFilters = searchTerm !== "" || selectedDepartment !== "All" || selectedType !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("All");
    setSelectedType("All");
  };

  return (
    <div id="openings" className="bg-white dark:bg-slate-900 py-16 lg:py-24 border-y border-reliance-navy/10">
      <div className="container mx-auto px-4 lg:px-16 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-2">
            Explore Opportunities
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-reliance-navy dark:text-white uppercase">
            Current Openings
          </h2>
          <p className="text-reliance-grey dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We are always interested in meeting talented professionals. Explore our latest job opportunities below and apply today.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-reliance-navy/50 dark:text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search position, keyword, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-10 h-14 rounded-none border-reliance-navy/30 focus-visible:ring-reliance-gold bg-reliance-offwhite dark:bg-slate-800 text-reliance-navy dark:text-white font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-reliance-grey hover:text-reliance-navy dark:hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Job Type Filter Select */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-14 px-4 bg-reliance-offwhite dark:bg-slate-800 border border-reliance-navy/30 focus:border-reliance-gold text-reliance-navy dark:text-white font-semibold uppercase tracking-wider text-xs rounded-none appearance-none cursor-pointer"
              >
                {jobTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <Filter className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-reliance-navy/50 pointer-events-none" />
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-reliance-navy/60 dark:text-slate-400 shrink-0 mr-2">
              Department:
            </span>
            {departments.map((dept) => {
              const count = departmentCounts[dept] || 0;
              const isSelected = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 rounded-none border ${
                    isSelected
                      ? "bg-reliance-navy text-white border-reliance-navy"
                      : "bg-reliance-offwhite dark:bg-slate-800 text-reliance-navy dark:text-slate-200 border-reliance-navy/20 hover:border-reliance-gold"
                  }`}
                >
                  <span>{dept}</span>
                  <span
                    className={`px-1.5 py-0.5 text-[10px] rounded-none ${
                      isSelected
                        ? "bg-reliance-gold text-reliance-navy font-black"
                        : "bg-reliance-navy/10 text-reliance-navy dark:bg-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Bar & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-reliance-navy/10 text-xs font-semibold uppercase tracking-wider text-reliance-grey">
            <div>
              Showing <span className="text-reliance-navy dark:text-white font-bold">{filteredCareers.length}</span> of{" "}
              <span className="text-reliance-navy dark:text-white font-bold">{careers.length}</span> open positions
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-reliance-gold hover:underline inline-flex items-center gap-1 font-bold"
              >
                <X className="w-3.5 h-3.5" /> Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Job Listings Grid */}
        {filteredCareers.length === 0 ? (
          <div className="text-center py-16 bg-reliance-offwhite dark:bg-slate-800 border border-reliance-navy/10 max-w-3xl mx-auto space-y-4">
            <Briefcase className="w-12 h-12 text-reliance-gold mx-auto" />
            <h3 className="text-xl font-bold text-reliance-navy dark:text-white uppercase">
              No Matching Positions Found
            </h3>
            <p className="text-reliance-grey dark:text-slate-300 text-sm max-w-md mx-auto">
              We couldn&apos;t find any open positions matching your search criteria. Try clearing your filters or submit your resume to our talent network for future openings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-reliance-navy text-reliance-navy rounded-none font-bold uppercase tracking-wider text-xs"
                >
                  Clear Filters
                </Button>
              )}

              <GeneralApplicationModal>
                <Button className="bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy rounded-none font-bold uppercase tracking-wider text-xs">
                  Join Talent Network
                </Button>
              </GeneralApplicationModal>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 max-w-5xl mx-auto">
            {filteredCareers.map((career) => (
              <div
                key={career.id}
                className="group flex flex-col md:flex-row md:items-center justify-between bg-reliance-offwhite dark:bg-slate-800 p-6 md:p-8 border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] hover:shadow-[12px_12px_0_0_#C9A84C] hover:-translate-y-1 transition-all duration-300 rounded-none"
              >
                <div className="space-y-3 mb-6 md:mb-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-block px-3 py-1 bg-reliance-gold/10 text-reliance-gold dark:bg-reliance-gold/20 text-xs font-bold uppercase tracking-widest border border-reliance-gold/30">
                      {career.department}
                    </span>
                    <span className="inline-block px-3 py-1 bg-reliance-navy/10 text-reliance-navy dark:bg-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-widest border border-reliance-navy/20">
                      {career.type ? career.type.replace("-", " ") : "Full Time"}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-reliance-navy dark:text-white group-hover:text-reliance-gold transition-colors uppercase">
                    {career.title}
                  </h3>
                  <div className="flex items-center text-reliance-grey dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <MapPin className="w-4 h-4 mr-1.5 text-reliance-navy dark:text-reliance-gold" />
                    {career.location}
                  </div>
                </div>

                <div className="md:pl-8 md:border-l border-reliance-navy/10 dark:border-slate-700 h-full flex items-center shrink-0">
                  <Link
                    href={`/careers/${career.slug}`}
                    className="inline-flex items-center justify-center bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors rounded-none w-full md:w-auto"
                  >
                    View Details & Apply <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
