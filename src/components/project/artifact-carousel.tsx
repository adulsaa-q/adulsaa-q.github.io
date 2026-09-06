"use client";

import { useRef, useState } from "react";

import { withBasePath } from "@/lib/base-path";
import type { Artifact } from "@/types/project";

type ArtifactWithSrc = Artifact & { src: string };

type ArtifactCarouselProps = {
  projectSlug: string;
  projectName: string;
  windowTitle?: string;
  artifacts: Artifact[];
  eager?: boolean;
};

const PLATE_LABELS: Record<string, string[]> = {
  "ecommerce-sales-pipeline": [
    "01 · Overview KPIs",
    "02 · Daily & Mix",
    "03 · Hourly Heatmap",
  ],
  "shopee-thailand-analytics": [
    "01 · Sales Trends",
    "02 · Retention & Map",
    "03 · Star Schema",
  ],
};

export function ArtifactCarousel({
  projectSlug,
  projectName,
  windowTitle,
  artifacts,
  eager = false,
}: ArtifactCarouselProps) {
  const validArtifacts = artifacts.filter(
    (item): item is ArtifactWithSrc => Boolean(item.src),
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  if (validArtifacts.length === 0) {
    return null;
  }

  const activeArtifact = validArtifacts[activeIndex] ?? validArtifacts[0];
  const totalCount = validArtifacts.length;

  const defaultTitle =
    projectSlug === "ecommerce-sales-pipeline"
      ? "models/ecommerce_sales_model.pbix"
      : projectSlug === "shopee-thailand-analytics"
      ? "reports/shopee_multi_shop_analytics.pbix"
      : "artifacts/system_artifact";

  const displayTitle = windowTitle || defaultTitle;
  const labels = PLATE_LABELS[projectSlug] || validArtifacts.map((_, i) => `0${i + 1} · Plate ${i + 1}`);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalCount) % totalCount);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalCount);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(totalCount - 1);
    }
  };

  return (
    <div className="project-visual artifact-carousel" onKeyDown={handleKeyDown}>
      <div className="project-visual__window">
        {/* Window Top Bar */}
        <div className="project-visual__window-bar">
          <div className="project-visual__dots" aria-hidden="true">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>

          <span className="project-visual__window-title" title={displayTitle}>
            {displayTitle}
          </span>

          <div className="artifact-carousel__controls">
            {totalCount > 1 && (
              <div className="artifact-carousel__pagination" aria-label="Slide counter">
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
                </span>
                <div className="artifact-carousel__nav-btns">
                  <button
                    type="button"
                    className="artifact-carousel__nav-btn"
                    onClick={handlePrev}
                    aria-label={`Previous plate, currently on ${labels[activeIndex]}`}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="artifact-carousel__nav-btn"
                    onClick={handleNext}
                    aria-label={`Next plate, currently on ${labels[activeIndex]}`}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
            <button
              type="button"
              className="artifact-carousel__zoom-btn"
              onClick={() => dialogRef.current?.showModal()}
              aria-label={`Enlarge plate: ${activeArtifact.alt}`}
            >
              <span aria-hidden="true">⤢</span> Zoom
            </button>
          </div>
        </div>

        {/* Segmented Tab Strip */}
        {totalCount > 1 && (
          <div
            className="artifact-carousel__tabs"
            role="tablist"
            ref={tabListRef}
            aria-label={`${projectName} analytical plates`}
          >
            {validArtifacts.map((artifact, index) => {
              const isSelected = index === activeIndex;
              const label = labels[index] || `0${index + 1} · Plate`;
              return (
                <button
                  key={artifact.src}
                  type="button"
                  role="tab"
                  id={`tab-${projectSlug}-${index}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${projectSlug}-${index}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`artifact-carousel__tab ${isSelected ? "artifact-carousel__tab--active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="artifact-carousel__tab-dot" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Plate Display */}
        <div
          className="project-visual__plate-grid"
          role="tabpanel"
          id={`panel-${projectSlug}-${activeIndex}`}
          aria-labelledby={`tab-${projectSlug}-${activeIndex}`}
        >
          <figure className="project-visual__plate project-visual__plate--lead">
            <button
              type="button"
              className="artifact-carousel__image-btn"
              onClick={() => dialogRef.current?.showModal()}
              aria-label={`Click to enlarge: ${activeArtifact.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(activeArtifact.src)}
                alt={activeArtifact.alt}
                width={projectSlug === "timelimit" ? 413 : 1920}
                height={projectSlug === "timelimit" ? 255 : 1095}
                loading={eager && activeIndex === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="artifact-carousel__hover-hint" aria-hidden="true">
                Click to inspect full resolution
              </span>
            </button>
            <figcaption className="artifact-carousel__caption">
              <div className="artifact-carousel__caption-lead">
                <span className="artifact-carousel__caption-tag">
                  {activeArtifact.type}
                </span>
                <p className="artifact-carousel__caption-text">{activeArtifact.caption}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Inspection Modal Dialog */}
      <dialog
        ref={dialogRef}
        className="image-dialog"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="image-dialog__container">
          <div className="image-dialog__bar">
            <span className="image-dialog__title">
              {projectName} — {labels[activeIndex]}
            </span>
            <form method="dialog">
              <button type="submit" className="image-dialog__close-btn" aria-label="Close enlarged image">
                ✕ Close (Esc)
              </button>
            </form>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(activeArtifact.src)}
            alt={activeArtifact.alt}
            loading="lazy"
            decoding="async"
          />
          <p className="image-dialog__caption">{activeArtifact.caption}</p>
        </div>
      </dialog>
    </div>
  );
}
