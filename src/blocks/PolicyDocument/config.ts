import type { Block } from "payload";

export const PolicyDocument: Block = {
  slug: "policyDocument",
  interfaceName: "PolicyDocumentBlock",
  labels: {
    singular: "Policy Document Block",
    plural: "Policy Document Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Document Title",
      required: true,
      localized: true,
    },
    {
      name: "lastUpdated",
      type: "date",
      label: "Last Updated Date",
    },
    {
      name: "content",
      type: "richText",
      label: "Policy Content",
      localized: true,
      required: true,
    },
  ],
};
