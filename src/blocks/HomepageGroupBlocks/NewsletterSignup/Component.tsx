"use client";

import React, { useState } from "react";
import type { NewsletterSignupBlock as NewsletterSignupProps } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Check, Mail, Loader2 } from "lucide-react";

const backgroundClasses: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted",
  dark: "bg-slate-900 text-white",
};

export const NewsletterSignupBlock: React.FC<NewsletterSignupProps> = ({
  layout = "simple",
  title,
  subtitle,
  backgroundImage,
  backgroundStyle = "primary",
  inputPlaceholder,
  buttonLabel,
  successMessage,
  features,
  privacyNote,
  apiEndpoint = "/api/newsletter/subscribe",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const hasBackgroundImage = backgroundImage && typeof backgroundImage === "object";
  const isDark = backgroundStyle === "dark" || hasBackgroundImage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !apiEndpoint) return;

    setStatus("loading");

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again later.");
    }
  };

  const formContent = (
    <>
      {status === "success" ? (
        <div className="flex items-center gap-2 text-success p-4 bg-success/10 rounded-lg">
          <Check className="w-5 h-5" />
          <span>{successMessage || "Thank you for subscribing!"}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder={inputPlaceholder || "Enter your email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                buttonLabel || "Subscribe"
              )}
            </Button>
          </div>

          {status === "error" && <p className="text-sm text-error">{errorMessage}</p>}

          {privacyNote && <p className="text-xs text-muted-foreground">{privacyNote}</p>}
        </form>
      )}
    </>
  );

  return (
    <section
      className={cn(
        "relative py-16 md:py-20",
        !hasBackgroundImage && backgroundStyle && backgroundClasses[backgroundStyle]
      )}
    >
      {/* Background Image */}
      {hasBackgroundImage && backgroundImage.url && (
        <>
          <Image src={backgroundImage.url} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      <div
        className={cn("relative z-10 container", (isDark || hasBackgroundImage) && "text-white")}
      >
        {/* Simple Layout */}
        {layout === "simple" && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p
                className={cn(
                  "mb-6",
                  isDark || hasBackgroundImage ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            )}
            <div
              className={cn(
                "p-4 rounded-lg",
                isDark || hasBackgroundImage ? "bg-white text-foreground" : "bg-card border"
              )}
            >
              {formContent}
            </div>
          </div>
        )}

        {/* Card Layout */}
        {layout === "card" && (
          <Card className="max-w-2xl mx-auto shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
              {subtitle && <p className="text-muted-foreground mb-6">{subtitle}</p>}
              {formContent}
            </CardContent>
          </Card>
        )}

        {/* Split Layout */}
        {layout === "split" && (
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="lg:w-1/2">
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold mb-4",
                  (isDark || hasBackgroundImage) && "text-white"
                )}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  className={cn(
                    "text-lg mb-6",
                    isDark || hasBackgroundImage ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  {subtitle}
                </p>
              )}
              {features && features.length > 0 && (
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.icon && typeof feature.icon === "object" && feature.icon.url ? (
                        <Image src={feature.icon.url} alt="" width={20} height={20} />
                      ) : (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                      <span
                        className={cn(
                          isDark || hasBackgroundImage ? "text-white/90" : "text-foreground"
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <div
                className={cn(
                  "p-6 rounded-xl",
                  isDark || hasBackgroundImage
                    ? "bg-white text-foreground"
                    : "bg-card border shadow-lg"
                )}
              >
                {formContent}
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Layout */}
        {layout === "fullscreen" && (
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
            {subtitle && <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">{subtitle}</p>}
            <div className="bg-white text-foreground p-6 rounded-xl max-w-xl mx-auto">
              {formContent}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
