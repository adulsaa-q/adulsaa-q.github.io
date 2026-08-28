import { evidenceClasses, type Project } from "@/types/project";

const evidenceClassSet = new Set<string>(evidenceClasses);

export function validateProjects(projects: Project[]): string[] {
  return projects.flatMap((project) => {
    const errors: string[] = [];
    const hasSensitiveEvidence = project.evidence.some(
      (item) => item.class === "SIMULATED" || item.class === "EXPERIMENTAL",
    );

    if (hasSensitiveEvidence && project.limitations.length === 0) {
      errors.push(
        `${project.slug}: simulated or experimental work requires a visible limitation`,
      );
    }

    if (project.status === "FEATURED" && !project.repository) {
      errors.push(`${project.slug}: featured projects require a repository URL`);
    }

    project.evidence.forEach((item, index) => {
      if (!evidenceClassSet.has(item.class)) {
        errors.push(`${project.slug}: evidence ${index + 1} has an unknown class`);
      }

      if (!item.sourceUrl) {
        errors.push(`${project.slug}: evidence ${index + 1} requires a source URL`);
      }
    });

    project.artifacts.forEach((artifact, index) => {
      if (!artifact.alt.trim() || !artifact.caption.trim()) {
        errors.push(
          `${project.slug}: artifact ${index + 1} requires alt text and a caption`,
        );
      }
    });

    return errors;
  });
}
