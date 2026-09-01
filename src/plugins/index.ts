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
      Content: 1,
      Catalog: 2,
      Media: 3,
      "Form Submissions": 4,
      Operations: 5,
      Settings: 10,
      Tools: 15,
      Resources: 99,
    },

    // Custom icons for collections and globals
    icons: {
      users: "user-cog",
      media: "image",
      pages: "file-text",
      posts: "newspaper",
      categories: "tag",
      "product-categories": "tags",
      "product-subcategories": "list-tree",
      products: "package",
      list: "list",
      staffs: "users",
      "common-form-submissions": "inbox",
      albums: "library",
      files: "file",
      colors: "palette",
      inspiration: "sparkles",
      stores: "store",
      "contact-submissions": "mail",
      careers: "briefcase",
      "job-applications": "file-signature",
      warranties: "shield-check",
      forms: "clipboard-list",
      "form-submissions": "inbox",
      search: "search",
      "search-results": "search",
      redirects: "arrow-right-left",
      "top-bar": "panel-top",
      header: "layout-template",
      navigation: "navigation",
      footer: "panel-bottom",
      "about-page": "info",
      "site-settings": "settings",
    },

    // Custom navigation links
    // customLinks: [
    //   {
    //     label: "Dashboard",
    //     href: "/admin/dashboard",
    //     group: "Tools",
    //     icon: "layout-dashboard",
    //     order: 1,
    //   },
    // ],

    // Custom navigation groups
    customGroups: [
      { label: "Content", order: 1, defaultOpen: true },
      { label: "Catalog", order: 2, defaultOpen: true },
      { label: "Media", order: 3, defaultOpen: true },
      { label: "Form Submissions", order: 4, defaultOpen: true },
      { label: "Operations", order: 5, defaultOpen: true },
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
        group: 'Form Submissions',
      },
    },
    formSubmissionOverrides: {
      admin: {
        group: 'Form Submissions',
      },
    },
  }),
  searchPlugin({
    collections: ["posts", "pages", "products"],
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
    collections: ["pages", "posts", "products"],
    overrides: {
      admin: {
        group: 'Tools',
      },
    },
  }),
  mcpPlugin({
    collections: {
      pages: { enabled: true },
      posts: { enabled: true },
      products: { enabled: true },
      stores: { enabled: true },
      colors: { enabled: true },
      categories: { enabled: true },
      media: { enabled: true },
      users: { enabled: true },
    },
    globals: {
      'site-settings': { enabled: true },
    },
  }),
];
