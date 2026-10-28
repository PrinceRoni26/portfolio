"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respects the visitor's prefers-reduced-motion setting for all animations. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
