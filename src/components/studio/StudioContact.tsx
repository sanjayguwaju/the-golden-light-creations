"use client";

import React, { useState } from "react";
import { Phone, MapPin, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { defaultStudioSettings } from "@/utilities/studioDefaults";
import { ShineBorder } from "@/components/magicui";

interface StudioContactProps {
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    whatsappNumber?: string;
  };
}

export function StudioContact({ contact = defaultStudioSettings.contact }: StudioContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Wedding Photography & Film",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/contact-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          source: "Website Booking Form",
        }),
      });
    } catch (err) {
      console.warn("Contact submission endpoint notice:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "Wedding Photography & Film",
        message: "",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const cleanPhone = contact.phone || "+977 9810175322";
  const whatsappNum = contact.whatsappNumber || "9779810175322";
  const emailAddr = contact.email || "info@thegoldenlightcreations.com";
  const addressText = contact.address || "Kathmandu, Nepal";

  return (
    <section id="contact" className="bg-[#F5F5F5] text-[#0A0A0A] py-20 sm:py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Contact Coordinates */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C8920A] uppercase">
                Get in Touch
              </span>
              <span className="w-10 h-[1px] bg-[#C8920A]/60" />
            </div>

            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-[#0A0A0A] uppercase leading-[0.95] mb-4">
              Book Your <br />
              <em className="text-[#C8920A] not-italic">Dream Shoot</em>
            </h2>

            <p className="font-poppins text-sm text-[#0A0A0A]/70 font-light leading-relaxed mb-10">
              Let&apos;s create something extraordinary together. Reach out and let&apos;s begin your
              story.
            </p>

            {/* Coordinates List */}
            <div className="flex flex-col gap-6 mb-10">
              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F5B301] text-[#0A0A0A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8920A] block">
                    Call / WhatsApp
                  </span>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="font-poppins text-sm font-medium text-[#0A0A0A] hover:text-[#C8920A] transition-colors"
                  >
                    {cleanPhone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F5B301] text-[#0A0A0A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8920A] block">
                    Location
                  </span>
                  <span className="font-poppins text-sm font-medium text-[#0A0A0A]">
                    {addressText}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F5B301] text-[#0A0A0A] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8920A] block">
                    Email
                  </span>
                  <a
                    href={`mailto:${emailAddr}`}
                    className="font-poppins text-sm font-medium text-[#0A0A0A] hover:text-[#C8920A] transition-colors"
                  >
                    {emailAddr}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href={`https://wa.me/${whatsappNum}?text=Hello%20The%20Golden%20Light%20Creations,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20shoot.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] hover:bg-[#1fa855] text-white px-8 py-4 font-montserrat text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-[#25D366]/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Right Column: Interactive Booking Form with Magic UI ShineBorder */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-10 lg:p-12 border border-black/10 shadow-xl relative overflow-hidden">
            <ShineBorder borderWidth={1.5} duration={14} shineColor={["#F5B301", "#FFD04A", "#C8920A"]} />
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-[#25D366] mb-4" />
                <h3 className="font-bebas text-3xl sm:text-4xl uppercase text-[#0A0A0A] mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="font-poppins text-sm text-[#0A0A0A]/70 max-w-md">
                  Thank you for reaching out. The Golden Light Creations team will contact you
                  shortly to discuss your vision.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]/70">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F5F5F5] border border-black/15 border-b-2 border-b-[#0A0A0A]/20 focus:border-b-[#C8920A] px-4 py-3.5 font-poppins text-base sm:text-sm text-[#0A0A0A] outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]/70">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+977 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F5F5F5] border border-black/15 border-b-2 border-b-[#0A0A0A]/20 focus:border-b-[#C8920A] px-4 py-3.5 font-poppins text-base sm:text-sm text-[#0A0A0A] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]/70">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F5F5F5] border border-black/15 border-b-2 border-b-[#0A0A0A]/20 focus:border-b-[#C8920A] px-4 py-3.5 font-poppins text-base sm:text-sm text-[#0A0A0A] outline-none transition-colors"
                  />
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]/70">
                    Service Required *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#F5F5F5] border border-black/15 border-b-2 border-b-[#0A0A0A]/20 focus:border-b-[#C8920A] px-4 py-3.5 font-poppins text-base sm:text-sm text-[#0A0A0A] outline-none transition-colors cursor-pointer"
                  >
                    <option value="Wedding Photography & Film">Wedding Photography & Film</option>
                    <option value="Cinematic Videography">Cinematic Videography</option>
                    <option value="Drone Coverage">Drone Coverage</option>
                    <option value="Event Coverage">Event Coverage</option>
                    <option value="Concert Photography">Concert Photography</option>
                    <option value="Fashion / Commercial Shoot">Fashion / Commercial Shoot</option>
                    <option value="Music Video Production">Music Video Production</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Social Media Branding">Social Media Branding</option>
                    <option value="Creative Direction">Creative Direction</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]/70">
                    Your Message / Event Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vision, wedding/event date, venue..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F5F5F5] border border-black/15 border-b-2 border-b-[#0A0A0A]/20 focus:border-b-[#C8920A] p-4 font-poppins text-base sm:text-sm text-[#0A0A0A] outline-none transition-colors resize-y"
                  />
                </div>

                {/* Submit Trigger */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#F5B301] hover:bg-[#C8920A] text-[#0A0A0A] hover:text-white px-10 py-4 font-montserrat font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 shadow-lg cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
