"use client";

import { useRef, useState } from "react";

import { responsiveImage } from "@/lib/responsive-image";
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
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  if (validArtifacts.length === 0) {
    return null;
  }

  const activeArtifact = validArtifacts[activeIndex] ?? validArtifacts[0];
  const totalCount = validArtifacts.length;

  const defaultTitle =
    projectSlug === "ecommerce-sales-pipeline"
      ? "E-commerce reporting · Project artifacts"
      : projectSlug === "shopee-thailand-analytics"
      ? "Shopee analytics · Project artifacts"
      : `${projectName} · Project artifact`;

  const displayTitle = windowTitle || defaultTitle;
  const labels = PLATE_LABELS[projectSlug] || validArtifacts.map((_, i) => `0${i + 1} · Plate ${i + 1}`);

  const selectPlate = (newIndex: number, focusTab = false) => {
    setActiveIndex(newIndex);
    if (focusTab && tabListRef.current) {
      const tabs = tabListRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabs[newIndex]?.focus();
    }
  };

  const handlePrev = (focusTab = false) => {
    const newIndex = (activeIndex - 1 + totalCount) % totalCount;
    selectPlate(newIndex, focusTab);
  };

  const handleNext = (focusTab = false) => {
    const newIndex = (activeIndex + 1) % totalCount;
    selectPlate(newIndex, focusTab);
  };

  const openDialog = (triggerElement?: HTMLButtonElement | null) => {
    triggerRef.current = triggerElement ?? null;
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isTabTarget = (e.target as HTMLElement)?.getAttribute?.("role") === "tab";

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev(isTabTarget);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext(isTabTarget);
    } else if (e.key === "Home") {
      e.preventDefault();
      selectPlate(0, isTabTarget);
    } else if (e.key === "End") {
      e.preventDefault();
      selectPlate(totalCount - 1, isTabTarget);
    } else if (e.key === "Escape") {
      if (dialogRef.current?.open) {
        e.preventDefault();
        closeDialog();
      }
    }
  };

  return (
    <div className="project-visual artifact-carousel" onKeyDown={handleKeyDown}>
      <div className="project-visual__window">
        {/* Window Top Bar */}
        <div className="project-visual__window-bar">
          <div className="project-visual__status-badge" aria-hidden="true">
            <span className="project-visual__status-dot" />
            <span className="project-visual__status-tag">SEMANTIC MODEL</span>
          </div>

          <span className="project-visual__window-title" title={displayTitle}>
            {displayTitle}
          </span>

          <div className="artifact-carousel__controls">
            {totalCount > 1 && (
              <div
                className="artifact-carousel__pagination"
                role="group"
                aria-label="Slide navigation"
              >
                <span
                  className="artifact-carousel__pagination-count"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">{`Slide ${activeIndex + 1} of ${totalCount}`}</span>
                  <span aria-hidden="true">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
                  </span>
                </span>
                <div className="artifact-carousel__nav-btns">
                  <button
                    type="button"
                    className="artifact-carousel__nav-btn"
                    onClick={() => handlePrev(false)}
                    aria-label={`Previous plate, currently on ${labels[activeIndex]}`}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="artifact-carousel__nav-btn"
                    onClick={() => handleNext(false)}
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
              onClick={(e) => openDialog(e.currentTarget)}
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
            aria-orientation="horizontal"
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
                  aria-controls={`panel-${projectSlug}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`artifact-carousel__tab ${isSelected ? "artifact-carousel__tab--active" : ""}`}
                  onClick={() => selectPlate(index, true)}
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
          role={totalCount > 1 ? "tabpanel" : "group"}
          id={`panel-${projectSlug}`}
          aria-labelledby={totalCount > 1 ? `tab-${projectSlug}-${activeIndex}` : undefined}
          aria-label={totalCount === 1 ? `${projectName} artifact` : undefined}
          tabIndex={0}
        >
          <figure className="project-visual__plate project-visual__plate--lead">
            <button
              type="button"
              className="artifact-carousel__image-btn"
              onClick={(e) => openDialog(e.currentTarget)}
              aria-label={`Click to enlarge: ${activeArtifact.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(activeArtifact.src)}
                alt={activeArtifact.alt}
                width={projectSlug === "timelimit" ? 413 : 1920}
                height={projectSlug === "timelimit" ? 255 : 1095}
                {...responsiveImage(activeArtifact.src)}
                loading={eager && activeIndex === 0 ? "eager" : "lazy"}
                fetchPriority={eager && activeIndex === 0 ? "high" : undefined}
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
        aria-labelledby={`dialog-title-${projectSlug}`}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeDialog();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          closeDialog();
        }}
      >
        <div className="image-dialog__container">
          <div className="image-dialog__bar">
            <span
              className="image-dialog__title"
              id={`dialog-title-${projectSlug}`}
            >
              {projectName} — {labels[activeIndex]}
            </span>
            <form
              method="dialog"
              onSubmit={(e) => {
                e.preventDefault();
                closeDialog();
              }}
            >
              <button
                type="button"
                className="image-dialog__close-btn"
                onClick={closeDialog}
                aria-label="Close enlarged image"
              >
                ✕ Close (Esc)
              </button>
            </form>
          </div>
          <div className="image-dialog__viewport">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(activeArtifact.src)}
              alt={activeArtifact.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="image-dialog__caption">{activeArtifact.caption}</p>
        </div>
      </dialog>
    </div>
  );
}
