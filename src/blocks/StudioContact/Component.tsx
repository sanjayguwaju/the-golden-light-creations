import React from "react";
import { StudioContact } from "@/components/studio/StudioContact";
import { getStudioSettings } from "@/utilities/getStudioData";

export async function StudioContactBlockComponent() {
  const settings = await getStudioSettings();
  return <StudioContact contact={settings?.contact} />;
}
