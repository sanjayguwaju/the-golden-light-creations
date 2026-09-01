"use client";

import React, { useState } from "react";
import { ExternalLink, FileDown, Maximize2, Loader2, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utilities/ui";

interface PDFViewerProps {
  url: string;
  title?: string;
  className?: string;
  minHeight?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  title = "Document",
  className,
  minHeight = "60vh",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = title || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("relative flex flex-col w-full overflow-hidden border border-border/50 rounded-xl bg-muted/20 shadow-sm", className)}>
      {/* PDF Header/Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-background border-b border-border/50">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="p-1.5 rounded-md bg-primary/10">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium truncate text-foreground/80">
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
            onClick={handleOpenNewTab}
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
            onClick={handleDownload}
            title="Download PDF"
          >
            <FileDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div 
        className="relative w-full bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-center p-4 min-h-[40vh]"
        style={{ height: minHeight }}
      >
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-10 flex flex-col p-4 gap-4 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-[1px]">
             <div className="flex items-center gap-3">
               <Skeleton className="h-10 w-10 rounded-full" />
               <div className="space-y-2">
                 <Skeleton className="h-4 w-[150px]" />
                 <Skeleton className="h-4 w-[100px]" />
               </div>
             </div>
             <Skeleton className="flex-1 w-full rounded-lg" />
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20">
               <Loader2 className="w-8 h-8 text-primary animate-spin" />
               <p className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em]">Preparing Document</p>
             </div>
          </div>
        )}

        {hasError ? (
          <div className="flex flex-col items-center justify-center text-center p-8 gap-4 max-w-xs">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Failed to load PDF</p>
              <p className="text-xs text-muted-foreground">The document could not be displayed in the browser.</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleOpenNewTab} className="rounded-full">
              Open in New Tab
            </Button>
          </div>
        ) : (
          <iframe
            src={`${url}#toolbar=0`}
            className="w-full h-full border-none shadow-lg rounded-sm"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            title={title}
          />
        )}
      </div>

      {/* Mobile-only CTA */}
      <div className="md:hidden p-3 bg-primary/5 border-t border-border/50 flex justify-center">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full rounded-full text-xs font-semibold gap-2 border-primary/10 shadow-sm"
          onClick={handleOpenNewTab}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          View Fullscreen
        </Button>
      </div>
    </div>
  );
};
