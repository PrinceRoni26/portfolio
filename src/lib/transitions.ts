/**
 * Props for the <ViewTransition> that wraps each page. Links tagged with
 * `transitionTypes={["nav-forward"]}` (into a case study) or `["nav-back"]`
 * (back home) get a short vertical slide; every other update gets none.
 */
export const pageTransition = {
  enter: { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" },
  exit: { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" },
  default: "none",
} as const;
