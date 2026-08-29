"use client";

import { useRef } from "react";

import { withBasePath } from "@/lib/base-path";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Load immediately instead of lazily — for prominent, near-the-top images. */
  eager?: boolean;
};

/**
 * A committed screenshot that opens full-size in a native <dialog> on click.
 * Dashboards are unreadable at card width; this lets the visitor inspect the
 * detail. Native <dialog> handles focus trapping and Escape. Plain <img> —
 * the static export sets images.unoptimized, so next/image adds nothing.
 */
export function ZoomableImage({ src, alt, width, height, eager = false }: ZoomableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resolved = withBasePath(src);

  return (
    <>
      <button
        type="button"
        className="zoomable-image"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Enlarge image: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolved}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
        <span aria-hidden="true" className="zoomable-image__hint">
          Enlarge
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className="image-dialog"
        onClick={() => dialogRef.current?.close()}
      >
        {/* Full-size inspection view, loaded only when the dialog opens. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={resolved} alt={alt} loading="lazy" decoding="async" />
        <form method="dialog">
          <button type="submit" aria-label="Close enlarged image">
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
