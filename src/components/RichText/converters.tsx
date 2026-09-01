import React from "react";


import type {
  SerializedHeadingNode,
  SerializedInlineBlockNode,
  SerializedLinkNode,
  SerializedListItemNode,
  SerializedListNode,
  SerializedParagraphNode,
  SerializedRelationshipNode,
  SerializedTextNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { LinkJSXConverter } from "@payloadcms/richtext-lexical/react";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { CodeBlock } from "@/blocks/Code/Component";
import { GalleryBlock } from "@/blocks/Gallery/Component";
import { VideoEmbedBlock } from "@/blocks/VideoEmbed/Component";
import { QuoteBlock } from "@/blocks/Quote/Component";
import { StatsListBlock } from "@/blocks/StatsList/Component";
import { AccordionBlock } from "@/blocks/Accordion/Component";
import { InfoTableBlock } from "@/blocks/InfoTable/Component";
import type { NodeTypes } from "./types";

// ─── Text format bitmask constants ────────────────────────────────────────────
const IS_BOLD = 1;
const IS_ITALIC = 1 << 1;
const IS_STRIKETHROUGH = 1 << 2;
const IS_UNDERLINE = 1 << 3;
const IS_CODE = 1 << 4;
const IS_SUBSCRIPT = 1 << 5;
const IS_SUPERSCRIPT = 1 << 6;

// ─── Internal link helper ──────────────────────────────────────────────────────
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = (value as { slug?: string }).slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

// ─── Unknown node fallback (dev-only) ─────────────────────────────────────────
const unknownConverter = ({ node }: { node: { type?: string } }) => {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div
      style={{
        border: "2px dashed #f43f5e",
        borderRadius: "6px",
        padding: "8px 12px",
        margin: "8px 0",
        background: "#fff1f2",
        color: "#9f1239",
        fontFamily: "monospace",
        fontSize: "12px",
      }}
    >
      <strong>[DEV]</strong> Unknown node type:{" "}
      <code>{(node as { type?: string }).type ?? "unknown"}</code>
    </div>
  );
};

// ─── Alignment helper ─────────────────────────────────────────────────────────
// Lexical ElementFormatType: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
// 'start' / 'end' are logical (not valid CSS), mapped to left/right for LTR.
const ALIGN_CLASS: Record<string, string> = {
  left: "text-left",
  start: "text-left",
  center: "text-center",
  right: "text-right",
  end: "text-right",
  justify: "text-justify",
};

function getAlignClass(format: string | number | undefined): string {
  if (!format || format === "") return "";
  return ALIGN_CLASS[String(format)] ?? "";
}

// ─── Indent helper ─────────────────────────────────────────────────────────────
// Each indent level = 40px padding (matches Lexical's default indentation step)
function getIndentStyle(indent: number | undefined): React.CSSProperties {
  if (!indent || indent <= 0) return {};
  return { paddingLeft: `${indent * 40}px` };
}

// ─── Converters ───────────────────────────────────────────────────────────────
export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),

  // ── paragraph ──
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const pNode = node as SerializedParagraphNode & {
      format?: string | number;
      indent?: number;
    };
    const align = getAlignClass(pNode.format);
    return (
      <p
        className={["text-foreground/80 leading-[1.85] mb-6 text-[17px] text-pretty", align]
          .filter(Boolean)
          .join(" ")}
        style={getIndentStyle(pNode.indent)}
      >
        {children}
      </p>
    );
  },

  // ── headings ──
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const hNode = node as SerializedHeadingNode & {
      format?: string | number;
      indent?: number;
    };
    const tag = hNode.tag;

    const headingStyles: Record<string, string> = {
      h1: "text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-14 mb-6 leading-[1.2]",
      h2: "text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mt-12 mb-5 pb-3 border-b border-border/50 leading-snug",
      h3: "text-xl font-semibold text-foreground mt-8 mb-4 leading-snug",
      h4: "text-[1.05rem] font-semibold text-foreground mt-6 mb-2 leading-normal",
      h5: "text-base font-semibold text-muted-foreground mt-5 mb-1",
      h6: "text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-4 mb-2",
    };

    const align = getAlignClass(hNode.format);
    const className = [headingStyles[tag] ?? headingStyles.h2, align].filter(Boolean).join(" ");
    return React.createElement(tag, { className, style: getIndentStyle(hNode.indent) }, children);
  },

  // ── ordered / unordered / checklist container ──
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const listNode = node as SerializedListNode;

    if (listNode.listType === "check") {
      // Checklist: plain div wrapper — each item renders its own checkbox
      return (
        <div className="my-6 space-y-2" role="list">
          {children}
        </div>
      );
    }

    return listNode.listType === "number" ? (
      <ol className="list-none pl-0 my-6 space-y-1">{children}</ol>
    ) : (
      <ul className="list-none pl-0 my-6 space-y-1">{children}</ul>
    );
  },

  // ── list item (unordered, ordered, checklist) ──
  listitem: ({ node, nodesToJSX, parent, childIndex }) => {
    const children = nodesToJSX({ nodes: node.children });
    const liNode = node as SerializedListItemNode & {
      checked?: boolean;
      indent?: number;
    };
    const parentList = parent as SerializedListNode & { listType?: string };
    const listType = parentList?.listType;

    // ── Checklist item ──
    if (listType === "check") {
      const checked = liNode.checked ?? false;
      return (
        <div
          className="flex items-center gap-3 py-1 text-[17px] leading-relaxed"
          role="listitem"
          style={getIndentStyle(liNode.indent)}
        >
          {/* Read-only checkbox — editors set state via the admin UI */}
          <span
            className={[
              "shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
              checked
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border bg-background",
            ].join(" ")}
            aria-label={checked ? "Completed" : "Not completed"}
            role="checkbox"
            aria-checked={checked}
          >
            {checked && (
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className={checked ? "line-through text-muted-foreground" : "text-foreground/80"}>
            {children}
          </span>
        </div>
      );
    }

    // ── Ordered item — numbered badge ──
    if (listType === "number") {
      return (
        <li
          className="flex items-start gap-4 py-1 text-foreground/80 text-[17px] leading-relaxed"
          style={getIndentStyle(liNode.indent)}
        >
          <span
            className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center justify-center select-none"
            aria-hidden="true"
          >
            {childIndex + 1}
          </span>
          <span className="pt-[3px] flex-1">{children}</span>
        </li>
      );
    }

    // ── Unordered item — custom primary-color dot bullet ──
    return (
      <li
        className="flex items-start gap-3 py-1 text-foreground/80 text-[17px] leading-relaxed"
        style={getIndentStyle(liNode.indent)}
      >
        <span
          className="mt-[0.62em] shrink-0 w-[6px] h-[6px] rounded-full bg-primary"
          aria-hidden="true"
        />
        <span className="flex-1">{children}</span>
      </li>
    );
  },

  // ── blockquote ──
  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="relative border-l-[3px] border-primary bg-linear-to-r from-primary/8 via-primary/4 to-transparent rounded-r-2xl py-5 pl-10 pr-7 my-10 overflow-hidden">
        <span
          className="absolute top-0 left-3 text-primary/25 text-[5rem] leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <div className="relative text-[1.05rem] leading-[1.8] text-foreground/85 italic">
          {children}
        </div>
      </blockquote>
    );
  },

  // ── horizontal rule — gradient divider with three dots ──
  horizontalrule: () => (
    <div className="flex items-center gap-3 my-12" role="separator" aria-hidden="true">
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/80 to-border/20" />
      <div className="flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-primary/30" />
        <span className="w-2 h-2 rounded-full bg-primary/60" />
        <span className="w-1 h-1 rounded-full bg-primary/30" />
      </div>
      <div className="flex-1 h-px bg-linear-to-l from-transparent via-border/80 to-border/20" />
    </div>
  ),

  // ── linebreak — <br /> node from IndentFeature / Shift+Enter ──
  linebreak: () => <br />,

  // ── tab — Tab node produced by IndentFeature when disableTabNode is NOT set ──
  tab: () => <span style={{ display: "inline-block", width: "2.5em" }} aria-hidden="true" />,

  // ── upload — media/file embedded in the content body ──
  upload: ({ node }) => {
    const uploadNode = node as SerializedUploadNode;
    const value = uploadNode.value as
      | {
          url?: string;
          filename?: string;
          mimeType?: string;
          width?: number;
          height?: number;
          alt?: string;
          filesize?: number;
        }
      | string
      | number;

    // Not yet populated — skip silently
    if (!value || typeof value !== "object") return null;

    const isImage = value.mimeType?.startsWith("image/");

    if (isImage && value.url) {
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-xl border border-border/60 shadow-sm bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.url}
              alt={value.alt ?? value.filename ?? "Uploaded image"}
              width={value.width}
              height={value.height}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          {value.filename && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.filename}
            </figcaption>
          )}
        </figure>
      );
    }

    // Non-image file — show a download card
    const sizeKB = value.filesize
      ? value.filesize > 1024 * 1024
        ? `${(value.filesize / 1024 / 1024).toFixed(1)} MB`
        : `${Math.round(value.filesize / 1024)} KB`
      : null;

    return (
      <div className="my-6 flex items-center gap-4 rounded-xl border border-border/60 bg-muted/40 px-5 py-4">
        {/* File icon */}
        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" aria-hidden="true">
            <path
              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {value.filename ?? "Download"}
          </p>
          {sizeKB && <p className="text-xs text-muted-foreground mt-0.5">{sizeKB}</p>}
        </div>
        {value.url && (
          <a
            href={value.url}
            download={value.filename}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path
                d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download
          </a>
        )}
      </div>
    );
  },

  // ── relationship — block-level link card to another Payload document ──
  relationship: ({ node }) => {
    const relNode = node as SerializedRelationshipNode;
    const value = relNode.value as
      | {
          title?: string;
          name?: string;
          slug?: string;
          meta?: { description?: string; image?: { url?: string } };
        }
      | string
      | number;

    if (!value || typeof value !== "object") return null;

    const title = value.title ?? value.name ?? "Related document";
    const description = value.meta?.description;
    const imageUrl = value.meta?.image?.url;
    const href =
      relNode.relationTo === "posts" ? `/posts/${value.slug}` : value.slug ? `/${value.slug}` : "#";

    return (
      <a
        href={href}
        className="group flex items-start gap-4 my-6 p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 no-underline"
      >
        {imageUrl && (
          <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border/40 bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {title}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
          <span className="inline-flex items-center gap-1 mt-2 text-xs text-primary font-medium">
            Read more
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </a>
    );
  },

  // ── text (all format bitmask flags) ──
  text: ({ node }) => {
    const textNode = node as SerializedTextNode;
    const format = textNode.format ?? 0;
    let content: React.ReactNode = textNode.text;

    if (format & IS_CODE) {
      content = (
        <code className="text-primary bg-primary/8 border border-primary/15 px-[5px] py-[2px] rounded text-[0.875em] font-mono font-medium tracking-tight">
          {content}
        </code>
      );
    }
    if (format & IS_BOLD) {
      content = <strong className="font-extrabold text-foreground">{content}</strong>;
    }
    if (format & IS_ITALIC) {
      content = <em className="italic text-foreground/90">{content}</em>;
    }
    if (format & IS_STRIKETHROUGH) {
      content = (
        <s className="line-through text-muted-foreground decoration-muted-foreground/60">
          {content}
        </s>
      );
    }
    if (format & IS_UNDERLINE) {
      content = (
        <u className="underline decoration-primary decoration-2 underline-offset-[3px]">
          {content}
        </u>
      );
    }
    if (format & IS_SUBSCRIPT) {
      content = <sub className="text-[0.75em] align-sub">{content}</sub>;
    }
    if (format & IS_SUPERSCRIPT) {
      content = <sup className="text-[0.75em] align-super">{content}</sup>;
    }

    return <>{content}</>;
  },

  // ── blocks (block-level) ──
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    gallery: ({ node }) => <GalleryBlock {...node.fields} />,
    videoEmbed: ({ node }) => <VideoEmbedBlock {...node.fields} />,
    quote: ({ node }) => <QuoteBlock {...node.fields} />,
    statsList: ({ node }) => <StatsListBlock {...node.fields} />,
    accordion: ({ node }) => <AccordionBlock {...node.fields} />,
    infoTable: ({ node }) => <InfoTableBlock {...node.fields} />,
  },

  // ── inlineBlocks (inline — appear mid-sentence alongside text) ──
  // Each key matches the `blockType` slug defined in BlocksFeature({ inlineBlocks: [...] })
  // Add a key here for every inlineBlock slug you add to the Posts collection config.
  inlineBlocks: {
    // ── highlight — coloured text badge ──
    // Usage: editor inserts a "highlight" inline block around selected text.
    highlight: ({ node }) => {
      const fields = (
        node as SerializedInlineBlockNode<{
          blockType: "highlight";
          color?: "yellow" | "green" | "blue" | "red";
          label?: string;
        }>
      ).fields;

      const colorMap: Record<string, string> = {
        yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
        green: "bg-green-100  text-green-800  border-green-200",
        blue: "bg-blue-100   text-blue-800   border-blue-200",
        red: "bg-red-100    text-red-800    border-red-200",
      };

      const colorClass = colorMap[fields.color ?? "yellow"] ?? colorMap.yellow;
      return (
        <mark
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[0.85em] font-medium border ${colorClass}`}
        >
          {fields.label ?? "Highlight"}
        </mark>
      );
    },

    // ── tag — a small pill label for topics / categories ──
    tag: ({ node }) => {
      const fields = (
        node as SerializedInlineBlockNode<{
          blockType: "tag";
          label?: string;
        }>
      ).fields;

      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[0.8em] font-semibold">
          <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
            <circle cx="4" cy="4" r="1.5" fill="currentColor" />
            <path
              d="M1 6.5L5.5 11l5.5-5.5-4.5-4.5H2a1 1 0 00-1 1v4.5z"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
          {fields.label ?? "Tag"}
        </span>
      );
    },

    // ── callout-inline — short inline callout phrase ──
    calloutInline: ({ node }) => {
      const fields = (
        node as SerializedInlineBlockNode<{
          blockType: "calloutInline";
          text?: string;
          variant?: "info" | "warning" | "success";
        }>
      ).fields;

      const variantMap: Record<string, string> = {
        info: "bg-blue-50 text-blue-700 border-blue-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        success: "bg-green-50 text-green-700 border-green-200",
      };

      const variantClass = variantMap[fields.variant ?? "info"] ?? variantMap.info;
      const icon = {
        info: "ℹ",
        warning: "⚠",
        success: "✓",
      }[fields.variant ?? "info"];

      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[0.85em] font-medium ${variantClass}`}
          role="note"
        >
          <span aria-hidden="true">{icon}</span>
          {fields.text ?? "Note"}
        </span>
      );
    },
  },

  // ── unknown fallback — dev-only error box, null in production ──
  unknown: unknownConverter,
});
