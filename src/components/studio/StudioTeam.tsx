"use client";

import React from "react";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Sparkles,
  Camera,
  ExternalLink,
} from "lucide-react";
import type { FallbackTeamMember } from "@/utilities/studioDefaults";

interface StudioTeamProps {
  members?: FallbackTeamMember[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}

export function StudioTeam({
  members = [],
  title = "Meet The Artists Behind The Lens",
  subtitle = "A world-class collective of directors, cinematographers, portrait masters, and color scientists dedicated to immortalizing timeless emotion.",
  eyebrow = "The Creative Collective",
}: StudioTeamProps) {
  if (!members || members.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-black/5 relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(192,23,30,0.04) 0%, rgba(255,208,74,0.03) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#C0171E]/60" />
            <span className="font-montserrat text-xs font-bold tracking-[0.35em] text-[#C0171E] uppercase">
              {eyebrow}
            </span>
            <span className="w-8 h-[1px] bg-[#C0171E]/60" />
          </div>

          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-[#0A0A0A] uppercase tracking-[0.02em] leading-none mb-4 sm:mb-6">
            {title.includes("Artists") ? (
              <>
                Meet The <em className="text-[#C0171E] not-italic">Artists</em> Behind The Lens
              </>
            ) : (
              title
            )}
          </h2>

          <p className="font-poppins text-sm sm:text-base text-[#0A0A0A]/70 font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {members.map((member, index) => {
            const hasSocial =
              member.socialLinks &&
              (member.socialLinks.linkedin ||
                member.socialLinks.instagram ||
                member.socialLinks.twitter ||
                member.socialLinks.facebook ||
                member.socialLinks.email);

            return (
              <div
                key={member.id || index}
                className="group/card bg-white border border-[#C0171E]/15 hover:border-[#C0171E]/50 transition-all duration-500 hover:-translate-y-2 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(192,23,30,0.12)] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FFF5F5]">
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-105"
                    />

                    {/* Gradient Overlay for subtle cinematic polish */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover/card:opacity-30 transition-opacity duration-300" />

                    {/* Order / Index Number Stamp */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-[#C0171E] border border-[#C0171E]/20 shadow-sm">
                      0{index + 1}
                    </div>

                    {/* Social Bar Dock Overlay (visible on hover & focus on desktop, persistent floating on bottom of image) */}
                    {hasSocial && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-2 px-3 bg-white/95 backdrop-blur-md border border-[#C0171E]/20 shadow-lg translate-y-0 transition-all duration-300">
                        {member.socialLinks?.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="p-2 text-[#0A0A0A]/80 hover:text-white hover:bg-[#0077B5] rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}

                        {member.socialLinks?.instagram && (
                          <a
                            href={member.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="p-2 text-[#0A0A0A]/80 hover:text-white hover:bg-[#E4405F] rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                            title="Instagram"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}

                        {member.socialLinks?.twitter && (
                          <a
                            href={member.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on X (Twitter)`}
                            className="p-2 text-[#0A0A0A]/80 hover:text-white hover:bg-black rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                            title="Twitter / X"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}

                        {member.socialLinks?.facebook && (
                          <a
                            href={member.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Facebook`}
                            className="p-2 text-[#0A0A0A]/80 hover:text-white hover:bg-[#1877F2] rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                            title="Facebook"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}

                        {member.socialLinks?.email && (
                          <a
                            href={`mailto:${member.socialLinks.email}`}
                            aria-label={`Send direct email to ${member.name}`}
                            className="p-2 text-[#0A0A0A]/80 hover:text-white hover:bg-[#C0171E] rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                            title={`Email ${member.name}`}
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    {/* Role Badge */}
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF5F5] text-[#C0171E] text-[11px] font-montserrat font-bold tracking-widest uppercase border border-[#C0171E]/20">
                        <Camera className="w-3 h-3 text-[#C0171E]" />
                        {member.role}
                      </span>
                    </div>

                    {/* Member Name */}
                    <h3 className="font-bebas text-2xl sm:text-3xl text-[#0A0A0A] tracking-wider uppercase group-hover/card:text-[#C0171E] transition-colors mt-2">
                      {member.name}
                    </h3>

                    {/* Bio Statement */}
                    {member.bio && (
                      <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/75 font-light leading-relaxed mt-2.5 line-clamp-3">
                        {member.bio}
                      </p>
                    )}

                    {/* Specialties / Tags */}
                    {member.specialties && member.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-black/5">
                        {member.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center text-[10px] font-montserrat uppercase tracking-wider px-2 py-0.5 bg-[#FFF8F8] border border-[#C0171E]/10 text-[#0A0A0A]/70"
                          >
                            #{spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer with Direct Connect CTA */}
                <div className="px-6 pb-6 pt-0">
                  {member.socialLinks?.linkedin ? (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FFF5F5] hover:bg-[#0077B5] text-[#0A0A0A] hover:text-white border border-[#C0171E]/20 hover:border-[#0077B5] text-xs font-montserrat font-bold tracking-wider uppercase transition-all duration-200 group/btn"
                    >
                      <Linkedin className="w-4 h-4 text-[#0077B5] group-hover/btn:text-white transition-colors" />
                      <span>Connect on LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  ) : member.socialLinks?.email ? (
                    <a
                      href={`mailto:${member.socialLinks.email}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FFF5F5] hover:bg-[#C0171E] text-[#0A0A0A] hover:text-white border border-[#C0171E]/20 hover:border-[#C0171E] text-xs font-montserrat font-bold tracking-wider uppercase transition-all duration-200 group/btn"
                    >
                      <Mail className="w-4 h-4 text-[#C0171E] group-hover/btn:text-white transition-colors" />
                      <span>Contact Directly</span>
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
