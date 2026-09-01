import type { GlobalAfterChangeHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateGlobal =
  (slug: string): GlobalAfterChangeHook =>
  ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating global: ${slug}`);
      try {
        revalidateTag(`global_${slug}`);
        revalidatePath("/", "layout");
      } catch {
        // Ignored when called outside Next.js request context (e.g. CLI scripts)
      }
    }

    return doc;
  };
