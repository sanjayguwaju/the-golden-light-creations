import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
  SerializedRelationshipNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";

import type { CodeBlockProps } from "@/blocks/Code/Component";
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  GalleryBlock as GalleryBlockProps,
  MediaBlock as MediaBlockProps,
  VideoEmbedBlock as VideoEmbedBlockProps,
  QuoteBlock as QuoteBlockProps,
  StatsListBlock as StatsListBlockProps,
  AccordionBlock as AccordionBlockProps,
  InfoTableBlock as InfoTableBlockProps,
} from "@/payload-types";

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedRelationshipNode
  | SerializedUploadNode
  | SerializedInlineBlockNode<{ blockType: string; blockName?: string | null }>
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | GalleryBlockProps
      | VideoEmbedBlockProps
      | QuoteBlockProps
      | StatsListBlockProps
      | AccordionBlockProps
      | InfoTableBlockProps
    >;
