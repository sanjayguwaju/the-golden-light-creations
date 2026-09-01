import React from "react";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { TypedLocale } from "payload";
import { DynamicNavbarClient } from "./DynamicNavbarClient";

export async function DynamicNavbar({ locale }: { locale: TypedLocale }) {
  const payload = await getPayload({ config: configPromise });

  // Fetch navigation global settings
  const navigation = await payload.findGlobal({
    slug: "navigation",
    depth: 2,
    locale,
  });

  return <DynamicNavbarClient navigation={navigation} locale={locale} />;
}
