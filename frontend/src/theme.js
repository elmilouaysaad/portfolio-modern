import { createTheme } from "@mui/material/styles";

const MONO = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

// "Code editor" palettes — GitHub Dark / GitHub Light syntax-inspired.
const palettes = {
  dark: {
    mode: "dark",
    primary: { main: "#58A6FF" },   // keyword blue
    secondary: { main: "#3FB950" }, // string green
    warning: { main: "#D29922" },
    info: { main: "#79C0FF" },
    success: { main: "#3FB950" },
    background: { default: "#0D1117", paper: "#161B22",pins:"#810000" },
    text: { primary: "#C9D1D9", secondary: "#8B949E" },
    divider: "#30363D",
    editor: {
      gutter: "#484F58",
      line: "rgba(88, 166, 255, 0.10)",
      gridFine: "rgba(88, 166, 255, 0.035)",
      gridCoarse: "rgba(88, 166, 255, 0.07)",
      glow: "rgba(88, 166, 255, 0.10)",
      comment: "#6E7681",
    },
  },
  light: {
    mode: "light",
    primary: { main: "#0969DA" },
    secondary: { main: "#1A7F37" },
    warning: { main: "#9A6700" },
    info: { main: "#0969DA" },
    success: { main: "#1A7F37" },
    background: { default: "#FFFFFF", paper: "#F6F8FA" },
    text: { primary: "#24292F", secondary: "#57606A" },
    divider: "#D0D7DE",
    editor: {
      gutter: "#8C959F",
      line: "rgba(9, 105, 218, 0.12)",
      gridFine: "rgba(9, 105, 218, 0.04)",
      gridCoarse: "rgba(9, 105, 218, 0.08)",
      glow: "rgba(9, 105, 218, 0.08)",
      comment: "#6E7781",
    },
  },
};

export default function getTheme(mode = "dark") {
  const palette = palettes[mode] ?? palettes.dark;
  const ed = palette.editor;

  return createTheme({
    palette,
    typography: {
      fontFamily: MONO,
      fontSize: 14,
      h1: { fontFamily: MONO, fontWeight: 600, letterSpacing: "-0.02em" },
      h2: { fontFamily: MONO, fontWeight: 600, letterSpacing: "0.02em" },
      h3: { fontFamily: MONO, fontWeight: 600 },
      h4: { fontFamily: MONO, fontWeight: 600 },
      body1: { lineHeight: 1.75 },
      body2: { lineHeight: 1.75 },
      caption: { fontFamily: MONO, letterSpacing: "0.02em" },
      overline: { fontFamily: MONO, letterSpacing: "0.16em" },
      button: { fontFamily: MONO, textTransform: "none", fontWeight: 500 },
    },
    shape: { borderRadius: 0 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background.default,
            // Blueprint graph-paper grid, very faint — like a schematic
            // canvas behind the code.
            backgroundImage: [
              `linear-gradient(${ed.gridCoarse} 1px, transparent 1px)`,
              `linear-gradient(90deg, ${ed.gridCoarse} 1px, transparent 1px)`,
              `linear-gradient(${ed.gridFine} 1px, transparent 1px)`,
              `linear-gradient(90deg, ${ed.gridFine} 1px, transparent 1px)`,
            ].join(","),
            backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
            backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
            backgroundAttachment: "fixed",
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
          "::selection": {
            backgroundColor: palette.primary.main,
            color: palette.background.default,
          },
          "*::-webkit-scrollbar": { width: 10, height: 10 },
          "*::-webkit-scrollbar-track": { backgroundColor: palette.background.default },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: palette.divider,
            border: `2px solid ${palette.background.default}`,
          },
          "*::-webkit-scrollbar-thumb:hover": { backgroundColor: palette.primary.main },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderRadius: 0,
            border: `1px solid ${palette.divider}`,
            backgroundImage: "none",
            backgroundColor: palette.background.paper,
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          },
        },
      },
      MuiButton: { styleOverrides: { root: { boxShadow: "none", borderRadius: 0 } } },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: MONO,
            fontSize: "0.72rem",
            letterSpacing: "0.02em",
            borderRadius: 0,
            height: 22,
            backgroundColor: "transparent",
            borderColor: palette.divider,
            color: palette.text.secondary,
            transition: "border-color 0.2s ease, color 0.2s ease",
            "&:hover": { borderColor: palette.primary.main, color: palette.text.primary },
          },
        },
      },
      MuiAppBar: { styleOverrides: { root: { boxShadow: "none", backgroundImage: "none" } } },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: MONO,
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            borderRadius: 0,
            border: `1px solid ${palette.divider}`,
            backgroundColor: palette.background.paper,
            color: palette.text.primary,
          },
          arrow: { color: palette.background.paper },
        },
      },
      MuiDivider: { styleOverrides: { root: { borderColor: palette.divider } } },
    },
  });
}