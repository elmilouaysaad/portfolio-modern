import { useEffect, useRef } from "react";

export default function DNAHelix() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let scrollY = 0;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        a: cs.getPropertyValue("--helix-a").trim() || "#58a6ff",
        b: cs.getPropertyValue("--helix-b").trim() || "#3fb950",
      };
    };
    let colors = readColors();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const colorTimer = setInterval(() => {
      colors = readColors();
    }, 1000);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (w < 2 || h < 2) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // ~14 rungs down the column, whatever the height is.
      const rows = 14;
      const spacing = h / rows;
      const amplitude = Math.max(6, w * 0.3);
      const cx = w / 2;

      // Scroll drives the rotation. 0.006 rad per scrolled pixel.
      const phase = scrollY * 0.006;

      for (let i = 0; i < rows; i++) {
        const y = spacing * (i + 0.5);
        const p = i * 0.62 + phase;
        const x1 = cx + Math.sin(p) * amplitude;
        const x2 = cx + Math.sin(p + Math.PI) * amplitude;
        const d1 = Math.cos(p);
        const d2 = -d1;
        const front1 = Math.max(0, d1);
        const front2 = Math.max(0, d2);

        // Rung
        ctx.globalAlpha = 0.12 + 0.28 * Math.max(front1, front2);
        ctx.strokeStyle = colors.a;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Strand A
        ctx.globalAlpha = 0.2 + 0.8 * front1;
        ctx.fillStyle = colors.a;
        ctx.beginPath();
        ctx.arc(x1, y, 1.4 + front1 * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Strand B
        ctx.globalAlpha = 0.2 + 0.8 * front2;
        ctx.fillStyle = colors.b;
        ctx.beginPath();
        ctx.arc(x2, y, 1.4 + front2 * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(colorTimer);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}