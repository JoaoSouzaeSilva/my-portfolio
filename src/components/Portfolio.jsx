import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
];

const LANGUAGES = [
    "Java", "Kotlin", "JavaScript", "TypeScript", "Python", "HTML/CSS"
];

const FRAMEWORKS_TOOLS = [
    "Spring Boot", "React", "Angular", "Flutter", "AWS", "PostgreSQL", "Scrum", "Git"
];

const PROJECTS = [
    {
        title: "Critical TechWorks",
        role: "Java Backend Developer — Critical TechWorks",
        period: "Oct 2025 — Present",
        description: "Building backend services that monitor and optimize vehicle emission systems for BMW. Ensuring regulatory compliance, performance tracking, and sustainability.",
        tech: ["Java", "Spring Boot", "REST APIs", "Microservices"],
        featured: true,
    },
    {
        title: "Sandbit Platform",
        role: "Fullstack Developer — Sandbit",
        period: "Jan 2024 — Jul 2025",
        description: "Started on the backend and progressively took ownership across the full stack — from API development to building features on the mobile app and desktop platform, while keeping the product aligned with delivery goals.",
        tech: ["JavaScript", "React", "Node.js", "Mobile", "Scrum"],
        featured: true,
    },
    {
        title: "Mercedes-Benz.io Backend",
        role: "Backend Summer Intern",
        period: "Jul — Sep 2023",
        description: "Developed efficient and scalable applications using Kotlin and Spring Boot with a focus on clean code and agile workflows.",
        tech: ["Kotlin", "Spring Boot", "Agile"],
        featured: false,
    },
    {
        title: "Pinga",
        role: "Solo Developer — Side Project",
        period: "2025 — Present",
        description: "What started as a joke between friends turned into a fully-fledged social drinking tracker, now in beta. Built a cross-platform Flutter app and a Kotlin/Spring Boot REST backend from scratch — covering auth, real-time group sessions, notifications, drink logging, analytics, and automated DB archiving to Google Drive.",
        tech: ["Kotlin", "Spring Boot", "Flutter", "Dart", "PostgreSQL", "Firebase", "Docker", "Railway"],
        featured: false,
        personal: true,
        status: "Beta",
        github: "https://github.com/joaosouzaesilva",
    },
];

const EDUCATION = [
    {
        degree: "MSc Computer Science & Engineering",
        school: "NOVA SST",
        year: "2022 — 2025",
        highlight: "17/20 · Software Engineering",
    },
    {
        degree: "BSc Computer Science & Engineering",
        school: "NOVA SST",
        year: "2019 — 2022",
        highlight: "",
    },
];

/* ── Particles ───────────────────────────────────────────── */
function Particles({ dark }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w, h;

        const resize = () => {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        if (particlesRef.current.length === 0) {
            for (let i = 0; i < 50; i++) {
                particlesRef.current.push({
                    x: Math.random() * 2000,
                    y: Math.random() * 5000,
                    r: Math.random() * 2 + 0.5,
                    dx: (Math.random() - 0.5) * 0.4,
                    dy: (Math.random() - 0.5) * 0.3,
                    o: Math.random() * 0.5 + 0.1,
                });
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const ps = particlesRef.current;
            for (const p of ps) {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = dark
                    ? `rgba(52,211,153,${p.o})`
                    : `rgba(16,185,129,${p.o * 0.7})`;
                ctx.fill();
            }
            for (let i = 0; i < ps.length; i++) {
                for (let j = i + 1; j < ps.length; j++) {
                    const dx = ps[i].x - ps[j].x;
                    const dy = ps[i].y - ps[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(ps[i].x, ps[i].y);
                        ctx.lineTo(ps[j].x, ps[j].y);
                        ctx.strokeStyle = dark
                            ? `rgba(52,211,153,${0.08 * (1 - dist / 120)})`
                            : `rgba(16,185,129,${0.12 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animRef.current = requestAnimationFrame(draw);
        };
        draw();
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animRef.current);
        };
    }, [dark]);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />
    );
}

/* ── Scroll reveal ───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", style = {} }) {
    const ref = useRef(null);
    const [v, setV] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

/* ── Magnetic button ─────────────────────────────────────── */
function MagButton({ children, href, variant = "primary", dark }) {
    const ref = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const base = variant === "primary"
        ? { background: "#10b981", color: "#022c22", border: "none", fontWeight: 700 }
        : { background: "transparent", color: dark ? "#d4d4d8" : "#3f3f46", border: `1.5px solid ${dark ? "#3f3f46" : "#d4d4d8"}`, fontWeight: 600 };

    return (
        <a
            ref={ref}
            href={href}
            onMouseMove={(e) => {
                const r = ref.current.getBoundingClientRect();
                setOffset({ x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.15 });
            }}
            onMouseLeave={() => setOffset({ x: 0, y: 0 })}
            style={{
                ...base,
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", fontSize: 13, letterSpacing: "0.08em",
                textTransform: "uppercase", textDecoration: "none", cursor: "pointer",
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 0.2s ease, background 0.3s, border-color 0.3s, color 0.3s",
            }}
        >
            {children}
        </a>
    );
}

/* ══════════════════════════════════════════════════════════ */
/*  MAIN PORTFOLIO                                           */
/* ══════════════════════════════════════════════════════════ */
export default function Portfolio() {
    const [dark, setDark] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveSection(e.target.id); } },
            { threshold: 0.3 }
        );
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((s) => obs.observe(s));
        return () => obs.disconnect();
    }, []);

    const bg = dark ? "#09090b" : "#fafafa";
    const text = dark ? "#f4f4f5" : "#18181b";
    const muted = dark ? "#71717a" : "#a1a1aa";
    const subtle = dark ? "#27272a" : "#e4e4e7";
    const card = dark ? "#18181b" : "#ffffff";
    const accent = "#10b981";

    return (
        <div style={{ background: bg, color: text, fontFamily: "'Syne', sans-serif", minHeight: "100vh", transition: "background 0.5s, color 0.5s", overflowX: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(16,185,129,0.3); color: white; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 3px; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 25s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .card-hover { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s; }
        .card-hover:hover { transform: translateY(-4px); }
        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hero-heading { font-size: 48px !important; }
          .section-heading { font-size: 32px !important; }
        }
      `}</style>

            {/* ── NAV ──────────────────────────────────────────── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                backdropFilter: "blur(20px)",
                background: dark ? "rgba(9,9,11,0.8)" : "rgba(250,250,250,0.85)",
                borderBottom: `1px solid ${dark ? "rgba(63,63,70,0.4)" : "rgba(228,228,231,0.8)"}`,
                transition: "background 0.5s, border-color 0.5s",
            }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <a href="#home" style={{ fontWeight: 800, fontSize: 22, color: text, textDecoration: "none", transition: "color 0.3s" }}>
                        JSS<span style={{ color: accent }}>.</span>
                    </a>

                    {/* Desktop */}
                    <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                        <div className="mono" style={{ display: "flex", gap: 28, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                            {NAV_LINKS.map((l) => (
                                <a key={l.label} href={l.href}
                                    style={{ color: activeSection === l.href.slice(1) ? accent : muted, textDecoration: "none", transition: "color 0.3s", position: "relative", paddingBottom: 2 }}
                                >
                                    {l.label}
                                    {activeSection === l.href.slice(1) && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1.5, background: accent, borderRadius: 1 }} />}
                                </a>
                            ))}
                        </div>
                        <button onClick={() => setDark(!dark)} aria-label="Toggle theme"
                            style={{ background: dark ? "#27272a" : "#e4e4e7", border: "none", borderRadius: 20, width: 48, height: 26, cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 }}
                        >
                            <span style={{
                                position: "absolute", top: 3, left: dark ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: accent,
                                transition: "left 0.3s cubic-bezier(0.16,1,0.3,1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11,
                            }}>
                                {dark ? "🌙" : "☀️"}
                            </span>
                        </button>
                    </div>

                    {/* Mobile toggle */}
                    <div className="show-mobile" style={{ display: "none", alignItems: "center", gap: 12 }}>
                        <button onClick={() => setDark(!dark)} aria-label="Toggle theme"
                            style={{ background: dark ? "#27272a" : "#e4e4e7", border: "none", borderRadius: 20, width: 44, height: 24, cursor: "pointer", position: "relative", transition: "background 0.3s" }}
                        >
                            <span style={{
                                position: "absolute", top: 2, left: dark ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: accent,
                                transition: "left 0.3s cubic-bezier(0.16,1,0.3,1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10,
                            }}>
                                {dark ? "🌙" : "☀️"}
                            </span>
                        </button>
                        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
                            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8 }}
                        >
                            <span style={{ display: "block", width: 22, height: 1.5, background: text, transition: "transform 0.3s, opacity 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
                            <span style={{ display: "block", width: 22, height: 1.5, background: text, transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
                            <span style={{ display: "block", width: 22, height: 1.5, background: text, transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div style={{ borderTop: `1px solid ${subtle}`, background: dark ? "rgba(9,9,11,0.95)" : "rgba(250,250,250,0.95)", backdropFilter: "blur(20px)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                        {NAV_LINKS.map((l) => (
                            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="mono"
                                style={{ color: activeSection === l.href.slice(1) ? accent : muted, textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 0" }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* ── HERO ─────────────────────────────────────────── */}
            <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
                <Particles dark={dark} />
                <div style={{ position: "absolute", right: "-5%", top: "15%", width: 500, height: 500, opacity: dark ? 0.06 : 0.04, animation: "spin-slow 40s linear infinite", pointerEvents: "none" }}>
                    <svg viewBox="0 0 500 500" fill="none">
                        <circle cx="250" cy="250" r="240" stroke={accent} strokeWidth="0.5" strokeDasharray="8 6" />
                        <circle cx="250" cy="250" r="200" stroke={accent} strokeWidth="0.3" strokeDasharray="4 8" />
                        <circle cx="250" cy="250" r="160" stroke={accent} strokeWidth="0.5" />
                    </svg>
                </div>

                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 24px 80px", width: "100%", position: "relative", zIndex: 1 }}>
                    <Reveal>
                        <p className="mono" style={{ color: accent, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
                            Backend Java Developer
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="hero-heading" style={{ fontWeight: 800, fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 28 }}>
                            Hi, I'm<br />
                            <span style={{ color: accent, position: "relative", display: "inline-block" }}>
                                João
                                <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 8, overflow: "visible" }} viewBox="0 0 200 8" fill="none">
                                    <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200" style={{ animation: "dash 1.2s ease forwards 0.8s" }} />
                                </svg>
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p style={{ color: muted, fontSize: "clamp(16px, 2vw, 20px)", maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
                            I build robust backend systems and APIs with Java. Currently engineering emission services at BMW, turning complex regulatory requirements into clean, scalable solutions.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                            <MagButton href="#projects" variant="primary" dark={dark}>
                                View Projects
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </MagButton>
                            <MagButton href="#contact" variant="outline" dark={dark}>Get in Touch</MagButton>
                        </div>
                    </Reveal>
                    <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", animation: "float 2.5s ease-in-out infinite", opacity: 0.4 }}>
                        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                            <rect x="1" y="1" width="18" height="28" rx="9" stroke={muted} strokeWidth="1.5" />
                            <circle cx="10" cy="10" r="2.5" fill={accent}><animate attributeName="cy" values="10;18;10" dur="2s" repeatCount="indefinite" /></circle>
                        </svg>
                    </div>
                </div>
            </section>

            {/* ── MARQUEE ──────────────────────────────────────── */}
            <div style={{ borderTop: `1px solid ${subtle}`, borderBottom: `1px solid ${subtle}`, padding: "24px 0", overflow: "hidden", transition: "border-color 0.5s" }}>
                <div className="marquee-track" style={{ display: "flex", gap: 80, whiteSpace: "nowrap", width: "max-content" }}>
                    {[...Array(2)].flatMap((_, i) =>
                        [
                            { v: "2+", l: "Years Experience" }, { v: "3", l: "Companies" }, { v: "MSc", l: "CS & Engineering" },
                            { v: "12+", l: "Years Handball" }, { v: "Java", l: "Primary Language" }, { v: "CTW", l: "Current Company" },
                        ].map((s, j) => (
                            <div key={`${i}-${j}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ fontWeight: 800, fontSize: 28, color: accent }}>{s.v}</span>
                                <span className="mono" style={{ fontSize: 10, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</span>
                                <span style={{ color: subtle, fontSize: 20, marginLeft: 28 }}>◆</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ── ABOUT ────────────────────────────────────────── */}
            <section id="about" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
                <Reveal>
                    <p className="mono" style={{ color: accent, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>About</p>
                    <h2 className="section-heading" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", marginBottom: 48 }}>A bit about me</h2>
                </Reveal>
                <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
                    <Reveal delay={0.1}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20, color: muted, fontSize: 16, lineHeight: 1.8 }}>
                            <p>I'm a software engineer based in Lisbon, Portugal, with a passion for building reliable, performant backend systems. Currently at Critical TechWorks, I develop the services powering BMW's vehicle emission monitoring — where precision engineering and clean code go hand in hand.</p>
                            <p>My path started with a curiosity for programming in high school, leading me to both a BSc and MSc in Computer Science at NOVA SST. Along the way, I interned at Mercedes-Benz.io with Kotlin and Spring Boot, and spent time as a fullstack developer at Sandbit.</p>
                            <p>Beyond code, I've been a competitive handball player since 2013 and coached kids for five years. Sports taught me discipline, teamwork, and how to stay calm under pressure — skills that translate directly into how I approach software.</p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div>
                            <p className="mono" style={{ fontSize: 10, color: muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Languages</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                {LANGUAGES.map((t) => (
                                    <span key={t} className="mono"
                                        style={{ padding: "10px 18px", background: dark ? "#1c1c1f" : "#f4f4f5", border: `1px solid ${subtle}`, fontSize: 12, color: dark ? "#d4d4d8" : "#3f3f46", cursor: "default", transition: "border-color 0.3s, color 0.3s, background 0.3s" }}
                                        onMouseEnter={(e) => { e.target.style.borderColor = accent; e.target.style.color = accent; }}
                                        onMouseLeave={(e) => { e.target.style.borderColor = subtle; e.target.style.color = dark ? "#d4d4d8" : "#3f3f46"; }}
                                    >{t}</span>
                                ))}
                            </div>
                            <div style={{ marginTop: 28 }}>
                                <p className="mono" style={{ fontSize: 10, color: muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Frameworks & Tools</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                    {FRAMEWORKS_TOOLS.map((t) => (
                                        <span key={t} className="mono"
                                            style={{ padding: "10px 18px", background: dark ? "#1c1c1f" : "#f4f4f5", border: `1px solid ${subtle}`, fontSize: 12, color: dark ? "#d4d4d8" : "#3f3f46", cursor: "default", transition: "border-color 0.3s, color 0.3s, background 0.3s" }}
                                            onMouseEnter={(e) => { e.target.style.borderColor = accent; e.target.style.color = accent; }}
                                            onMouseLeave={(e) => { e.target.style.borderColor = subtle; e.target.style.color = dark ? "#d4d4d8" : "#3f3f46"; }}
                                        >{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ marginTop: 36 }}>
                                <p className="mono" style={{ fontSize: 10, color: muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Languages</p>
                                <div style={{ display: "flex", gap: 32 }}>
                                    <div><p style={{ fontWeight: 600, fontSize: 15 }}>Portuguese</p><p className="mono" style={{ fontSize: 11, color: muted }}>Native</p></div>
                                    <div><p style={{ fontWeight: 600, fontSize: 15 }}>English</p><p className="mono" style={{ fontSize: 11, color: muted }}>Fluent</p></div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── PROJECTS ─────────────────────────────────────── */}
            <section id="projects" style={{ background: dark ? "#0f0f12" : "#f4f4f5", padding: "100px 0", transition: "background 0.5s" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                    <Reveal>
                        <p className="mono" style={{ color: accent, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Projects</p>
                        <h2 className="section-heading" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", marginBottom: 48 }}>Selected work</h2>
                    </Reveal>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {PROJECTS.map((p, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="card-hover"
                                    style={{ background: p.personal ? (dark ? "#0d1f17" : "#f0fdf7") : card, border: `1px solid ${p.personal ? "rgba(16,185,129,0.25)" : subtle}`, padding: "36px 40px", position: "relative", overflow: "hidden", cursor: "default", transition: "background 0.5s, border-color 0.3s" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.querySelector(".ab").style.transform = "scaleY(1)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = p.personal ? "rgba(16,185,129,0.25)" : subtle; e.currentTarget.querySelector(".ab").style.transform = "scaleY(0)"; }}
                                >
                                    <div className="ab" style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: accent, transformOrigin: "top", transform: "scaleY(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                                        <div style={{ flex: 1, minWidth: 260 }}>
                                            <div className="mono" style={{ display: "flex", gap: 12, fontSize: 10, color: muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
                                                {p.featured && <span style={{ color: accent }}>Featured</span>}
                                                {p.personal && <span style={{ color: accent, border: "1px solid rgba(16,185,129,0.4)", padding: "2px 8px" }}>Personal Project</span>}
                                                {p.status && (
                                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: accent, border: "1px solid rgba(16,185,129,0.4)", padding: "2px 8px" }}>
                                                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, display: "inline-block", boxShadow: "0 0 6px rgba(16,185,129,0.8)" }} />
                                                        {p.status}
                                                    </span>
                                                )}
                                                <span>{p.period}</span>
                                            </div>
                                            <h3 style={{ fontWeight: 700, fontSize: 24, marginBottom: 6, letterSpacing: "-0.01em" }}>{p.title}</h3>
                                            <p className="mono" style={{ fontSize: 12, color: muted, marginBottom: 14 }}>{p.role}</p>
                                            <p style={{ color: muted, fontSize: 15, lineHeight: 1.7, maxWidth: 480 }}>{p.description}</p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
                                                {p.tech.map((t) => (
                                                    <span key={t} className="mono" style={{ padding: "5px 12px", background: dark ? "rgba(39,39,42,0.6)" : "rgba(228,228,231,0.6)", fontSize: 10, color: muted, letterSpacing: "0.05em" }}>{t}</span>
                                                ))}
                                            </div>
                                            {p.github && (
                                                <div style={{ marginTop: 20 }}>
                                                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                                                        className="mono"
                                                        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: muted, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.3s" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.color = muted; }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                                        View on GitHub →
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── EDUCATION ────────────────────────────────────── */}
            <section id="education" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
                <Reveal>
                    <p className="mono" style={{ color: accent, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Education</p>
                    <h2 className="section-heading" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", marginBottom: 48 }}>Learning path</h2>
                </Reveal>
                <div style={{ position: "relative", paddingLeft: 40 }}>
                    <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 1, background: subtle, transition: "background 0.5s" }} />
                    {EDUCATION.map((e, i) => (
                        <Reveal key={i} delay={i * 0.15}>
                            <div style={{ marginBottom: 48, position: "relative" }}>
                                <div style={{ position: "absolute", left: -40, top: 6, width: 13, height: 13, background: accent, borderRadius: "50%", border: `3px solid ${bg}`, transition: "border-color 0.5s" }} />
                                <p className="mono" style={{ fontSize: 11, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{e.year}</p>
                                <h3 style={{ fontWeight: 700, fontSize: 24, marginBottom: 4, letterSpacing: "-0.01em" }}>{e.degree}</h3>
                                <p className="mono" style={{ color: muted, fontSize: 13, marginBottom: 8 }}>{e.school}</p>
                                {e.highlight && (
                                    <span className="mono" style={{ display: "inline-block", padding: "5px 14px", background: dark ? "#1c1c1f" : "#f4f4f5", border: `1px solid ${subtle}`, fontSize: 11, color: muted, transition: "background 0.5s, border-color 0.5s" }}>
                                        {e.highlight}
                                    </span>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── CONTACT ──────────────────────────────────────── */}
            <section id="contact" style={{ background: dark ? "#0f0f12" : "#f4f4f5", padding: "100px 0", transition: "background 0.5s" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                    <Reveal>
                        <p className="mono" style={{ color: accent, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Contact</p>
                        <h2 className="section-heading" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", marginBottom: 16 }}>Let's connect</h2>
                        <p style={{ color: muted, fontSize: 18, marginBottom: 48, maxWidth: 480 }}>Got an idea, a question, or just want to say hi? I'd love to hear from you.</p>
                    </Reveal>
                    <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
                        <Reveal delay={0.1}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                {[
                                    { label: "Email", value: "joaosouzaesilva48@gmail.com", href: "mailto:joaosouzaesilva48@gmail.com" },
                                    { label: "LinkedIn", value: "joaosouzaesilva", href: "https://linkedin.com/in/joaosouzaesilva" },
                                    { label: "GitHub", value: "joaosouzaesilva", href: "https://github.com/joaosouzaesilva" },
                                ].map((c) => (
                                    <div key={c.label}>
                                        <p className="mono" style={{ fontSize: 10, color: muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>{c.label}</p>
                                        <a href={c.href} target="_blank" rel="noopener noreferrer"
                                            style={{ color: text, textDecoration: "none", fontSize: 15, transition: "color 0.3s" }}
                                            onMouseEnter={(e) => (e.target.style.color = accent)}
                                            onMouseLeave={(e) => (e.target.style.color = text)}
                                        >{c.value} →</a>
                                    </div>
                                ))}
                                <div>
                                    <p className="mono" style={{ fontSize: 10, color: muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Location</p>
                                    <p style={{ fontSize: 15 }}>Lisbon, Portugal</p>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div style={{ border: `1px solid ${subtle}`, padding: 32, background: card, transition: "background 0.5s, border-color 0.5s" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                    <div style={{ width: 8, height: 8, background: accent, borderRadius: "50%", boxShadow: "0 0 12px rgba(16,185,129,0.5)" }} />
                                    <p className="mono" style={{ fontSize: 11, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>Open to opportunities</p>
                                </div>
                                <p style={{ color: muted, fontSize: 14, lineHeight: 1.7 }}>Always interested in challenging backend roles and interesting engineering problems. Let's talk.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ───────────────────────────────────────── */}
            <footer style={{ borderTop: `1px solid ${subtle}`, padding: "32px 24px", transition: "border-color 0.5s" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <p className="mono" style={{ fontSize: 12, color: muted }}>© {new Date().getFullYear()} João Souza e Silva</p>
                    <div style={{ display: "flex", gap: 24 }}>
                        {[
                            { label: "GitHub", href: "https://github.com/joaosouzaesilva" },
                            { label: "LinkedIn", href: "https://linkedin.com/in/joaosouzaesilva" },
                            { label: "Email", href: "mailto:joaosouzaesilva48@gmail.com" },
                        ].map((l) => (
                            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="mono"
                                style={{ fontSize: 11, color: muted, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.3s" }}
                                onMouseEnter={(e) => (e.target.style.color = accent)}
                                onMouseLeave={(e) => (e.target.style.color = muted)}
                            >{l.label}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}