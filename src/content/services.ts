/**
 * Productized view of the capability register. Language stays bounded: these
 * describe what may be delivered and the limits of each engagement, not
 * guaranteed outcomes. Each service links to a case study that demonstrates it.
 */
export interface Service {
  index: string;
  slug: string;
  title: string;
  forWho: string;
  problem: string;
  inputs: string;
  deliverables: string[];
  boundary: string;
  /** Slug of a case study that demonstrates this service, or undefined when the
   *  supporting work lives in the archive. */
  caseStudySlug?: string;
}

export const services: Service[] = [
  {
    index: "01",
    slug: "reporting",
    title: "Dashboard & reporting systems",
    forWho:
      "Teams working from marketplace, finance or operations exports that do not yet give one consistent view.",
    problem:
      "Numbers live in several exports with different columns, statuses and periods, so every report is rebuilt by hand.",
    inputs:
      "Representative exports, field definitions, the reporting questions that matter and data-owner context.",
    deliverables: [
      "A cleaned reporting layer with documented transformations",
      "A dimensional model and a documented measure register",
      "A focused dashboard or a handover reporting register",
    ],
    boundary:
      "A dashboard cannot repair missing source history or prove a business outcome on its own.",
    caseStudySlug: "ecommerce-sales-pipeline",
  },
  {
    index: "02",
    slug: "pipelines",
    title: "Data pipelines & operational automation",
    forWho:
      "Operations and finance teams with a repeated, fragile spreadsheet process that needs to become auditable.",
    problem:
      "Repeated data handling needs explicit validation, recoverable runs and a single inspectable source of truth.",
    inputs:
      "Sample inputs, expected outputs, known failure cases, access constraints and ownership rules.",
    deliverables: [
      "A bounded transformation pipeline with validation tiers",
      "Idempotent loading and preserved audit records",
      "Tests and handover documentation",
    ],
    boundary:
      "Automation scope depends on stable inputs, permitted access and agreed exception handling; it does not replace human review.",
    caseStudySlug: "finance-etl-pipeline",
  },
  {
    index: "03",
    slug: "ai-workflows",
    title: "AI research & workflow systems",
    forWho:
      "Teams that want a research or agent workflow with visible sources and explicit authority limits.",
    problem:
      "Generated output is treated as fact when it should be reviewable work product with a traceable source register.",
    inputs:
      "The research question, permitted sources, evaluation criteria and acceptable failure boundaries.",
    deliverables: [
      "A constrained prototype with a source register",
      "Workflow rules and explicit review points",
      "A written statement of what the system does not decide",
    ],
    boundary:
      "Generated output remains reviewable work product, not verified truth or autonomous authority.",
  },
];
