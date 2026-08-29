"use client";

import Image from "next/image";
import { useRef } from "react";

import { withBasePath } from "@/lib/base-path";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
};

/**
 * A committed screenshot that opens full-size in a native <dialog> on click.
 * Dashboards are unreadable at card width; this keeps the initial render light
 * while letting the visitor inspect the detail. Native <dialog> handles focus
 * trapping and Escape.
 */
export function ZoomableImage({ src, alt, width, height, sizes }: ZoomableImageProps) {
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
        <Image
          src={resolved}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          unoptimized
        />
        <span aria-hidden="true" className="zoomable-image__hint">
          Enlarge
        </span>
      </button>
      <dialog ref={dialogRef} className="image-dialog" onClick={() => dialogRef.current?.close()}>
        {/* Full-size inspection view, loaded only when the dialog opens. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={resolved} alt={alt} />
        <form method="dialog">
          <button type="submit" aria-label="Close enlarged image">
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
