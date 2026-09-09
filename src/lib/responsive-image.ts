import manifest from "@/content/image-manifest.json";
import { withBasePath } from "@/lib/base-path";

type ImageRecord = { width: number; height: number; variants: { width: number; src: string }[] };

/** Original PNG remains the fallback and the source for full-resolution dialogs. */
export function responsiveImage(src: string) {
  const record = (manifest as Record<string, ImageRecord>)[src];
  return {
    srcSet: record?.variants.length ? record.variants.map(image => `${withBasePath(image.src)} ${image.width}w`).join(", ") : undefined,
    sizes: "(max-width: 960px) calc(100vw - 40px), (max-width: 1440px) 50vw, 720px",
    ...(record ? { width: record.width, height: record.height } : {}),
  };
}
