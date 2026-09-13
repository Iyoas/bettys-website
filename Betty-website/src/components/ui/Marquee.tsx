import type { ComponentPropsWithoutRef } from "react";

type MarqueeProps = ComponentPropsWithoutRef<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
};

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={`group flex overflow-hidden gap-[var(--gap)] [--duration:32s] [--gap:2.25rem] sm:[--gap:6rem] ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={`flex shrink-0 items-center justify-around gap-[var(--gap)] ${
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row"
          } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""} ${
            reverse ? "[animation-direction:reverse]" : ""
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
