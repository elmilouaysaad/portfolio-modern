import { Box, Typography, Stack } from "@mui/material";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";

export default function Languages({ languages }) {
  if (!languages?.length) return null;

  return (
    <Box id="languages" sx={{ mb: 8 }}>
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
        Languages
      </Typography>

      <Stack spacing={1.25}>
        {languages.map((lang) => (
          <Box
            key={lang.name}
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1.5,
            }}
          >
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: "0.95rem",
                color: "text.primary",
                whiteSpace: "nowrap",
              }}
            >
              {lang.name}
            </Typography>

            {/* Dotted leader */}
            <Box
              sx={{
                flex: 1,
                borderBottom: "1px dotted",
                borderColor: "divider",
                transform: "translateY(-3px)",
                minWidth: 24,
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontFamily: MONO, whiteSpace: "nowrap" }}
            >
              {lang.level}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}