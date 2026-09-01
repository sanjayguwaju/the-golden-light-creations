import type { Field } from "payload";

export function bsDateDisplay(linkedFieldName: string, label?: string): Field {
  return {
    name: `${linkedFieldName}BSDisplay`,
    type: "ui",
    admin: {
      components: {
        Field: {
          // ✅ Correct Payload v3 path format: relative to src/ + #ExportName
          // Source: https://joeyates.info/posts/create-a-payloadcms-custom-slug-field/
          path: "/components/admin/BSDateDisplay#BSDateDisplay",
          // ✅ clientProps verified — serializable props only
          clientProps: { linkedFieldName, label },
        },
      },
    },
  };
}
