import React from "react";
import type { StoreLocatorBlock as StoreLocatorBlockProps } from "@/payload-types";
import { StoreLocator } from "@/components/home/StoreLocator";
import { getPayload } from "payload";
import config from "@payload-config";

export const StoreLocatorBlock: React.FC<StoreLocatorBlockProps> = async (props) => {
  if (props.isEnabled === false) return null;

  const payload = await getPayload({ config });
  
  // Fetch stores from database that are marked to show on homepage
  const { docs: stores } = await payload.find({
    collection: "stores",
    where: {
      showOnHomepage: {
        equals: true,
      },
    },
    limit: 1000,
    select: {
      id: true,
      storeName: true,
      province: true,
      district: true,
      address: true,
      area: true,
      dealerType: true,
      googleMapsUrl: true,
      latitude: true,
      longitude: true,
    },
  });

  // Map to clean structure matching the component expectations
  const mappedStores = stores.map((s) => ({
    id: s.id,
    storeName: s.storeName,
    province: s.province,
    district: s.district,
    address: s.address,
    area: s.area || null,
    dealerType: s.dealerType || null,
    googleMapsUrl: s.googleMapsUrl || null,
    latitude: s.latitude || null,
    longitude: s.longitude || null,
  }));

  return (
    <StoreLocator
      title={props.title}
      subheading={props.subheading}
      initialStores={mappedStores}
    />
  );
};
