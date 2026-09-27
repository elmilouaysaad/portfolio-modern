import { Box } from "@mui/material";

export default function CRTOverlay() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2002,
        pointerEvents: "none",
        userSelect: "none",
        overflow: "hidden",
        // Soft corner clipping — slightly rounds the viewport edges,
        // hinting at the CRT bezel without warping layout.
        borderRadius: { xs: 0, md: "10px" },
      }}
    >
      {/* Scanlines — horizontal, 1px dark every 3px. Faint. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "multiply",
          opacity: (t) => (t.palette.mode === "dark" ? 0.45 : 0.12),
        }}
      />

      {/* Vignette — darkens the corners, leaving the center clear. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.30) 78%, rgba(0,0,0,0.62) 100%)",
          opacity: (t) => (t.palette.mode === "dark" ? 1 : 0.55),
        }}
      />

      {/* Curvature hint — a wider, flatter ellipse that pulls the top and
          bottom edges in, mimicking the rounded glass of a CRT. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 145% 78% at 50% 50%, transparent 72%, rgba(0,0,0,0.45) 100%)",
          opacity: (t) => (t.palette.mode === "dark" ? 0.85 : 0.5),
        }}
      />

      {/* Chromatic fringe — very subtle warm/cool edges. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,60,60,0.055), transparent 8%, transparent 92%, rgba(80,140,255,0.055))",
          mixBlendMode: "screen",
          opacity: (t) => (t.palette.mode === "dark" ? 0.7 : 0.35),
        }}
      />

      {/* Phosphor flicker — barely-there breathing. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(120, 180, 255, 0.04)",
          mixBlendMode: "screen",
          animation: "crtFlicker 7.5s ease-in-out infinite",
          "@keyframes crtFlicker": {
            "0%, 100%": { opacity: 0.15 },
            "47%": { opacity: 0.15 },
            "48%": { opacity: 0.5 },
            "49%": { opacity: 0.15 },
            "72%": { opacity: 0.15 },
            "73%": { opacity: 0.42 },
            "74%": { opacity: 0.15 },
          },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            opacity: 0.15,
          },
        }}
      />

      {/* Scanline sweep — one bright line slowly crawling down, like the
          refresh of an old monitor. Very subtle. */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "22%",
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.035), transparent)",
          animation: "crtSweep 9s linear infinite",
          "@keyframes crtSweep": {
            "0%": { top: "-25%", opacity: 0 },
            "10%": { opacity: 1 },
            "90%": { opacity: 1 },
            "100%": { top: "105%", opacity: 0 },
          },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            display: "none",
          },
        }}
      />
    </Box>
  );
}