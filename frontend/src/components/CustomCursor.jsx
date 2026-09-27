import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return undefined;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotRef.current?.style.setProperty("--x", `${mouseX}px`);
      dotRef.current?.style.setProperty("--y", `${mouseY}px`);

      const target = e.target.closest("a, button, [role='button']");
      setHovering(Boolean(target));

      if (prefersReduced) {
        // No smoothing lag for people who've asked for reduced motion —
        // the ring just snaps to the same spot as the dot.
        ringRef.current?.style.setProperty("--x", `${mouseX}px`);
        ringRef.current?.style.setProperty("--y", `${mouseY}px`);
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ringRef.current?.style.setProperty("--x", `${ringX}px`);
      ringRef.current?.style.setProperty("--y", `${ringY}px`);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    if (!prefersReduced) raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hovering ? "cursor-dot--hover" : ""}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "cursor-ring--hover" : ""}`} />
    </>
  );
}
