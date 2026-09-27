import { useEffect, useRef, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import DNAHelix from "./DNAHelix";

export default function SidePins({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [hovered, setHovered] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const lockUntilRef = useRef(0);
  const scrollStopRef = useRef(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      if (Date.now() < lockUntilRef.current) return;

      const viewportCenter = window.innerHeight / 2;

      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= viewportCenter) current = s.id;
      }

      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      if (atBottom) current = sections[sections.length - 1]?.id;

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      // Mark scrolling active and (re)schedule the idle fallback.
      setScrolling(true);
      if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
      scrollStopRef.current = window.setTimeout(() => {
        setScrolling(false);
      }, 350);

      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);
    lockUntilRef.current = Date.now() + 800;

    const rect = el.getBoundingClientRect();
    const targetTop =
      window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;

    const maxTop = document.documentElement.scrollHeight - window.innerHeight;
    const clampedTop = Math.max(0, Math.min(maxTop, targetTop));

    window.scrollTo({ top: clampedTop, behavior: "smooth" });
  };

  // Three-tier opacity: idle < scrolling < hover
  const idleOpacity = 0.25;
  const scrollOpacity = 0.6;
  const hoverOpacity = 1;

  const opacity = hovered
    ? hoverOpacity
    : scrolling
    ? scrollOpacity
    : idleOpacity;

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      sx={{
        position: "fixed",
        right: { sm: 24, md: 40 },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1200,
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        m: -2,
        opacity,
        // Slightly faster fade-in when revealing, slower fade-out when idle,
        // so scrolling feels responsive and settling feels calm.
        transition: hovered
          ? "opacity 0.2s ease"
          : "opacity 0.45s ease",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
          py: 3,
          px: 2,
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 56,
            opacity: (t) => (t.palette.mode === "dark" ? 0.55 : 0.4),
            pointerEvents: "none",
            zIndex: 0,
            transition: "opacity 0.35s ease",
          }}
        >
          <DNAHelix />
        </Box>

        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <Tooltip key={s.id} title={s.label} placement="left" arrow>
              <Box
                component="button"
                type="button"
                onClick={() => scrollTo(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: 12,
                  height: 12,
                  p: 0,
                  border: "1px solid",
                  borderColor: isActive ? "secondary.main" : "primary.main",
                  bgcolor: isActive ? "secondary.main" : "background.paper",
                  backgroundImage: isActive
                    ? "none"
                    : (t) =>
                        `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${t.palette.primary.main} 100%)`,
                  opacity: isActive ? 1 : 0.7,
                  boxShadow: (t) =>
                    `0 0 0 2px ${t.palette.background.default}`,
                  transform: "rotate(45deg) scale(1)",
                  transition:
                    "transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1.4), border-color 0.25s ease, background-color 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "rotate(0deg) scale(1.6)",
                    borderColor: "secondary.main",
                    opacity: 1,
                    boxShadow: (t) =>
                      `0 0 0 3px ${t.palette.background.default}, 0 0 12px ${t.palette.secondary.main}`,
                  },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "secondary.main",
                    outlineOffset: "4px",
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}