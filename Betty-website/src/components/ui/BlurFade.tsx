import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type MotionProps } from "motion/react";

interface BlurFadeProps extends MotionProps {
  children: ReactNode;
  className?: string;
  key?: string | number;
  duration?: number;
  delay?: number;
  offset?: number;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 12,
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  // Bij reduced-motion tonen we de inhoud direct: geen verschuiving, geen blur.
  const variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { y: offset, opacity: 0, filter: `blur(${blur})` },
        visible: { y: 0, opacity: 1, filter: "blur(0px)" },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
