"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, MessageSquareText, PhoneCall } from "lucide-react";
import { Link } from "@/i18n/routing";

export interface FAQItem {
  question: string;
  answer: string;
}

interface StudioFAQProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  items?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How far in advance should we reserve our wedding or commercial shoot?",
    answer:
      "We recommend reserving 6 to 12 months in advance, especially for popular wedding seasons in Nepal (October to March) and high-demand festival dates. Because we deliberately accept a strictly limited number of commissions each year to maintain cinematic excellence, dates fill up quickly.",
  },
  {
    question: "Do you travel across Nepal (Mustang, Pokhara, Everest) and internationally?",
    answer:
      "Absolutely. Over 60% of our commissions are destination weddings and travel campaigns. From the arid canyons of Upper Mustang and sunrise ceremonies in Pokhara to private destination celebrations in India, Dubai, and Southeast Asia, our team travels with fully insured, airline-ready cinema gear.",
  },
  {
    question: "What camera gear and audio systems do you use on set?",
    answer:
      "We shoot on full-frame cinema cameras (RED Digital Cinema and Sony FX Series) paired with prime anamorphic glass for that authentic Hollywood look. Audio is recorded with 32-bit floating point wireless transceivers and directional shotgun mics so your sacred vows and speeches are crisp and immortalized.",
  },
  {
    question: "What is your turnaround timeline for teaser reels and full film edits?",
    answer:
      "You will receive a cinematic social teaser trailer within 7 to 10 days of your event. Full feature wedding films, highlight reels, and complete retouched photo galleries are delivered within 6 to 8 weeks after bespoke color grading and sound design.",
  },
  {
    question: "Do we receive raw unedited video footage and high-resolution photos?",
    answer:
      "Yes. All edited photos are delivered in full-resolution print quality through a private online gallery. For cinematography, clients can choose our Master Hard Drive package containing all raw unedited 4K log rushes, speeches, and complete ceremony recordings.",
  },
  {
    question: "Can we customize our photography and cinematography package?",
    answer:
      "Every celebration is unique. We gladly customize packages to include multi-day coverage, certified drone cinematography, same-day edit teasers, and handcrafted fine art flush-mount albums. We work closely with you to design the perfect coverage plan.",
  },
];

export function StudioFAQ({
  eyebrow = "Client Inquiries",
  title = "Frequently Asked",
  highlight = "Questions",
  description = "Everything you need to know about our booking process, destination travel logistics, cinema camera hardware, and heirloom film delivery.",
  items,
}: StudioFAQProps) {
  const faqsToRender = items && items.length > 0 ? items : defaultFAQs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-black/5 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C0171E]/60" />
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
              {eyebrow}
            </span>
            <span className="w-8 h-[1px] bg-[#C0171E]/60" />
          </div>

          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-[#0A0A0A] uppercase leading-[0.95] mb-4">
            {title} {highlight && <em className="text-[#C0171E] not-italic">{highlight}</em>}
          </h2>

          {description && (
            <p className="font-poppins text-xs sm:text-base text-[#0A0A0A]/70 font-light leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqsToRender.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#FFFDFD] border-[#C0171E]/40 shadow-md"
                    : "bg-white border-[#C0171E]/15 hover:border-[#C0171E]/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 sm:py-6 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-montserrat font-bold text-sm sm:text-base md:text-lg text-[#0A0A0A] leading-snug">
                    {faq.question}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? "bg-[#C0171E] text-white" : "bg-[#FFF5F5] text-[#C0171E]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 text-[#0A0A0A]/80 font-poppins text-xs sm:text-sm md:text-base font-light leading-relaxed border-t border-[#C0171E]/10">
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout Box */}
        <div className="mt-14 sm:mt-16 p-6 sm:p-8 bg-[#FFF8F8] border border-[#C0171E]/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#C0171E] text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageSquareText className="w-6 h-6 text-[#FFD04A]" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-sm sm:text-base text-[#0A0A0A] uppercase tracking-wider">
                Still have unanswered questions?
              </h4>
              <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light">
                Our creative directors are available via WhatsApp or telephone consultation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/9779810175322"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#C0171E] text-white hover:bg-[#A01018] font-montserrat font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#0A0A0A] border border-[#C0171E]/20 hover:border-[#C0171E] font-montserrat font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              <span>Contact Form</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
