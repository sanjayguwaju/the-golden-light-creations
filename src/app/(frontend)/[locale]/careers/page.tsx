import type { Metadata } from "next";
import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import { CheckCircle2, TrendingUp, Users, Lightbulb, Shield, Heart } from "lucide-react";

import { JobOpeningsSection } from "@/components/careers/JobOpeningsSection";
import { GeneralApplicationModal } from "@/components/careers/GeneralApplicationModal";
import type { Career } from "@/payload-types";

export const dynamic = "force-static";
export const revalidate = 600;

type Args = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const title = "Careers | Reliance Paints";
  const description =
    "Join the team at Reliance Paints. Discover exciting career opportunities in Nepal's leading paint manufacturing company.";
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://reliancepaints.com";
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Reliance Paints",
      locale,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Reliance Paints Careers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: Args) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise });

  // Fetch active careers with locale support
  const { docs: careers } = await payload.find({
    collection: "careers",
    where: { isActive: { equals: true } },
    sort: "-createdAt",
    depth: 0,
    locale: locale as any,
  });

  return (
    <div className="min-h-screen bg-reliance-offwhite flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-16 max-w-[1440px] pt-12 md:pt-24 pb-16">
        <div className="mb-16 text-center space-y-6">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold">Careers</p>
          <h1 className="text-4xl lg:text-5xl lg:text-7xl font-bold tracking-tight text-reliance-navy uppercase">
            Build Your Future with Reliance Paints
          </h1>
          <div className="text-reliance-grey text-lg max-w-3xl mx-auto space-y-4">
            <p>
              At Reliance Paints Industries Pvt. Ltd., we believe our people are the foundation of our success. Since our establishment in 2058 B.S., we have been committed to innovation, quality, and excellence in the paint manufacturing industry. As we continue to grow across Nepal, we&apos;re always looking for passionate, talented, and motivated individuals to join our team.
            </p>
            <p>
              Whether you&apos;re an experienced professional or just beginning your career, Reliance Paints offers opportunities to learn, grow, and make a meaningful impact.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="#openings"
              className="inline-flex items-center justify-center bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors rounded-none w-full sm:w-auto"
            >
              Explore Opportunities
            </Link>

            <GeneralApplicationModal>
              <button className="inline-flex items-center justify-center border-2 border-reliance-navy text-reliance-navy hover:bg-reliance-navy hover:text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors rounded-none w-full sm:w-auto cursor-pointer">
                Submit Your Resume
              </button>
            </GeneralApplicationModal>
          </div>
        </div>
      </div>

      {/* Why Work with Us */}
      <div className="bg-white dark:bg-slate-900 py-16 lg:py-24 border-y border-reliance-navy/10">
        <div className="container mx-auto px-4 lg:px-16 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-reliance-navy dark:text-white uppercase">Why Work with Us</h2>
            <p className="text-reliance-grey dark:text-slate-400 mt-4 max-w-2xl mx-auto">
              Joining Reliance Paints means becoming part of a team that values collaboration, integrity, and continuous improvement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-reliance-offwhite dark:bg-slate-800 p-8 border border-reliance-navy/10 shadow-[4px_4px_0_0_#0D1B3E]">
              <TrendingUp className="w-10 h-10 text-reliance-gold mb-6" />
              <h3 className="text-xl font-bold text-reliance-navy dark:text-white mb-3 uppercase">Professional Growth</h3>
              <p className="text-reliance-grey dark:text-slate-300">Develop your skills through hands-on experience, training, and career advancement opportunities.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-reliance-offwhite dark:bg-slate-800 p-8 border border-reliance-navy/10 shadow-[4px_4px_0_0_#0D1B3E]">
              <Users className="w-10 h-10 text-reliance-gold mb-6" />
              <h3 className="text-xl font-bold text-reliance-navy dark:text-white mb-3 uppercase">Collaborative Culture</h3>
              <p className="text-reliance-grey dark:text-slate-300">Work alongside experienced professionals in a supportive and respectful environment.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-reliance-offwhite dark:bg-slate-800 p-8 border border-reliance-navy/10 shadow-[4px_4px_0_0_#0D1B3E]">
              <Lightbulb className="w-10 h-10 text-reliance-gold mb-6" />
              <h3 className="text-xl font-bold text-reliance-navy dark:text-white mb-3 uppercase">Innovation</h3>
              <p className="text-reliance-grey dark:text-slate-300">Contribute to creating high-quality, eco-friendly paint solutions that serve customers across Nepal.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-reliance-offwhite dark:bg-slate-800 p-8 border border-reliance-navy/10 shadow-[4px_4px_0_0_#0D1B3E]">
              <Shield className="w-10 h-10 text-reliance-gold mb-6" />
              <h3 className="text-xl font-bold text-reliance-navy dark:text-white mb-3 uppercase">Stability & Growth</h3>
              <p className="text-reliance-grey dark:text-slate-300">Be part of a well-established company with over two decades of industry experience and a strong reputation.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-reliance-offwhite dark:bg-slate-800 p-8 border border-reliance-navy/10 shadow-[4px_4px_0_0_#0D1B3E] md:col-span-2 lg:col-span-1">
              <Heart className="w-10 h-10 text-reliance-gold mb-6" />
              <h3 className="text-xl font-bold text-reliance-navy dark:text-white mb-3 uppercase">Meaningful Work</h3>
              <p className="text-reliance-grey dark:text-slate-300">Help manufacture products that protect, beautify, and improve homes, businesses, and industries throughout Nepal.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Life at Reliance Paints & What We Look For & Benefits */}
      <div className="py-16 lg:py-24 container mx-auto px-4 lg:px-16 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-reliance-navy dark:text-white uppercase mb-6">Life at Reliance Paints</h2>
              <div className="text-reliance-grey dark:text-slate-300 space-y-4">
                <p>We believe a positive workplace inspires innovation and success. Our employees work in an environment that encourages teamwork, responsibility, and continuous learning.</p>
                <p>At Reliance Paints, every team member has the opportunity to contribute ideas, solve challenges, and grow professionally while supporting our mission of delivering quality products and outstanding customer service.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-reliance-navy dark:text-white uppercase mb-6">Career Opportunities</h2>
              <p className="text-reliance-grey dark:text-slate-300 mb-6">We regularly recruit talented individuals across various departments, including:</p>
              <ul className="grid sm:grid-cols-2 gap-3 text-reliance-navy dark:text-slate-200 font-medium">
                {["Production & Manufacturing", "Quality Assurance", "Research & Development", "Sales & Marketing", "Supply Chain & Logistics", "Finance & Administration", "Human Resources", "Customer Service", "Information Technology"].map((dept, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-reliance-gold shrink-0 mt-0.5" />
                    <span>{dept}</span>
                  </li>
                ))}
              </ul>
              <p className="text-reliance-grey dark:text-slate-400 mt-6 italic text-sm">If your desired position isn&apos;t currently available, you&apos;re welcome to submit your resume for future opportunities.</p>
            </div>
          </div>

          <div className="space-y-12 bg-white dark:bg-slate-900 p-8 md:p-12 border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E]">
            <div>
              <h2 className="text-2xl font-bold text-reliance-navy dark:text-white uppercase mb-6">What We Look For</h2>
              <p className="text-reliance-grey dark:text-slate-300 mb-6">We seek individuals who share our commitment to excellence and embody our core values. Ideal candidates are:</p>
              <ul className="space-y-3 text-reliance-navy dark:text-slate-200">
                {["Passionate about learning and growth", "Team-oriented and collaborative", "Honest and accountable", "Customer-focused", "Innovative problem solvers", "Committed to quality and safety"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-reliance-gold mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-reliance-navy dark:text-white uppercase mb-6">Employee Benefits</h2>
              <p className="text-reliance-grey dark:text-slate-300 mb-6">We are committed to supporting the well-being and professional development of our employees. Depending on the role, benefits may include:</p>
              <ul className="space-y-3 text-reliance-navy dark:text-slate-200">
                {["Competitive salary", "Performance-based incentives", "Professional development opportunities", "Training and skill enhancement", "Career growth opportunities", "Supportive work environment", "Paid leave and company holidays", "Employee recognition programs"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-reliance-gold mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Current Openings Interactive Section */}
      <JobOpeningsSection careers={careers as Career[]} />

      {/* Join Our Talent Network */}
      <div id="talent-network" className="bg-white dark:bg-slate-950 text-reliance-navy dark:text-white py-16 lg:py-24 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-16 max-w-[1440px] text-center">
          <h2 className="text-3xl lg:text-5xl font-bold uppercase mb-6 text-reliance-navy dark:text-white">Join Our Talent Network</h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-reliance-grey dark:text-slate-300">
            Don&apos;t see the right opportunity today? Send us your resume, and we&apos;ll keep your profile on file for future openings that match your skills and experience.
          </p>

          <GeneralApplicationModal>
            <button className="inline-flex items-center justify-center bg-reliance-gold hover:bg-reliance-navy hover:text-white dark:hover:bg-white dark:hover:text-reliance-navy text-reliance-navy font-bold uppercase tracking-widest px-10 py-5 text-sm transition-colors rounded-none cursor-pointer">
              Submit Your Resume
            </button>
          </GeneralApplicationModal>
        </div>
      </div>


    </div>
  );
}
