import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { TypedLocale } from "payload";
import { Link } from "@/i18n/routing";
import {
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Users,
  Sparkles,
  Camera,
  Film,
  Compass,
  PartyPopper,
  Music,
  Video,
  Smartphone,
  Tv,
  Lightbulb,
  Award,
  Star,
  CheckCircle2,
  Clock,
  MessageCircle,
} from "lucide-react";
import {
  getStudioServices,
  getStudioServiceBySlug,
  getStudioPosts,
} from "@/utilities/getStudioData";

export const revalidate = 600;

type Args = {
  params: Promise<{
    locale: TypedLocale;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const services = await getStudioServices();
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const service = await getStudioServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service | The Golden Light Creations",
    };
  }

  return {
    title: `${service.name} | The Golden Light Creations`,
    description:
      service.overview ||
      service.desc ||
      `Explore ${service.name} by The Golden Light Creations in Nepal. Cinema-grade production, photography, and bespoke creative solutions.`,
    openGraph: {
      title: `${service.name} | The Golden Light Creations`,
      description: service.desc,
      images: service.heroImageUrl ? [{ url: service.heroImageUrl }] : undefined,
    },
  };
}

function resolveServiceIcon(iconName?: string) {
  switch (iconName?.toLowerCase()) {
    case "camera":
      return <Camera className="w-6 h-6 text-[#FFD04A]" />;
    case "film":
      return <Film className="w-6 h-6 text-[#FFD04A]" />;
    case "compass":
      return <Compass className="w-6 h-6 text-[#FFD04A]" />;
    case "party":
      return <PartyPopper className="w-6 h-6 text-[#FFD04A]" />;
    case "music":
      return <Music className="w-6 h-6 text-[#FFD04A]" />;
    case "video":
      return <Video className="w-6 h-6 text-[#FFD04A]" />;
    case "smartphone":
      return <Smartphone className="w-6 h-6 text-[#FFD04A]" />;
    case "sparkles":
      return <Sparkles className="w-6 h-6 text-[#FFD04A]" />;
    case "tv":
      return <Tv className="w-6 h-6 text-[#FFD04A]" />;
    case "lightbulb":
      return <Lightbulb className="w-6 h-6 text-[#FFD04A]" />;
    case "award":
      return <Award className="w-6 h-6 text-[#FFD04A]" />;
    case "star":
      return <Star className="w-6 h-6 text-[#FFD04A]" />;
    default:
      return <Camera className="w-6 h-6 text-[#FFD04A]" />;
  }
}

export default async function SingleServicePage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise;
  const service = await getStudioServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const [allServices, recentPosts] = await Promise.all([
    getStudioServices(),
    getStudioPosts(3),
  ]);

  const relatedServices = allServices
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const heroImage =
    service.heroImageUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85";

  return (
    <div className="bg-white text-[#0A0A0A] min-h-screen">
      {/* 1. Hero Header: Crimson Red background with White typography and Gold accents */}
      <section className="bg-[#C0171E] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-8 border-b border-[#A01018] relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/70 uppercase mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white font-bold">{service.name}</span>
          </div>

          {/* Eyebrow & Number Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-2 font-montserrat text-xs font-bold tracking-[0.3em] text-[#FFD04A] uppercase bg-black/20 px-3 py-1 rounded-full border border-white/15">
              <span>SERVICE {service.num}</span>
            </span>
            {service.targetAudience && (
              <span className="inline-flex items-center gap-1.5 font-montserrat text-xs tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full">
                <Users className="w-3.5 h-3.5 text-[#FFD04A]" />
                <span>{service.targetAudience.split(",")[0]}</span>
              </span>
            )}
          </div>

          {/* Service Title */}
          <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-4 sm:mb-5 text-white max-w-4xl">
            {service.name}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="font-poppins text-base sm:text-xl text-white/90 max-w-3xl font-light leading-relaxed mb-8">
            {service.tagline || service.desc}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-white text-[#C0171E] hover:bg-[#FFD04A] hover:text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Commission This Service</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/9779810175322"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-wider text-white border border-white/20 hover:border-white px-6 py-4 rounded-full transition-colors bg-white/5"
            >
              <MessageCircle className="w-4 h-4 text-[#FFD04A]" />
              <span>Direct WhatsApp Desk</span>
            </a>

            {service.confidentialityNotice && (
              <div className="flex items-center gap-2 text-xs font-montserrat text-white/80 ml-auto pt-2 sm:pt-0">
                <ShieldCheck className="w-4 h-4 text-[#FFD04A] shrink-0" />
                <span>{service.confidentialityNotice}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Hero Visual / Cinema Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#0A0A0A]">
          <Image
            src={heroImage}
            alt={service.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div className="max-w-xl">
              <span className="font-montserrat text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#FFD04A] block mb-1">
                The Golden Light Standard
              </span>
              <p className="font-poppins text-xs sm:text-sm text-white/80 font-light">
                Choreographed natural light · 4K/6K cinema optics · Dedicated lead creative director
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-montserrat">
              <span className="w-2 h-2 rounded-full bg-[#FFD04A] animate-pulse" />
              <span>Bespoke Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive Overview & Strategic Value */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
                Strategic Excellence
              </span>
              <span className="w-8 sm:w-10 h-[1px] bg-[#C0171E]/60" />
            </div>
            <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl uppercase tracking-wide text-[#0A0A0A] leading-tight mb-6">
              Visual Mastery Tailored For <em className="text-[#C0171E] not-italic">High-Stakes Moments</em>
            </h2>
            <p className="font-poppins text-base sm:text-lg text-[#0A0A0A]/80 leading-relaxed font-light mb-6">
              {service.overview || service.desc}
            </p>
            <p className="font-poppins text-sm sm:text-base text-[#0A0A0A]/70 leading-relaxed font-light mb-8">
              At The Golden Light Creations, our philosophy centers on dignity, authentic emotion, and cinematic precision.
              Whether producing a high-profile civic address for a city mayor, confidential editorial covers for visiting artists, or royal heritage weddings, our production workflows are engineered to respect our clients&apos; time, privacy, and public stature.
            </p>

            <div className="p-6 rounded-xl bg-[#FFF5F5] border-l-4 border-[#C0171E]">
              <h4 className="font-montserrat font-bold text-sm uppercase tracking-wider text-[#C0171E] mb-2">
                Our Guarantee of Discretion
              </h4>
              <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed font-light">
                All production crew members undergo vetting and operate under strict Non-Disclosure Agreements (NDAs).
                Your footage and portraiture remain hardware-encrypted until authorized for public release.
              </p>
            </div>
          </div>

          {/* Quick Specs Bento */}
          <div className="lg:col-span-5 bg-[#FFF8F8] border border-[#C0171E]/15 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 pb-6 border-b border-[#C0171E]/10 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#C0171E] flex items-center justify-center">
                {resolveServiceIcon(service.icon)}
              </div>
              <div>
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-[#C0171E]">
                  Production Specifications
                </span>
                <h3 className="font-montserrat text-lg font-bold text-[#0A0A0A]">
                  {service.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C0171E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#0A0A0A]">
                    Cinema Hardware Standard
                  </h4>
                  <p className="font-poppins text-xs text-[#0A0A0A]/70 font-light">
                    Full-frame 4K/6K cinema sensors, anamorphic glass, dual-channel 32-bit float audio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C0171E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#0A0A0A]">
                    Turnaround Flexibility
                  </h4>
                  <p className="font-poppins text-xs text-[#0A0A0A]/70 font-light">
                    Same-day press stills &amp; social vertical reels; comprehensive color-graded master films.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C0171E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#0A0A0A]">
                    Target Demographics
                  </h4>
                  <p className="font-poppins text-xs text-[#0A0A0A]/70 font-light">
                    {service.targetAudience || "High-Profile Clients, Mayors, Celebrities, Luxury Brands"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C0171E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#0A0A0A]">
                    Geographic Deployment
                  </h4>
                  <p className="font-poppins text-xs text-[#0A0A0A]/70 font-light">
                    Based in Kathmandu; nationwide rapid dispatch across Nepal, South Asia, and abroad.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#C0171E]/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C0171E] hover:bg-[#A01018] text-white font-montserrat font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-xl transition-colors shadow-md"
              >
                <span>Request Custom Production Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Deliverables Grid */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="bg-[#FFF5F5] py-16 sm:py-24 border-y border-[#C0171E]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-6 sm:w-8 h-[1px] bg-[#C0171E]/60" />
                <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
                  Comprehensive Output
                </span>
                <span className="w-6 sm:w-8 h-[1px] bg-[#C0171E]/60" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-5xl uppercase tracking-wide text-[#0A0A0A]">
                Key <em className="text-[#C0171E] not-italic">Deliverables</em> Included
              </h2>
              <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light mt-2">
                Every commission comes complete with broadcast-certified deliverables and archival preservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-xl border border-[#C0171E]/15 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <span className="absolute top-0 left-0 w-1.5 h-full bg-[#C0171E] transition-all group-hover:w-2" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bebas text-lg text-[#C0171E] tracking-wider">
                      0{idx + 1}
                    </span>
                    {item.highlight && (
                      <span className="font-montserrat text-[10px] font-bold uppercase tracking-wider bg-[#C0171E]/10 text-[#C0171E] px-2.5 py-0.5 rounded-full">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="font-montserrat font-bold text-base sm:text-lg text-[#0A0A0A] mb-2 group-hover:text-[#C0171E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Production Workflow / Steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
                Seamless Execution
              </span>
              <span className="w-8 sm:w-10 h-[1px] bg-[#C0171E]/60" />
            </div>
            <h2 className="font-bebas text-3xl sm:text-5xl uppercase tracking-wide text-[#0A0A0A]">
              The Production <em className="text-[#C0171E] not-italic">Workflow</em>
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light">
              How our dedicated creative directors shepherd your project from confidential briefing to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xl bg-[#FFF8F8] border border-[#C0171E]/15 hover:border-[#C0171E] transition-colors relative"
              >
                <div className="w-10 h-10 rounded-full bg-[#C0171E] text-white flex items-center justify-center font-bebas text-lg mb-4">
                  {step.stepNumber || `0${idx + 1}`}
                </div>
                <h3 className="font-montserrat font-bold text-base text-[#0A0A0A] mb-2">
                  {step.title}
                </h3>
                <p className="font-poppins text-xs text-[#0A0A0A]/70 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Frequently Asked Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="bg-white py-12 sm:py-20 border-t border-[#C0171E]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12">
              <span className="font-montserrat text-xs font-bold tracking-[0.3em] text-[#C0171E] uppercase block mb-2">
                Clear Answers
              </span>
              <h2 className="font-bebas text-3xl sm:text-5xl uppercase text-[#0A0A0A]">
                Frequently Asked <em className="text-[#C0171E] not-italic">Questions</em>
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#FFF5F5] border border-[#C0171E]/15"
                >
                  <h3 className="font-montserrat font-bold text-sm sm:text-base text-[#0A0A0A] mb-2 flex items-start gap-2">
                    <span className="text-[#C0171E] font-bebas text-base">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/75 font-light leading-relaxed pl-5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Related Journal Articles / Case Studies */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="bg-[#FFF8F8] py-16 sm:py-24 border-t border-[#C0171E]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="font-montserrat text-xs font-bold tracking-[0.3em] text-[#C0171E] uppercase block mb-1">
                  Behind The Lens
                </span>
                <h2 className="font-bebas text-3xl sm:text-5xl uppercase text-[#0A0A0A]">
                  Featured <em className="text-[#C0171E] not-italic">Journal &amp; Case Studies</em>
                </h2>
              </div>
              <Link
                href="/posts"
                className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-[#C0171E] hover:underline"
              >
                <span>Browse All Articles</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-[#C0171E]/15 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#0A0A0A]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#C0171E] text-white text-[10px] font-montserrat font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[10px] font-montserrat uppercase tracking-wider text-[#0A0A0A]/50 mb-2">
                      <Clock className="w-3 h-3 text-[#C0171E]" />
                      <span>{post.readTime} read</span>
                    </div>
                    <h3 className="font-montserrat font-bold text-sm sm:text-base text-[#0A0A0A] group-hover:text-[#C0171E] transition-colors leading-snug line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="font-poppins text-xs text-[#0A0A0A]/70 line-clamp-2 font-light">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Other Popular Studio Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 border-t border-[#C0171E]/10">
          <div className="text-center mb-10">
            <span className="font-montserrat text-xs font-bold tracking-[0.3em] text-[#C0171E] uppercase block mb-1">
              Explore More
            </span>
            <h2 className="font-bebas text-3xl sm:text-4xl uppercase text-[#0A0A0A]">
              Other Specialized <em className="text-[#C0171E] not-italic">Services</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((srv) => (
              <Link
                key={srv.slug}
                href={`/services/${srv.slug}`}
                className="group p-6 rounded-xl border border-[#C0171E]/15 hover:border-[#C0171E] bg-[#FFF8F8] hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="font-bebas text-xs tracking-widest text-[#C0171E] mb-1">
                    SERVICE {srv.num}
                  </div>
                  <h3 className="font-montserrat font-bold text-base text-[#0A0A0A] group-hover:text-[#C0171E] transition-colors mb-2">
                    {srv.name}
                  </h3>
                  <p className="font-poppins text-xs text-[#0A0A0A]/70 line-clamp-2 font-light">
                    {srv.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#C0171E]/10 flex items-center justify-between text-xs font-montserrat font-bold uppercase tracking-wider text-[#C0171E]">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 9. Conversion Call-To-Action Banner */}
      <section className="bg-[#C0171E] text-white py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-montserrat text-xs font-bold tracking-[0.3em] uppercase text-[#FFD04A] block mb-2">
            Private Commissions &amp; Civic Media
          </span>
          <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl uppercase tracking-wide leading-tight mb-4 text-white">
            Ready to Commission <em className="text-[#FFD04A] not-italic">{service.name}</em>?
          </h2>
          <p className="font-poppins text-xs sm:text-base text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Connect directly with our senior production team. We handle all initial consultations with complete confidentiality, custom deliverables scoping, and swift execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#C0171E] hover:bg-[#FFD04A] hover:text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Book A Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+9779810175322"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white font-montserrat font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-colors"
            >
              <span>Direct Call: +977 9810175322</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
