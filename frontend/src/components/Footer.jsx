import { Box, Container, Stack, Typography, Link } from "@mui/material";

export default function Footer({ profile }) {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider" }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={1}>
          <Typography variant="body2" color="text.secondary">
            {profile.name} — {profile.location}
          </Typography>
          <Link href={`mailto:${profile.email}`} variant="body2" color="text.primary" underline="hover">
            Get in touch
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
