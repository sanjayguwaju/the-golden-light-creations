import React from "react";
import type { AboutUsBlock as AboutUsBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { Facebook, Twitter, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/utilities/ui";

// ─── Sub-components ──────────────────────────────────────────────────────────

// ─── Main Component ───────────────────────────────────────────────────────────

export const AboutUsBlock: React.FC<AboutUsBlockProps> = ({
  title,
  content,
  historyTitle,
  historyTimeline,
  isVisibleOnHomepage,
  showFacebookIframe,
  facebookPageUrl,
  iframePosition = "right",
}) => {
  // ── Homepage variant ────────────────────────────────────────────────────────
  if (isVisibleOnHomepage) {
    const hasIframe = showFacebookIframe && (facebookPageUrl || true);

    return (
      <section className="bg-background pt-6 pb-10 md:pt-8 md:pb-12 font-sans border-t border-border">
        <div className="container">
          <div
            className={cn(
              "flex flex-col md:flex-row items-stretch gap-6 lg:gap-8 md:h-[500px] lg:h-[550px]",
              hasIframe && iframePosition === "left" && "md:flex-row-reverse"
            )}
          >
            {/* Left Content */}
            <div className={cn("flex-1 flex flex-col")}>
              <div className="w-full flex flex-col h-full overflow-hidden rounded-none shadow-md bg-card border border-border p-6 md:p-8 lg:p-10">
                <div className="flex-1 overflow-hidden pr-2 relative">
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-10 bg-accent rounded-none shrink-0 shadow-[0_4px_12px_rgba(225,29,72,0.2)]" />
                    {title || "About Reliance Paints"}
                  </h2>

                  {content && (
                    <div className="text-muted-foreground text-[18px] md:text-[19px] lg:text-[21px] leading-loose text-justify prose prose-slate dark:prose-invert prose-lg max-w-none">
                      <RichText data={content} enableGutter={false} />
                    </div>
                  )}

                  {/* Visual fade to indicate more text */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-card to-transparent pointer-events-none z-10" />
                </div>

                <div className="pt-8 border-t border-border mt-auto">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-none font-bold text-base hover:opacity-90 shadow-md hover:shadow-lg transition-all group"
                  >
                    Read More About Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Content (Facebook Page Plugin) */}
            {hasIframe && (
              <div className="w-full md:w-[320px] lg:w-[380px] flex-none flex flex-col h-full overflow-hidden rounded-none shadow-md bg-card border border-border">
                <div className="px-5 py-4 border-b border-border bg-muted/20 text-center">
                  <h3 className="font-extrabold text-primary text-base md:text-lg uppercase tracking-widest flex items-center gap-2 justify-center">
                    <Facebook className="w-5 h-5 text-[#1877F2] fill-[#1877F2]" />
                    Official Facebook
                  </h3>
                </div>
                <div className="flex-1 overflow-hidden flex justify-center bg-white p-4">
                  <iframe
                    src={`https://www.facebook.com/plugins/page.php?href=${
                      facebookPageUrl
                        ? encodeURIComponent(facebookPageUrl)
                        : "https%3A%2F%2Fwww.facebook.com%2Freliancepaints"
                    }&tabs=timeline&width=500&height=650&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                    style={{ border: "none" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── Full-page (About) variant ───────────────────────────────────────────────
  return (
    <section className="w-full bg-secondary py-12 md:py-16">
      <div className="container flex flex-col items-center">
        {title && (
          <div className="mb-10 flex flex-col items-center">
            <h1 className="section-heading text-5xl font-bold text-primary">{title}</h1>
          </div>
        )}

        {content && (
          <div className="w-full prose max-w-none text-justify text-foreground text-lg lg:text-xl leading-[1.8] mb-16">
            <RichText data={content} enableGutter={false} />
          </div>
        )}

        {historyTitle && (
          <div className="mb-8 flex flex-col items-center">
            <h2 className="section-heading text-3xl font-bold text-primary">{historyTitle}</h2>
          </div>
        )}

        {!!historyTimeline?.length && (
          <ul className="w-full max-w-4xl flex flex-col space-y-4 mb-16 list-none p-0">
            {(historyTimeline as NonNullable<AboutUsBlockProps["historyTimeline"]>).map(
              (item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-foreground border-l-2 border-primary/10 pl-4 py-2 hover:border-accent transition-colors"
                >
                  <span className="font-bold text-primary whitespace-nowrap min-w-[90px] text-xl uppercase tracking-tighter">
                    {item?.year}
                  </span>
                  <span className="font-medium text-lg lg:text-xl">{item?.description}</span>
                </li>
              )
            )}
          </ul>
        )}

        <div className="w-full max-w-4xl border-t border-dashed border-border my-8" />

        <div className="flex gap-4 justify-center mt-4">
          <Button className="bg-[#3b5998] hover:bg-[#2d4373] text-white flex items-center gap-2">
            <Facebook size={18} />
            Share
          </Button>
          <Button className="bg-[#55acee] hover:bg-[#2795e9] text-white flex items-center gap-2">
            <Twitter size={18} />
            Tweet
          </Button>
          <Button className="bg-accent hover:bg-accent-hover text-white flex items-center gap-2">
            <Share2 size={18} />
            Share
          </Button>
        </div>
      </div>
    </section>
  );
};
