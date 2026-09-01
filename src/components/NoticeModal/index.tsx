"use client";

import React, { useEffect, useState } from "react";
import { FileText, Download, Bell, ChevronRight, Calendar } from "lucide-react";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utilities/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { PDFViewer } from "@/components/PDFViewer";

import type { List as ListType } from "@/payload-types";

type NoticeModalProps = {
  notices: ListType[];
};

export const NoticeModal: React.FC<NoticeModalProps> = ({ notices }) => {
  const [activeNotices, setActiveNotices] = useState<ListType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (notices && notices.length > 0) {
      setActiveNotices([...notices]);
      setIsOpen(true);
    }
  }, [notices]);

  const handleClose = (id: string | number) => {
    const remaining = activeNotices.filter((n) => n.id !== id);
    setActiveNotices(remaining);
    if (remaining.length === 0) {
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // If there's only one notice, closing the modal dismisses it.
      // If multiple, closing might be ambiguous - but for now we follow the existing pattern.
      setIsOpen(false);
    }
  };

  const currentNotice = activeNotices[0];
  if (!currentNotice) return null;

  const {
    id,
    title,
    description,
    category,
    priority,
    updatedAt,
    image,
    attachments,
    popupSettings,
  } = currentNotice;

  const displayMode = popupSettings?.displayMode || "full";

  // PDF & Media resolution
  const pdfAttachment =
    attachments?.[0] &&
    (attachments[0].externalFileUrl ||
      (attachments[0].file &&
        typeof attachments[0].file === "object" &&
        attachments[0].file.mimeType === "application/pdf"))
      ? attachments[0]
      : null;

  const pdfSrc: string | null =
    popupSettings?.pdf ||
    (pdfAttachment
      ? pdfAttachment.externalFileUrl ||
        (pdfAttachment.file && typeof pdfAttachment.file === "object" && pdfAttachment.file.url) ||
        null
      : null);

  const nonPdfAttachment = !pdfSrc && attachments?.[0] ? attachments[0] : null;

  const isMediaOnlyMode =
    (displayMode === "image_only" || displayMode === "image_title") && Boolean(image || pdfSrc);

  const categoryTitle =
    category && typeof category === "object" && "title" in category ? category.title : "General";

  let priorityVariant: "default" | "destructive" | "secondary" | "outline" = "outline";
  if (priority === "high") priorityVariant = "destructive";
  if (priority === "medium") priorityVariant = "default";

  // Shared content components for Dialog/Drawer
  const NoticeHeader = () => (
    <div className="space-y-4 pt-1">
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant={priorityVariant}
          className="uppercase text-[10px] tracking-widest font-semibold px-2.5 py-0.5 rounded-full"
        >
          {priority} Priority
        </Badge>
        <Badge
          variant="secondary"
          className="uppercase text-[10px] tracking-widest font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800"
        >
          {categoryTitle}
        </Badge>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium uppercase tracking-wider ml-auto">
          <Calendar className="w-3 h-3" />
          {new Date(updatedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-tight">
        {title}
      </h2>
    </div>
  );

  const NoticeContent = () => (
    <div className={cn("space-y-6", isMediaOnlyMode ? "pt-0" : "pt-2")}>
      {!isMediaOnlyMode && description && typeof description === "object" && (
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          <RichText data={description} enableGutter={false} />
        </div>
      )}

      {/* Media Rendering */}
      <div className="space-y-4">
        {image && (
          <div className="relative group overflow-hidden rounded-xl border border-border/50 bg-muted/30">
            <Media
              resource={image}
              imgClassName="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {isMediaOnlyMode && displayMode === "image_title" && !pdfSrc && (
              <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-lg font-bold text-white tracking-tight">{title}</p>
              </div>
            )}
          </div>
        )}

        {pdfSrc && (
          <PDFViewer
            url={pdfSrc}
            title={title || "Notice Document"}
            minHeight={image ? "45vh" : "65vh"}
          />
        )}

        {!image && !pdfSrc && nonPdfAttachment && (
          <div className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed border-border/60 bg-muted/20 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                {nonPdfAttachment.label || "Notice Attachment"}
              </p>
              <p className="text-sm text-muted-foreground italic">Available for download</p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-2 rounded-full border-primary/20 hover:bg-primary/5"
            >
              <a
                href={
                  nonPdfAttachment.file && typeof nonPdfAttachment.file === "object"
                    ? (nonPdfAttachment.file as { url?: string }).url || "#"
                    : "#"
                }
                download
              >
                <Download className="mr-2 h-4 w-4" />
                Download Document
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const MultipleNoticesIndicator = () =>
    activeNotices.length > 1 && (
      <div className="flex items-center justify-between gap-4 p-4 mt-2 bg-primary/5 rounded-xl border border-primary/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
              Updates
            </p>
            <p className="text-[13px] font-medium text-foreground">
              {activeNotices.length - 1} more important notice
              {activeNotices.length - 1 > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="rounded-full shadow-sm hover:translate-x-1 transition-transform"
          onClick={() => handleClose(id)}
        >
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent className="max-h-[90vh] px-4 pb-8">
          <div className="mx-auto w-full max-w-md overflow-y-auto no-scrollbar pt-2">
            {!isMediaOnlyMode && (
              <DrawerHeader className="px-0 text-left">
                <DrawerTitle asChild>
                  <NoticeHeader />
                </DrawerTitle>
                <DrawerDescription className="sr-only">
                  Important notice regarding {title}
                </DrawerDescription>
              </DrawerHeader>
            )}
            <div className="py-2">
              <NoticeContent />
            </div>
            <DrawerFooter className="px-0 pt-6">
              <MultipleNoticesIndicator />
              {isMediaOnlyMode && (
                <Button
                  variant="outline"
                  onClick={() => handleClose(id)}
                  className="w-full rounded-full"
                >
                  Dismiss
                </Button>
              )}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {!isMediaOnlyMode && (
            <DialogHeader className="space-y-0 text-left">
              <DialogTitle asChild>
                <NoticeHeader />
              </DialogTitle>
              <DialogDescription className="sr-only">
                Important notice regarding {title}
              </DialogDescription>
            </DialogHeader>
          )}

          <NoticeContent />

          <MultipleNoticesIndicator />

          {isMediaOnlyMode && (
            <div className="flex justify-end pt-4">
              <Button
                variant="ghost"
                onClick={() => handleClose(id)}
                className="text-xs uppercase tracking-widest font-semibold hover:bg-zinc-100"
              >
                Dismiss
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
