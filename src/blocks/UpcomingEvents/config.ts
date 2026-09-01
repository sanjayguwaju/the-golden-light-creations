import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const UpcomingEvents: Block = {
  slug: "upcomingEvents",
  imageURL: '/blocks-preview/upcomingEvents.webp',
  imageAltText: 'UpcomingEvents block preview',
  interfaceName: "UpcomingEventsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Upcoming Events",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "events",
      type: "array",
      label: "Events",
      minRows: 1,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Event Title",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "richText",
          label: "Description",
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ["h4"] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ];
            },
          }),
        },
        {
          name: "image",
          type: "upload",
          label: "Event Image",
          relationTo: "media",
        },
        {
          name: "startDate",
          type: "date",
          label: "Start Date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
        {
          name: "endDate",
          type: "date",
          label: "End Date",
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
        {
          name: "location",
          type: "text",
          label: "Location",
          localized: true,
        },
        {
          name: "isVirtual",
          type: "checkbox",
          label: "Virtual Event",
          defaultValue: false,
        },
        {
          name: "meetingLink",
          type: "text",
          label: "Virtual Meeting Link",
          admin: {
            condition: (data, siblingData) => siblingData?.isVirtual,
          },
        },
        {
          name: "category",
          type: "select",
          label: "Category",
          options: [
            { label: "Fundraiser", value: "fundraiser" },
            { label: "Volunteer Event", value: "volunteer" },
            { label: "Workshop", value: "workshop" },
            { label: "Community Event", value: "community" },
            { label: "Conference", value: "conference" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "registrationRequired",
          type: "checkbox",
          label: "Registration Required",
          defaultValue: true,
        },
        {
          name: "registrationLink",
          type: "text",
          label: "Registration Link",
        },
        {
          name: "maxAttendees",
          type: "number",
          label: "Maximum Attendees",
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Featured Event",
          defaultValue: false,
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      label: "Layout",
      defaultValue: "list",
      options: [
        { label: "List View", value: "list" },
        { label: "Grid", value: "grid" },
        { label: "Calendar", value: "calendar" },
        { label: "Featured First", value: "featured" },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Columns (Grid only)",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.layout === "grid",
      },
    },
    {
      name: "showViewAllButton",
      type: "checkbox",
      label: "Show View All Button",
      defaultValue: true,
    },
    {
      name: "viewAllLink",
      type: "text",
      label: "View All Link",
      defaultValue: "/events",
    },
    {
      name: "maxEventsToShow",
      type: "number",
      label: "Maximum Events to Show",
      defaultValue: 6,
    },
  ],
  labels: {
    plural: "Upcoming Events Blocks",
    singular: "Upcoming Events Block",
  },
};
