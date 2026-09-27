import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";

const CONFETTI_COLORS = ["#58A6FF", "#3FB950", "#D29922", "#F778BA", "#79C0FF"];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const armedRef = useRef(true);
  const rafRef = useRef(0);
  const scrollStopRef = useRef(0);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      setProgress(p);

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReduced) {
        const atBottom = p > 0.985;
        if (atBottom && armedRef.current) {
          armedRef.current = false;
          setBurstKey((k) => k + 1);
        } else if (!atBottom && p < 0.9) {
          armedRef.current = true;
        }
      }
    };

    const onScroll = () => {
      setScrolling(true);
      if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
      scrollStopRef.current = window.setTimeout(() => {
        setScrolling(false);
      }, 400);

      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pct = Math.round(progress * 100);
  const nearEdges = progress < 0.02 || progress > 0.985;

  // Idle label is barely-there; scrolling reveals it.
  const labelOpacity = nearEdges ? 0 : scrolling ? 1 : 0.12;

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 2001,
        pointerEvents: "none",
      }}
    >
      {/* Track */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "divider",
          opacity: 0.35,
        }}
      />

      {/* Fill */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: `${progress * 100}%`,
          background: (t) =>
            `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
          transition: "width 0.06s linear",
        }}
      />

      {/* Diamond marker */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: `${progress * 100}%`,
          transform: "translate(-50%, -50%) rotate(45deg)",
          width: 9,
          height: 9,
          border: "1px solid",
          borderColor: "secondary.main",
          bgcolor: "background.default",
          transition: "left 0.06s linear",
        }}
      />

      {/* Percentage readout — faint when idle, clear when scrolling */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: `${progress * 100}%`,
          transform: "translateX(-50%)",
          px: 0.75,
          py: 0.25,
          fontFamily: MONO,
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          color: "secondary.main",
          bgcolor: (t) =>
            t.palette.mode === "light"
              ? "rgba(255,255,255,0.75)"
              : "rgba(13,17,23,0.75)",
          border: "1px solid",
          borderColor: "divider",
          whiteSpace: "nowrap",
          transition:
            "left 0.06s linear, opacity 0.35s ease",
          opacity: labelOpacity,
        }}
      >
        {pct}%
      </Box>

      {burstKey > 0 && <ConfettiBurst key={burstKey} />}
    </Box>
  );
}

function ConfettiBurst() {
  const [pieces] = useState(() =>
    Array.from({ length: 42 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 42 + Math.random() * 0.4;
      const distance = 60 + Math.random() * 180;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance + 20 + Math.random() * 80,
        rot: Math.random() * 720 - 360,
        size: 3 + Math.random() * 5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.08,
        duration: 0.9 + Math.random() * 0.6,
        round: Math.random() > 0.5,
      };
    })
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 1,
        height: 1,
        pointerEvents: "none",
      }}
    >
      {pieces.map((p) => (
        <Box
          key={p.id}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: p.size,
            height: p.size,
            bgcolor: p.color,
            borderRadius: p.round ? "50%" : "1px",
            opacity: 0,
            "--tx": `${p.x}px`,
            "--ty": `${p.y}px`,
            "--rot": `${p.rot}deg`,
            animation: `confettiPop ${p.duration}s cubic-bezier(0.15, 0.8, 0.3, 1) ${p.delay}s both`,
          }}
        />
      ))}
    </Box>
  );
}