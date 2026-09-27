import { useEffect, useState } from "react";
import { Box, Container, LinearProgress } from "@mui/material";
import { fetchPortfolio } from "./api";
import fallbackData from "./data/fallbackData";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Languages from "./components/Languages";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import SidePins from "./components/SidePins";
import Reveal from "./components/Reveal";
import ScrollProgress from "./components/ScrollProgress";
import CRTOverlay from "./components/CRTOverlay";

const PIN_SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "languages", label: "Languages" },
];

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchPortfolio().then((result) => {
      if (!active) return;
      setData(result || fallbackData);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading || !data?.profile) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <CustomCursor />
      <ScrollProgress />
      <CRTOverlay />
      <Nav name={data.profile.name} />
      <SidePins sections={PIN_SECTIONS} />
      <Hero profile={data.profile} stats={data.stats} />
      <Container maxWidth="md" sx={{ pt: 7 }}>
        <Reveal>
          <Projects projects={data.projects} />
        </Reveal>
        <Reveal delay={0.05}>
          <Experience id="education" title="Education" items={data.education} />
        </Reveal>
        <Reveal delay={0.05}>
          <Experience id="experience" title="Experience" items={data.experience} />
        </Reveal>
        <Reveal delay={0.05}>
          <Skills skills={data.skills} />
        </Reveal>
        <Reveal delay={0.05}>
          <Languages languages={data.languages} />
        </Reveal>
      </Container>
      <Footer profile={data.profile} />
    </Box>
  );
}