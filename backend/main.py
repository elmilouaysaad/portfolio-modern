"""
Saad Elmilouay — Portfolio API
FastAPI backend serving portfolio content to the React frontend.

Run:
    pip install -r requirements.txt
    uvicorn main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Saad Elmilouay Portfolio API", version="1.0.0")

# In production, replace "*" with your deployed frontend's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


class Stat(BaseModel):
    value: str
    label: str


class ProjectSpec(BaseModel):
    value: str
    label: str


class Project(BaseModel):
    title: str
    period: str
    stack: str
    description: str
    bullets: list[str]
    specs: Optional[list[ProjectSpec]] = None
    featured: bool = False
    link: Optional[str] = None


class Role(BaseModel):
    title: str
    org: str
    location: str
    period: str
    description: str


class Education(BaseModel):
    title: str
    org: str
    period: str


class Language(BaseModel):
    name: str
    level: str


class Profile(BaseModel):
    name: str
    tagline: str
    email: str
    github: str
    linkedin: str
    location: str


class Portfolio(BaseModel):
    profile: Profile
    stats: list[Stat]
    projects: list[Project]
    experience: list[Role]
    education: list[Education]
    skills: dict[str, list[str]]
    languages: list[Language]


PORTFOLIO_DATA = Portfolio(
    profile=Profile(
        name="Saad Elmilouay",
        tagline=(
            "Full-stack software developer with experience shipping internal tools,"
            " web platforms, and applied ML systems."
        ),
        email="S.Elmilouay@aui.ma",
        github="https://github.com/elmilouaysaad",
        linkedin="https://www.linkedin.com/in/saad-elmilouay-49855a274",
        location="Marrakech, Morocco",
    ),
    stats=[
        Stat(value="3.85/4", label="GPA"),
        Stat(value="Computer Vision", label="AI Specialization"),
    ],
    projects=[
        Project(
            title="CRCD — Cross-Resolution Contrastive Dynamics",
            period="Jan – Jun 2026",
            stack="Python, PyTorch",
            description=(
                "Capstone research addressing the resolution mismatch problem in "
                "vehicle re-identification at the network edge: matching 32×32 "
                "query crops from long-range cameras against full-resolution "
                "gallery images."
            ),
            bullets=[
                "Benchmarked six ImageNet-pretrained backbones (ResNet-50, ViT-B/16, "
                "Swin-T, OSNet, MobileNetV3, DenseNet121) under a deterministic "
                "synthetic degradation pipeline on VeRi-776.",
                "Designed CRCD — a MobileNetV3-Small backbone with a supervised "
                "contrastive loss applied across the low-resolution / "
                "high-resolution boundary — outperforming the best fine-tuned "
                "baseline while running far lighter and faster.",
                "Built the full training and evaluation pipeline: two-stream "
                "batching, batch-hard triplet mining, contrastive alignment, and "
                "CPU latency profiling against a 100ms edge-deployment constraint.",
            ],
            specs=[
                ProjectSpec(value="21.64%", label="mAP achieved"),
                ProjectSpec(value="25.9%", label="relative gain over baseline"),
                ProjectSpec(value="1.22M", label="parameters"),
                ProjectSpec(value="2.54ms", label="CPU latency"),
            ],
            featured=True,
            link="https://github.com/elmilouaysaad/CRCD-Cross-Resolution-Contrastive-Loss.git",
        ),
        Project(
            title="Estus",
            period="Jan – May 2025",
            stack="OpenStack, Docker, JavaScript, MongoDB",
            description=(
                "A dual-portal web platform for public healthcare, connecting "
                "patients and providers on a single system built with Nova."
            ),
            bullets=[
                "Implemented Role-Based Access Control (RBAC) and end-to-end "
                "encryption to secure sensitive patient data.",
            ],
            featured=False,
            link="https://github.com/elmilouaysaad/Estus.git",
        ),
        Project(
            title="Wayfinding System — Al Akhawayn University",
            period="2025 – 2026",
            stack="LeafletJs",
            description=(
                "Built as part-time software developer for the university's "
                "internal communication department."
            ),
            bullets=[
                "A wayfinding application using LeafletJs to streamline navigation "
                "across the institutional campus.",
            ],
            featured=False,
        ),
        Project(
            title="Suggestion/Complaint System — Al Akhawayn University",
            period="2026",
            stack="Node.js, React, PostgreSQL",
            description=(
                "Built as part-time software developer for the university's "
                "internal communication department."
            ),
            bullets=[
                    "A secure staff reporting portal for submitting suggestions and complaints, "
                    "ensuring a safe and confidential environment for feedback.",
                    "Ensures ease of use and accessibility for all staff members, promoting a culture of open communication.",
                    "Provides a Dashboard for administrators to view and analyze the feedback."
            ],
            featured=False,
        ),
        Project(
            title="Event Feedback System — Al Akhawayn University",
            period="2026",
            stack="React, PostgreSQL",
            description=(
                "Built as part-time software developer for the university's "
                "internal communication department."
            ),
            bullets=[
                "A feedback system for events organized by the university,"
                " allowing attendees to provide their opinions and suggestions.",

            ],
            featured=False,
        ),
    ],
    experience=[
        Role(
            title="Software Developer",
            org="Al Akhawayn University",
            location="Ifrane, MA",
            period="May 2025 – Jun 2026",
            description=(
                "Part-time, internal communication department. Wayfinding "
                "application and secure staff reporting portal."
            ),
        ),
        Role(
            title="Website Developer",
            org="Al Akhawayn University",
            location="Ifrane, MA",
            period="Sep 2024 – May 2025",
            description=(
                "Maintained and updated the university site in HubSpot based on "
                "user feedback, improving usability and adapting to evolving "
                "internal requirements."
            ),
        ),
        Role(
            title="Tutor",
            org="Center for Learning Excellence",
            location="Ifrane, MA",
            period="Sep 2023 – Jul 2024",
            description=(
                "One-to-one tutoring in Computer Science, Data Structures, "
                "Algorithms, Linear Algebra, and Discrete Math for 160+ students."
            ),
        ),
    ],
    education=[
        Education(
            title="B.S. Computer Science, Minor in Business Administration",
            org="Al Akhawayn University · Ifrane, MA · GPA 3.85",
            period="2022 – 2026",
        ),
        Education(
            title="Exchange Semester — AI Specialization",
            org="University of Helsinki · Helsinki, Finland",
            period="2025",
        ),
        Education(
            title="High School Diploma - Mathematics",
            org="Hassan the Second High School · Marrakech, MA",
            period="2022",
        ),
    ],
    skills={
        "Languages": ["Python", "C", "SQL (Postgres)", "JavaScript", "HTML/CSS", "Java"],
        "Frameworks": ["React", "Node.js", "Flask", "Material-UI", "FastAPI"],
        "Developer tools": ["Git", "Docker", "VS Code", "Visual Studio"],
        "Libraries": ["pandas", "NumPy", "Matplotlib", "scikit-learn"],
    },
    languages=[
        Language(name="Arabic", level="Native"),
        Language(name="English", level="C1"),
        Language(name="French", level="B2"),
    ],
)


@app.get("/portfolio", response_model=Portfolio)
@app.get("/api/portfolio", response_model=Portfolio, include_in_schema=False)
def get_portfolio():
    return PORTFOLIO_DATA


@app.get("/")
def root():
    return {"status": "ok", "docs": "/docs"}