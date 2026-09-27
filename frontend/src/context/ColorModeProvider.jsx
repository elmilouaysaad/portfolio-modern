import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "../theme";

const ColorModeContext = createContext({ mode: "light", toggleMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

function getInitialMode() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("color-mode");
  if (stored === "light" || stored === "dark") return stored;
  // Native dark mode: honor the OS/browser preference on first visit
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  // Keep the choice, and expose it on <html> so CSS (e.g. the custom
  // cursor's accent color) can react without a re-render.
  useEffect(() => {
    window.localStorage.setItem("color-mode", mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  // If the person never manually chose, keep following the OS setting live.
  useEffect(() => {
    const stored = window.localStorage.getItem("color-mode-manual");
    if (stored) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => setMode(e.matches ? "dark" : "light");
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const toggleMode = () => {
    window.localStorage.setItem("color-mode-manual", "1");
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
