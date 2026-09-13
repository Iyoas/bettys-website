import { useRef, useState, type ComponentPropsWithoutRef, type PointerEvent as ReactPointerEvent } from "react";

type MarqueeProps = ComponentPropsWithoutRef<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  draggable?: boolean;
};

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  draggable = false,
  ...props
}: MarqueeProps) {
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);

  const axisProp = vertical ? "clientY" : "clientX";
  const translate = (v: number) => (vertical ? `translateY(${v}px)` : `translateX(${v}px)`);

  const applyOffset = (offset: number) => {
    trackRefs.current.forEach((el) => {
      if (el) el.style.transform = translate(offset);
    });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setDragging(true);
    dragStart.current = e[axisProp];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || !dragging) return;
    dragOffset.current = e[axisProp] - dragStart.current;
    applyOffset(dragOffset.current);
  };

  const endDrag = () => {
    if (!draggable || !dragging) return;
    setDragging(false);
    dragOffset.current = 0;
    // Animatie hervat gewoon vanaf waar de CSS-cyclus staat; de tijdelijke
    // sleep-transform wordt losgelaten zodra React de style opnieuw rendert.
    trackRefs.current.forEach((el) => {
      if (el) el.style.transform = "";
    });
  };

  return (
    <div
      {...props}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      className={`group flex overflow-hidden gap-[var(--gap)] [--duration:20s] sm:[--duration:32s] [--gap:2.25rem] sm:[--gap:6rem] ${
        vertical ? "flex-col" : "flex-row"
      } ${draggable ? "touch-pan-y cursor-grab active:cursor-grabbing" : ""} ${className}`}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trackRefs.current[i] = el; }}
          aria-hidden={i > 0}
          className={`flex shrink-0 items-center justify-around gap-[var(--gap)] ${
            vertical ? "flex-col" : "flex-row"
          } ${vertical ? "animate-marquee-vertical" : "animate-marquee"} ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          } ${dragging ? "[animation-play-state:paused]" : ""} ${
            reverse ? "[animation-direction:reverse]" : ""
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
