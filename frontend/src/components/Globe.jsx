import { useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";

const LAND_MASK = [
  "............................................................",
  "...............#############...####..........###............",
  "............#################..###....###....###...###......",
  "......#######################...#######.###################.",
  ".....########################..#############################",
  "....#####################.##...#############################",
  "........####################..##############################",
  "........#################...################################",
  "........#################...################################",
  "........###############.....################################",
  "........#############.......################################",
  ".........##########.........################################",
  "..........#######...........################################",
  "...........######...........################################",
  "...............######.......################################",
  "..............#######.......################################",
  "..............#######.......################################",
  "..............#######.......############............########",
  "..............#######.......############............########",
  "..............######.........##########.............########",
  "..............#####..........########...............#######.",
  "..............#####......................................##.",
  "..............####......................................###.",
  "..............####..........................................",
  "............................................................",
  "####################....................####################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
];

const ROWS = LAND_MASK.length;
const COLS = LAND_MASK[0].length;

function isLand(lat, lon) {
  const row = Math.floor((90 - lat) / 6);
  let col = Math.floor((lon + 180) / 6);
  if (col < 0) col = 0;
  if (col >= COLS) col = COLS - 1;
  if (row < 0 || row >= ROWS) return false;
  return LAND_MASK[row][col] === "#";
}

function buildLandPoints(count) {
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const lat = Math.asin(y) * (180 / Math.PI);
    const lon = Math.atan2(z, x) * (180 / Math.PI);
    if (isLand(lat, lon)) points.push({ x, y, z });
  }
  return points;
}

export default function Globe({ size = 600, dotCount = 2200 }) {
  const svgRef = useRef(null);
  const points = useMemo(() => buildLandPoints(dotCount), [dotCount]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    const circles = svg.querySelectorAll("circle.globe-dot");
    const R = size / 2 - 14;
    const cx = size / 2;
    const cy = size / 2;

    let angle = 0;
    let raf;

    const tick = () => {
      angle += 0.0026;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const rx = p.x * cosA - p.z * sinA;
        const rz = p.x * sinA + p.z * cosA;
        const c = circles[i];
        if (!c) continue;

        if (rz > 0) {
          c.setAttribute("cx", (cx + rx * R).toFixed(2));
          c.setAttribute("cy", (cy - p.y * R).toFixed(2));
          c.setAttribute("opacity", (0.14 + rz * 0.86).toFixed(3));
        } else {
          c.setAttribute("opacity", "0");
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [points, size]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        color: "primary.main",
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.10" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.03" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={size / 2} cy={size / 2} r={size / 2 - 14} fill="url(#globeGlow)" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 14}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        {points.map((_, i) => (
          <circle
            key={i}
            className="globe-dot"
            r="1.6"
            fill="currentColor"
            opacity="0"
          />
        ))}
      </svg>
    </Box>
  );
}