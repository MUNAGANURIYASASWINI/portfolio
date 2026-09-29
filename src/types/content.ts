/**
 * Content types.
 *
 * These shapes exist to make fabrication structurally awkward:
 * a metric is a typed field (so it can never be reflowed into prose
 * and always gets consistent treatment), and every engagement carries
 * an explicit `client` (so the single-employer reality stays visible).
 *
 * SOURCE OF TRUTH: E:\yashu-resume\Yashu_Resume.pdf
 */

/** The nine test types named in the resume's "Testing" skills group. */
export type TestType =
  | "Functional"
  | "Regression"
  | "Smoke"
  | "Sanity"
  | "Exploratory"
  | "Cross-Browser"
  | "Mobile"
  | "API"
  | "LLM";

/**
 * A hard number from the resume.
 *
 * `kind` maps to the three semantic colour families, which are
 * separated by ~9x LUMINANCE (never hue) so they survive colourblind
 * simulation. Icon + label remain the primary channels.
 *
 * `kind: "capability"` is intentionally excluded — a capability label
 * must never borrow the large-metric numeral treatment, or it implies
 * a measurement that was never made.
 */
export type MetricKind = "volume" | "quality" | "impact";

export type Metric = {
  value: string;
  label: string;
  detail: string;
  kind: MetricKind;
  icon: IconName;
};

/** Semantic classification for the coverage matrix icons. */
export type IconName =
  | "gauge"
  | "shield"
  | "layers"
  | "spark"
  | "check"
  | "cross"
  | "mobile"
  | "globe"
  | "terminal"
  | "database"
  | "alert"
  | "target";

export type SkillGroup = {
  id: string;
  label: string;
  skills: readonly string[];
};

export type Engagement = {
  slug: string;
  title: string;
  /** Subtitle shown under the title on the case-study page. */
  appType: string;
  /**
   * Stated plainly, never hidden. All four engagements share one
   * employer; the framing is depth across four domains, not breadth
   * across employers.
   */
  client: string;
  period: string;
  summary: string;
  testTypes: readonly TestType[];
  /** Only scenario categories actually named in the resume. */
  scenarioCoverage: readonly string[];
  responsibilities: readonly string[];
  highlights: readonly string[];
  /** Ordering index for the home-page preview grid. */
  order: number;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  outcome: string;
  score: string;
};

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: readonly string[];
};

export type Profile = {
  name: string;
  /** The three role labels from the resume header, verbatim. */
  roles: readonly string[];
  summary: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
};
