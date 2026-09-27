import { Box, Container, Typography, Stack, Link } from "@mui/material";
import Globe from "./Globe";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";

export default function Hero({ profile, stats }) {
  if (!profile) {
    return (
      <Box
        id="hero"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          minHeight: { xs: "auto", md: "min(88vh, 900px)" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: MONO,
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              color: "text.secondary",
              opacity: 0.3,
            }}
          >
            Loading…
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: "border-color 0.3s ease",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: "auto", md: "min(88vh, 900px)" },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          justifyContent: "flex-end",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "72vmin",
            height: "72vmin",
            maxWidth: 960,
            maxHeight: 960,
            mr: { lg: "-18%", xl: "-8%" },
            flexShrink: 0,
            opacity: (t) => (t.palette.mode === "dark" ? 0.7 : 0.5),
          }}
        >
          <Globe />
        </Box>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          py: { xs: 10, md: 14 },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", lg: "58%" },
            animation: "heroIn 0.7s ease both",
            "@keyframes heroIn": {
              from: { opacity: 0, transform: "translateY(14px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.4rem", md: "3.6rem" }, lineHeight: 1.05, mb: 2.5 }}
          >
            {profile.name}
            {/* Blinking terminal caret */}
            <Box
              component="span"
              aria-hidden
              sx={{
                display: "inline-block",
                width: "0.55ch",
                ml: "0.15ch",
                transform: "translateY(-0.05em)",
                animation: "caretBlink 1.05s steps(1) infinite",
                "@keyframes caretBlink": {
                  "0%, 49%": { opacity: 1 },
                  "50%, 100%": { opacity: 0 },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                  opacity: 1,
                },
              }}
            >
              ▌
            </Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "54ch", fontSize: "1.05rem", mb: 4 }}
          >
            {profile.tagline}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.75, sm: 1.5 }}
            sx={{
              fontFamily: MONO,
              fontSize: "0.82rem",
              mb: 5,
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Link
              href={`mailto:${profile.email}`}
              color="text.primary"
              underline="hover"
              sx={{ wordBreak: "break-all" }}
            >
              {profile.email}
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener"
              color="text.primary"
              underline="hover"
              sx={{ wordBreak: "break-all" }}
            >
              {profile.github.replace("https://", "")}
            </Link>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              color="text.primary"
              underline="hover"
            >
              LinkedIn
            </Link>
          </Stack>

          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              pt: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
                color: "text.secondary",
                textTransform: "uppercase",
                mb: 1.75,
                "&::before": { content: '"// "' },
              }}
            >
              highlights
            </Typography>
            <Stack spacing={1}>
              {stats.map((s) => (
                <Stack
                  key={s.label}
                  direction="row"
                  spacing={2}
                  alignItems="baseline"
                  flexWrap="wrap"
                  rowGap={0}
                >
                  <Typography
                    sx={{
                      fontFamily: MONO,
                      fontSize: "1rem",
                      color: "secondary.main",
                      minWidth: "8ch",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.4 }}
                  >
                    {s.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}