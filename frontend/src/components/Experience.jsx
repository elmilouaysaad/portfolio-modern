import { Box, Typography, Stack } from "@mui/material";

function TimelineItem({ title, org, period, description }) {
  return (
    <Box sx={{ position: "relative", pl: 3, mb: 3.5 }}>
      <Box
        sx={{
          position: "absolute",
          left: -5,
          top: 7,
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "primary.main",
        }}
      />
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={0.25}>
        <Typography variant="h4" sx={{ fontSize: "1.05rem", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {period}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: description ? 0.75 : 0 }}>
        {org}
      </Typography>
      {description && <Typography variant="body2">{description}</Typography>}
    </Box>
  );
}

export default function Experience({ id, title, items }) {
  return (
    <Box id={id} sx={{ mb: 8 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: "1.5rem", mb: 3.5, pb: 1.25, borderBottom: "1px solid", borderColor: "divider" }}
      >
        {title}
      </Typography>
      <Box sx={{ borderLeft: "1px solid", borderColor: "divider", ml: 0.5, pl: 3 }}>
        {items.map((item) => (
          <TimelineItem
            key={item.title}
            title={item.title}
            org={item.org}
            period={item.period}
            description={item.description}
          />
        ))}
      </Box>
    </Box>
  );
}
