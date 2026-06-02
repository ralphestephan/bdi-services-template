"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Reusable scroll-reveal: fades + lifts content in once as it enters the
// viewport. Used to give inner-page sections the premium SaaS scroll feel
// without restructuring their markup — just wrap a section/block in <Reveal>.

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
