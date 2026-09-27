import { AppBar, Toolbar, Stack, Link, Typography, Box, IconButton } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useColorMode } from "../context/ColorModeProvider";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";

const sections = [
  { id: "work", label: "work" },
  { id: "education", label: "education" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "languages", label: "languages" },
];

export default function Nav({ name }) {
  const { mode, toggleMode } = useColorMode();
  const fileName = `${name.toLowerCase().replace(/\s+/g, "-")}.tsx`;

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(13,17,23,0.85)",
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 1.5, sm: 2, md: 3 },
          justifyContent: "space-between",
          minHeight: { xs: 52, sm: 56 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1.5, sm: 2.5 }}
          sx={{ minWidth: 0 }}
        >
          <Box sx={{ display: "flex", gap: 0.75, flexShrink: 0 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#FF5F56" }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#FFBD2E" }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#27C93F" }} />
          </Box>
          <Typography
            sx={{
              fontFamily: MONO,
              fontSize: { xs: "0.72rem", sm: "0.78rem" },
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            ~/portfolio/{" "}
            <Box component="span" sx={{ color: "text.primary" }}>
              {fileName}
            </Box>
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          <Box component="nav">
            <Stack direction="row" spacing={{ xs: 1.25, sm: 2.5 }}>
              {sections.map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={scrollTo(s.id)}
                  underline="none"
                  sx={{
                    fontFamily: MONO,
                    fontSize: "0.78rem",
                    color: "text.secondary",
                    display: { xs: "none", sm: "inline" },
                    transition: "color 0.2s ease",
                    "&::before": { content: '"// "' },
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {s.label}
                </Link>
              ))}
            </Stack>
          </Box>
          <IconButton
            onClick={toggleMode}
            size="small"
            aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
            sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
          >
            {mode === "light" ? (
              <DarkModeOutlinedIcon fontSize="small" />
            ) : (
              <LightModeOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}