// Mirrors the shape returned by GET /api/portfolio.
// Used automatically if the FastAPI backend isn't reachable.
const fallbackData = {
  profile: {
    name: "Saad Elmilouay",
    tagline:
      "Computer science student building applied ML systems and full-stack software — from cross-resolution vehicle re-identification research to secure institutional platforms.",
    email: "S.Elmilouay@aui.ma",
    github: "https://github.com/elmilouaysaad",
    linkedin: "https://www.linkedin.com/in/saad-elmilouay-49855a274",
    location: "Ifrane, Morocco",
  },
  stats: [
    { value: "+25.9%", label: "retrieval accuracy vs. best baseline (CRCD)" },
    { value: "4×", label: "smaller model, 4× fewer FLOPs" },
    { value: "2.54ms", label: "CPU inference latency" },
  ],
  projects: [
    {
      title: "CRCD — Cross-Resolution Contrastive Dynamics",
      period: "Jan – Jun 2026",
      stack: "Python, PyTorch",
      description:
        "Capstone research addressing the resolution mismatch problem in vehicle re-identification at the network edge: matching 32×32 query crops from long-range cameras against full-resolution gallery images.",
      bullets: [
        "Benchmarked six ImageNet-pretrained backbones (ResNet-50, ViT-B/16, Swin-T, OSNet, MobileNetV3, DenseNet121) under a deterministic synthetic degradation pipeline on VeRi-776.",
        "Designed CRCD — a MobileNetV3-Small backbone with a supervised contrastive loss applied across the low-resolution / high-resolution boundary — outperforming the best fine-tuned baseline while running far lighter and faster.",
        "Built the full training and evaluation pipeline: two-stream batching, batch-hard triplet mining, contrastive alignment, and CPU latency profiling against a 100ms edge-deployment constraint.",
      ],
      specs: [
        { value: "21.64%", label: "mAP achieved" },
        { value: "25.9%", label: "relative gain over baseline" },
        { value: "1.22M", label: "parameters" },
        { value: "2.54ms", label: "CPU latency" },
      ],
      featured: true,
      link: "https://github.com/elmilouaysaad",
    },
    {
      title: "Estus",
      period: "Jan – May 2025",
      stack: "OpenStack, Docker, JavaScript, MongoDB",
      description:
        "A dual-portal web platform for public healthcare, connecting patients and providers on a single system built with Nova.",
      bullets: [
        "Implemented Role-Based Access Control (RBAC) and end-to-end encryption to secure sensitive patient data.",
      ],
      featured: false,
    },
    {
      title: "Institutional Systems — Al Akhawayn University",
      period: "2025 – 2026",
      stack: "LeafletJs",
      description:
        "Built as part-time software developer for the university's internal communication department.",
      bullets: [
        "A wayfinding application using LeafletJs to streamline navigation across the institutional campus.",
        "A secure communication portal with end-to-end anonymity, enabling confidential staff reporting and improving organizational transparency.",
      ],
      featured: false,
    },
  ],
  experience: [
    {
      title: "Software Developer",
      org: "Al Akhawayn University",
      location: "Ifrane, MA",
      period: "May 2025 – Jun 2026",
      description:
        "Part-time, internal communication department. Wayfinding application and secure staff reporting portal.",
    },
    {
      title: "Website Developer",
      org: "Al Akhawayn University",
      location: "Ifrane, MA",
      period: "Sep 2024 – May 2025",
      description:
        "Maintained and updated the university site in HubSpot based on user feedback, improving usability and adapting to evolving internal requirements.",
    },
    {
      title: "Tutor",
      org: "Center for Learning Excellence",
      location: "Ifrane, MA",
      period: "Sep 2023 – Jul 2024",
      description:
        "One-to-one tutoring in Computer Science, Data Structures, Algorithms, Linear Algebra, and Discrete Math for 160+ students.",
    },
  ],
  education: [
    {
      title: "B.S. Computer Science, Minor in Business Administration",
      org: "Al Akhawayn University · Ifrane, MA · GPA 3.85",
      period: "2022 – 2026",
    },
    {
      title: "Exchange Semester — AI Specialization",
      org: "University of Helsinki · Helsinki, Finland",
      period: "2025",
    },
  ],
  skills: {
    Languages: ["Python", "C", "SQL (Postgres)", "JavaScript", "HTML/CSS", "Java"],
    Frameworks: ["React", "Node.js", "Flask", "Material-UI", "FastAPI"],
    "Developer tools": ["Git", "Docker", "VS Code", "Visual Studio"],
    Libraries: ["pandas", "NumPy", "Matplotlib", "scikit-learn"],
  },
  // Spoken languages. Adjust names, levels, and add/remove as needed.
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent · C1" },
    { name: "French", level: "Fluent · C1" },
    { name: "Spanish", level: "Intermediate · B1" },
  ],
};

export default fallbackData;