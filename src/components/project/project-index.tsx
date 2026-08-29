"use client";

import { useState } from "react";

import type { Project } from "@/types/project";

type ProjectIndexProps = {
  projects: Project[];
};

export function ProjectIndex({ projects }: ProjectIndexProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");

  function focusProject(slug: string) {
    setActiveSlug(slug);
    document.getElementById(`project-${slug}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <nav className="project-index" aria-label="Selected project navigator">
      <span className="project-index__label">Browse systems</span>
      <div className="project-index__controls">
        {projects.map((project, index) => (
          <button
            aria-controls={`project-${project.slug}`}
            aria-pressed={activeSlug === project.slug}
            className="project-index__button"
            key={project.slug}
            onClick={() => focusProject(project.slug)}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
