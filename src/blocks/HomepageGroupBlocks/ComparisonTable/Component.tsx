import React from "react";
import type { ComparisonTableBlock as ComparisonTableBlockProps, Product } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";
import { ComparisonTable } from "@/components/home/ComparisonTable";

export const ComparisonTableBlock: React.FC<ComparisonTableBlockProps> = async (props) => {
  if (props.isEnabled === false) return null;
  
  const payload = await getPayload({ config });
  
  // Resolve products relationship
  let products: Product[] = [];
  
  if (props.products && props.products.length > 0) {
    const resolvedProducts = await Promise.all(
      props.products.map(async (p) => {
        if (typeof p === "string") {
          try {
            return await payload.findByID({
              collection: "products",
              id: p,
              depth: 1,
            });
          } catch {
            return null;
          }
        }
        return p as Product;
      })
    );
    products = resolvedProducts.filter((p): p is Product => p !== null);
  }

  // Fallback: if no products were selected, let's fetch the first 4 products from the database
  if (products.length === 0) {
    const result = await payload.find({
      collection: "products",
      limit: 4,
      depth: 1,
    });
    products = result.docs;
  }
  
  return (
    <ComparisonTable
      title={props.title}
      subheading={props.subheading ?? undefined}
      products={products}
    />
  );
};
