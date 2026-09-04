import { Plugin } from "payload";
import { payloadSidebar } from "payload-sidebar-plugin";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { beforeSyncWithSearch } from "../search/beforeSync";
import { searchFields } from "../search/fieldOverrides";
import { getServerSideURL } from "../utilities/getURL";
import { s3StoragePlugin } from "./s3";
import { mcpPlugin } from "@payloadcms/plugin-mcp";

export const plugins: Plugin[] = [
  s3StoragePlugin,
  payloadSidebar({
    // Sort order for navigation groups (lower = higher priority)
    groupOrder: {
      Studio: 1,
      "Client Inquiries": 2,
      Content: 3,
      Media: 4,
      Settings: 10,
      Tools: 15,
      Resources: 99,
    },

    // Custom icons for collections and globals
    icons: {
      portfolio: "camera",
      films: "clapperboard",
      services: "sparkles",
      testimonials: "message-square-quote",
      albums: "library",
      "contact-submissions": "mail",
      "studio-settings": "sliders-horizontal",
      "site-settings": "settings",
      users: "user-cog",
      media: "image",
      files: "file",
      pages: "file-text",
      posts: "newspaper",
      categories: "tag",
      forms: "clipboard-list",
      "form-submissions": "inbox",
      search: "search",
      "search-results": "search",
      redirects: "arrow-right-left",
    },

    // Custom navigation groups
    customGroups: [
      { label: "Studio", order: 1, defaultOpen: true },
      { label: "Client Inquiries", order: 2, defaultOpen: true },
      { label: "Content", order: 3, defaultOpen: true },
      { label: "Media", order: 4, defaultOpen: true },
      { label: "Settings", order: 10, defaultOpen: true },
      { label: "Tools", order: 15, defaultOpen: true },
    ],

    // Pinning configuration
    enablePinning: true,
    pinnedStorage: "preferences",

    // Badge color overrides
    cssVariables: {
      "--badge-red-bg": "#ef4444",
      "--badge-blue-bg": "#3b82f6",
      "--badge-green-bg": "#22c55e",
      "--badge-orange-bg": "#f97316",
      "--badge-yellow-bg": "#eab308",
      "--badge-gray-bg": "#6b7280",
    },
  }),
  formBuilderPlugin({
    formOverrides: {
      admin: {
        group: 'Client Inquiries',
      },
    },
    formSubmissionOverrides: {
      admin: {
        group: 'Client Inquiries',
      },
    },
  }),
  searchPlugin({
    collections: ["posts", "pages", "portfolio", "services"],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      admin: {
        group: 'Tools',
      },
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
  seoPlugin({
    generateURL: ({ doc }) =>
      `${getServerSideURL()}/${typeof doc?.slug === "string" ? doc.slug : ""}`,
  }),
  redirectsPlugin({
    collections: ["pages", "posts"],
    overrides: {
      admin: {
        group: 'Tools',
      },
    },
  }),
  mcpPlugin({
    collections: {
      portfolio: { enabled: true },
      films: { enabled: true },
      services: { enabled: true },
      testimonials: { enabled: true },
      media: { enabled: true },
      pages: { enabled: true },
      posts: { enabled: true },
      categories: { enabled: true },
      users: { enabled: true },
    },
    globals: {
      'studio-settings': { enabled: true },
      'site-settings': { enabled: true },
    },
  }),
];
