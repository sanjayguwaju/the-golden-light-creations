import type { Block } from "payload";

export const StudioPageHeaderBlock: Block = {
  slug: "studioPageHeader",
  labels: {
    singular: "Studio Page Header",
    plural: "Studio Page Headers",
  },
  fields: [
    {
      name: "breadcrumb",
      type: "text",
      label: "Breadcrumb Text",
      admin: {
        description: "Text shown after 'Home >' (e.g. Portfolio)",
      },
    },
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow Text",
      defaultValue: "Captured Moments",
    },
    {
      name: "title",
      type: "text",
      label: "Main Title",
      defaultValue: "Complete",
    },
    {
      name: "highlight",
      type: "text",
      label: "Highlighted Italic Word (Gold)",
      defaultValue: "Portfolio",
    },
    {
      name: "description",
      type: "textarea",
      label: "Subheading / Description",
      defaultValue:
        "Browse our complete archive of luxury weddings, high-fashion editorials, live concerts, and cultural celebrations across Nepal.",
    },
  ],
};
