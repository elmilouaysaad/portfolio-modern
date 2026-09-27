import { Box, Typography, Stack, Card, CardContent, Link } from "@mui/material";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";

function ProjectSpecs({ specs }) {
  if (!specs?.length) return null;
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={4}
      rowGap={1.5}
      sx={{ mt: 2.5, pt: 2, borderTop: "1px dashed", borderColor: "divider" }}
    >
      {specs.map((s) => (
        <Box key={s.label}>
          <Typography
            sx={{
              fontFamily: MONO,
              color: "secondary.main",
              fontSize: "1rem",
              lineHeight: 1.3,
            }}
          >
            {s.value}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontFamily: MONO, lineHeight: 1.3 }}
          >
            {s.label}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 4,
        position: "relative",
        bgcolor: (t) =>
          t.palette.mode === "light"
            ? "rgba(9, 105, 218, 0.035)"
            : "rgba(88, 166, 255, 0.045)",
        borderLeft: "3px solid",
        borderLeftColor: "secondary.main",
        transition:
          "background-color 0.3s ease, border-color 0.3s ease, transform 0.28s ease",
        "&:hover": { transform: "translateX(4px)" },
        "&:hover .proj-num": { color: "secondary.main", opacity: 1 },
      }}
    >
      {/* Index badge, editor-style */}
      <Box
        className="proj-num"
        sx={{
          position: "absolute",
          top: 12,
          right: 14,
          fontFamily: MONO,
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "text.secondary",
          opacity: 0.55,
          transition: "color 0.25s ease, opacity 0.25s ease",
        }}
      >
        [{num}]
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          flexWrap="wrap"
          rowGap={0.5}
          sx={{ mb: 1, pr: 5 }}
        >
          <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
            {project.link ? (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener"
                underline="hover"
                color="inherit"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </Typography>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontFamily: MONO, display: "block", mb: 1.25 }}
        >
          {project.period} · {project.stack}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {project.description}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          {project.bullets.map((b) => (
            <Typography
              key={b}
              component="li"
              variant="body2"
              sx={{
                mb: 0.75,
                "&::marker": { color: "secondary.main" },
              }}
            >
              {b}
            </Typography>
          ))}
        </Box>

        <ProjectSpecs specs={project.specs} />
      </CardContent>
    </Card>
  );
}

export default function Projects({ projects }) {
  return (
    <Box id="work" sx={{ mb: 8 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: "1.5rem",
          mb: 3.5,
          pb: 1.25,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        Selected work
      </Typography>
      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} />
      ))}
    </Box>
  );
}