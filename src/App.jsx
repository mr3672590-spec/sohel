

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
 import web from "./assets/web.jpg";
import { useState, useEffect, useRef } from "react";



const services = [
  { icon: "💻", title: "Website Development", desc: "Modern and responsive websites tailored to your brand." },
  { icon: "🛒", title: "E-commerce Website", desc: "Full-featured online store development that converts." },
  { icon: "🛍️", title: "Shopify Customization", desc: "Professional Shopify store design and configuration." },
  { icon: "🚀", title: "Landing Page Design", desc: "High-converting landing pages that drive results." },
  { icon: "🔧", title: "Bug Fixing", desc: "Fast diagnosis and resolution of website issues." },
  { icon: "🔍", title: "SEO Optimization", desc: "Search engine friendly websites that rank higher." },
];

const navLinks = ["Home", "About", "Services", "Contact"];

function useTyping(words, speed = 100, pause = 1500) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const typedText = useTyping(["Web Developer", "UI Designer", "Shopify Expert", "SEO Specialist"]);

  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ email: "", service: "", message: "" });
  };

  const D = dark;

  const styles = {
    app: {
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: D ? "#0d0d0d" : "#f8f8f8",
      color: D ? "#e8e8e8" : "#1a1a1a",
      minHeight: "100vh",
      transition: "background 0.3s, color 0.3s",
    },
    header: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5%",
      height: 64,
      background: D ? "rgba(13,13,13,0.92)" : "rgba(248,248,248,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${D ? "#222" : "#e0e0e0"}`,
    },
    logo: {
      fontSize: 22, fontWeight: 700,
      background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      cursor: "pointer",
    },
    nav: {
      display: "flex", gap: 8, alignItems: "center",
    },
    navLink: active => ({
      padding: "6px 14px",
      borderRadius: 8,
      border: "none",
      background: active ? (D ? "#1e1b4b" : "#ede9fe") : "transparent",
      color: active ? "#a78bfa" : (D ? "#aaa" : "#555"),
      cursor: "pointer",
      fontSize: 14,
      fontWeight: active ? 600 : 400,
      transition: "all 0.2s",
    }),
    modeBtn: {
      background: D ? "#1a1a1a" : "#e8e8e8",
      border: `1px solid ${D ? "#333" : "#ccc"}`,
      borderRadius: 20,
      padding: "6px 14px",
      cursor: "pointer",
      fontSize: 16,
      color: D ? "#e8e8e8" : "#333",
    },
    hamburger: {
      display: "none",
      background: "none", border: "none",
      fontSize: 24, cursor: "pointer",
      color: D ? "#e8e8e8" : "#333",
    },
    hero: {
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: "80px 5% 40px",
      background: D
        ? "radial-gradient(ellipse 60% 40% at 50% 20%, #1e1b4b 0%, #0d0d0d 70%)"
        : "radial-gradient(ellipse 60% 40% at 50% 20%, #ede9fe 0%, #f8f8f8 70%)",
    },
    avatar: {
      width: 140, height: 140,
      borderRadius: "50%",
      border: "3px solid #a78bfa",
      objectFit: "cover",
      marginBottom: 24,
      background: D ? "#1e1b4b" : "#ede9fe",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 56,
    },
    heroH1: { fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.1 },
    accent: { background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroH2: { fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 500, margin: "0 0 16px", color: D ? "#bbb" : "#555", minHeight: 36 },
    cursor: { display: "inline-block", width: 2, height: "1em", background: "#a78bfa", marginLeft: 2, verticalAlign: "middle", animation: "blink 0.8s steps(1) infinite" },
    heroP: { fontSize: 16, color: D ? "#888" : "#666", marginBottom: 32, maxWidth: 480 },
    heroButtons: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 },
    btnPrimary: {
      padding: "12px 28px", borderRadius: 12, border: "none",
      background: "linear-gradient(135deg, #7c3aed, #2563eb)",
      color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
    },
    btnOutline: {
      padding: "12px 28px", borderRadius: 12,
      border: "2px solid #a78bfa",
      background: "transparent",
      color: "#a78bfa", fontSize: 15, fontWeight: 600, cursor: "pointer",
    },
    socials: { display: "flex", gap: 16 },
    socialLink: {
      width: 44, height: 44, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: D ? "#1a1a1a" : "#e8e8e8",
      border: `1px solid ${D ? "#333" : "#ccc"}`,
      fontSize: 20, textDecoration: "none",
      transition: "all 0.2s",
    },
    section: {
      padding: "80px 5%",
      maxWidth: 1100,
      margin: "0 auto",
    },
    sectionTitle: {
      fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700,
      marginBottom: 12, textAlign: "center",
    },
    titleUnderline: {
      width: 60, height: 4, borderRadius: 2,
      background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
      margin: "0 auto 48px",
    },
    aboutCard: {
      background: D ? "#111" : "#fff",
      border: `1px solid ${D ? "#222" : "#e5e5e5"}`,
      borderRadius: 20,
      padding: "40px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
    },
    aboutText: { fontSize: 16, lineHeight: 1.8, color: D ? "#bbb" : "#555" },
    statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    statCard: {
      background: D ? "#1a1a1a" : "#f5f3ff",
      borderRadius: 12, padding: "20px",
      textAlign: "center",
    },
    statNum: { fontSize: 32, fontWeight: 700, color: "#a78bfa" },
    statLabel: { fontSize: 13, color: D ? "#888" : "#666", marginTop: 4 },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 20,
    },
    serviceCard: {
      background: D ? "#111" : "#fff",
      border: `1px solid ${D ? "#222" : "#e5e5e5"}`,
      borderRadius: 16, padding: "28px",
      transition: "transform 0.2s, border-color 0.2s",
      cursor: "default",
    },
    serviceIcon: { fontSize: 36, marginBottom: 12 },
    serviceTitle: { fontSize: 17, fontWeight: 600, marginBottom: 8 },
    serviceDesc: { fontSize: 14, color: D ? "#888" : "#666", lineHeight: 1.6 },
    contactGrid: {
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
    },
    contactCard: {
      background: D ? "#111" : "#fff",
      border: `1px solid ${D ? "#222" : "#e5e5e5"}`,
      borderRadius: 20, padding: "32px",
    },
    whatsappBtn: {
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "14px 24px", borderRadius: 12,
      background: "#25d366", color: "#fff",
      textDecoration: "none", fontSize: 15, fontWeight: 600,
      marginBottom: 24,
    },
    contactInfo: { display: "flex", flexDirection: "column", gap: 16 },
    contactItem: { display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: D ? "#bbb" : "#555" },
    contactIcon: { width: 36, height: 36, borderRadius: 8, background: D ? "#1e1b4b" : "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
    form: { display: "flex", flexDirection: "column", gap: 14 },
    input: {
      padding: "12px 16px", borderRadius: 10,
      border: `1px solid ${D ? "#2a2a2a" : "#ddd"}`,
      background: D ? "#0d0d0d" : "#fafafa",
      color: D ? "#e8e8e8" : "#1a1a1a",
      fontSize: 14, outline: "none",
    },
    select: {
      padding: "12px 16px", borderRadius: 10,
      border: `1px solid ${D ? "#2a2a2a" : "#ddd"}`,
      background: D ? "#0d0d0d" : "#fafafa",
      color: D ? "#e8e8e8" : "#1a1a1a",
      fontSize: 14, outline: "none", cursor: "pointer",
    },
    textarea: {
      padding: "12px 16px", borderRadius: 10,
      border: `1px solid ${D ? "#2a2a2a" : "#ddd"}`,
      background: D ? "#0d0d0d" : "#fafafa",
      color: D ? "#e8e8e8" : "#1a1a1a",
      fontSize: 14, outline: "none", resize: "vertical", minHeight: 120,
    },
    submitBtn: {
      padding: "13px", borderRadius: 10, border: "none",
      background: "linear-gradient(135deg, #7c3aed, #2563eb)",
      color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
    },
    successMsg: {
      padding: "12px 16px", borderRadius: 10,
      background: D ? "#0d2a1a" : "#f0fdf4",
      border: "1px solid #22c55e",
      color: "#22c55e", fontSize: 14, textAlign: "center",
    },
    footer: {
      borderTop: `1px solid ${D ? "#1a1a1a" : "#e5e5e5"}`,
      padding: "40px 5%",
      textAlign: "center",
    },
    footerNav: { display: "flex", justifyContent: "center", gap: 24, marginBottom: 16, flexWrap: "wrap" },
    footerLink: { color: D ? "#888" : "#666", textDecoration: "none", fontSize: 14, cursor: "pointer" },
    footerCopy: { color: D ? "#555" : "#aaa", fontSize: 13 },
  };

  return (
    <div style={styles.app}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .service-card:hover { transform: translateY(-4px); border-color: #a78bfa !important; }
        .social-link:hover { border-color: #a78bfa !important; transform: scale(1.1); }
        .nav-link:hover { background: ${D ? "#1e1b4b" : "#ede9fe"} !important; color: #a78bfa !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .mobile-nav { display: ${menuOpen ? "flex" : "none"} !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => scrollTo("home")}>Sohel Rana</div>
        <nav className="desktop-nav" style={styles.nav}>
          {navLinks.map(l => (
            <button key={l} className="nav-link" style={styles.navLink(activeSection === l.toLowerCase())} onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={styles.modeBtn} onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
          <button className="hamburger" style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="mobile-nav" style={{
        display: "none", flexDirection: "column", position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
        background: D ? "#111" : "#fff", borderBottom: `1px solid ${D ? "#222" : "#e5e5e5"}`,
        padding: "16px 5%", gap: 4,
      }}>
        {navLinks.map(l => (
          <button key={l} className="nav-link" style={{ ...styles.navLink(activeSection === l.toLowerCase()), textAlign: "left" }} onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
        ))}
      </div>

      {/* Hero */}
      <section id="home" ref={el => sectionRefs.current.home = el} style={styles.hero}>
      <div style={styles.avatar}>
 
<img src={web} 
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    }}
  />
</div>
        <h1 style={styles.heroH1}>Hi, I'm <span style={styles.accent}>Sohel Rana</span></h1>
        <h2 style={styles.heroH2}>
          I am a <span style={styles.accent}>{typedText}</span>
          <span style={styles.cursor} />
        </h2>
        <p style={styles.heroP}>I build modern, responsive, and user-friendly websites that help businesses grow online.</p>
        <div style={styles.heroButtons}>
          <button style={styles.btnPrimary} onClick={() => scrollTo("contact")}>Hire Me</button>
          <button style={styles.btnOutline} onClick={() => scrollTo("services")}>My Services</button>
        </div>
       <div style={styles.socials}>
  <a
    href="https://www.facebook.com/profile.php?id=61586792468307"
    target="_blank"
    rel="noreferrer"
    className="social-link"
    style={styles.socialLink}
  >
    <FaFacebook />
  </a>

  <a
    href="#"
    className="social-link"
    style={styles.socialLink}
  >
    <FaInstagram />
  </a>

  <a
    href="#"
    className="social-link"
    style={styles.socialLink}
  >
    <FaLinkedin />
  </a>
</div>
      </section>

      {/* About */}
      <section id="about" ref={el => sectionRefs.current.about = el} style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <div style={styles.titleUnderline} />
          <div className="about-grid" style={styles.aboutCard}>
            <div>
              <p style={{ ...styles.aboutText, marginBottom: 20 }}>
                I'm <strong style={{ color: "#a78bfa" }}>Sohel Rana</strong>, a passionate Web Developer based in Bangladesh.
                I specialize in creating beautiful, functional, and conversion-focused websites for businesses of all sizes.
              </p>
              <p style={styles.aboutText}>
                From Business Websites and E-commerce Stores to Landing Pages and Shopify Customizations —
                I bring ideas to life with clean code and modern design.
              </p>
            </div>
            <div className="stat-grid" style={styles.statGrid}>
              {[["50+", "Projects Done"], ["4+", "Years Experience"], ["30+", "Happy Clients"], ["6", "Services"]].map(([num, label]) => (
                <div key={label} style={styles.statCard }>
                  <div style={styles.statNum}>{num}</div>
                  <div style={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={el => sectionRefs.current.services = el} style={{ padding: "80px 5%", background: D ? "#0a0a0a" : "#f2f0fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={styles.sectionTitle}>My Services</h2>
          <div style={styles.titleUnderline} />
          <div style={styles.servicesGrid}>
            {services.map(s => (
              <div key={s.title} className="service-card" style={styles.serviceCard}>
                <div style={styles.serviceIcon}>{s.icon}</div>
                <div style={styles.serviceTitle}>{s.title}</div>
                <div style={styles.serviceDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" ref={el => sectionRefs.current.contact = el} style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={styles.sectionTitle}>Contact Me</h2>
          <div style={styles.titleUnderline} />
          <div className="contact-grid" style={styles.contactGrid}>
            {/* Info side */}
            <div style={styles.contactCard}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Get In Touch</h3>
              <a href="https://wa.me/8801XXXXXXXXX" target="_blank" rel="noreferrer" style={styles.whatsappBtn}>
                💬 Chat on WhatsApp
              </a>
              <div style={styles.contactInfo}>
                {[["📧", "Email", "sohelrana@email.com"], ["📍", "Location", "Bangladesh"], ["⏰", "Response", "Within 24 hours"]].map(([icon, label, val]) => (
                  <div key={label} style={styles.contactItem}>
                    <div style={styles.contactIcon}>{icon}</div>
                    <div><div style={{ fontWeight: 500, fontSize: 13, marginBottom: 2 }}>{label}</div><div>{val}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div style={styles.contactCard}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Send a Message</h3>
              {submitted ? (
                <div style={styles.successMsg}>✅ Message sent! I'll get back to you soon.</div>
              ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                  <input style={styles.input} type="email" placeholder="Your Email" required
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <select style={styles.select} required
                    value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                    <option value="">Select Service</option>
                    {services.map(s => <option key={s.title}>{s.title}</option>)}
                  </select>
                  <textarea style={styles.textarea} placeholder="Your Message" rows={5}
                    value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <button type="submit" style={styles.submitBtn}>Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerNav}>
          {navLinks.map(l => (
            <span key={l} style={styles.footerLink} onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
          ))}
        </div>
        <p style={styles.footerCopy}>© 2026 Sohel Rana | Web Developer. All rights reserved.</p>
      </footer>
    </div>
  );
}
