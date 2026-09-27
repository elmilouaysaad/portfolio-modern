import { Box, Typography, Grid, Stack, Chip } from "@mui/material";

export default function Skills({ skills }) {
  return (
    <Box id="skills" sx={{ mb: 8 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: "1.5rem", mb: 3.5, pb: 1.25, borderBottom: "1px solid", borderColor: "divider" }}
      >
        Skills
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(skills).map(([category, items]) => (
          <Grid item xs={12} sm={6} key={category}>
            <Typography
              variant="overline"
              sx={{
                display: "block",
                fontFamily: "'IBM Plex Mono', monospace",
                color: "secondary.main",
                fontSize: "0.78rem",
                letterSpacing: 0,
                textTransform: "none",
                mb: 1,
              }}
            >
              {category}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {items.map((item) => (
                <Chip key={item} label={item} variant="outlined" size="small" />
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
