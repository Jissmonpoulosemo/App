import React from "react";
import {
  Activity, Users, CalendarClock, ShieldAlert, 
  Stethoscope, FileText, Sparkles, ArrowRight, ChevronRight, 
  Heart, Shield, Award, Star, Check
} from "lucide-react";
import { PACKAGES } from "../../utils/constants";

export const Landing = ({ setView, onChoosePackage }) => {
  const getIcon = (iconName) => {
    const icons = { Heart, Shield, Award };
    return icons[iconName] || Heart;
  };

  return (
    <div className="fade-in-up">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <Sparkles size={14} />
            AI triage built for clinics
          </div>
          <h1 className="font-display hero-title">
            Know what's wrong <span className="accent">before</span> you walk in.
          </h1>
          <p className="hero-sub">
            Patients describe symptoms in plain words. Symptra reads the pattern,
            flags urgency, and hands your clinic a ready-to-review case — before
            the appointment starts.
          </p>
          <div className="hero-ctas">
            <button onClick={() => setView("checker")} className="btn-primary hero-primary-btn">
              Check my symptoms <ArrowRight size={16} />
            </button>
            <button onClick={() => setView("doctorDashboard")} className="btn-secondary">
              I run a clinic
            </button>
          </div>

          <svg viewBox="0 0 600 40" className="hero-divider">
            <path
              d="M0 20 H220 L232 4 L246 36 L260 12 L272 20 H600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pulse-line"
            />
          </svg>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          {[
            { icon: Activity, title: "AI symptom analysis", desc: "Free-text symptoms become ranked possible conditions, urgency level, and next steps in seconds." },
            { icon: Users, title: "Patient records, unified", desc: "Every check-in, visit, and note lives on one timeline your care team can trust." },
            { icon: Stethoscope, title: "Doctor-first triage queue", desc: "Cases sort themselves by urgency, so the chest pain never waits behind the skin rash." },
            { icon: CalendarClock, title: "Appointments that fit", desc: "Booking suggests the right slot and specialist based on what the AI already flagged." },
            { icon: ShieldAlert, title: "Red flag alerts", desc: "Emergency-level symptoms are surfaced instantly, not buried in a queue." },
            { icon: FileText, title: "One shared history", desc: "Patients and doctors see the same record — no retelling the story twice." },
          ].map((f, i) => (
            <div key={i} className="card feature-card">
              <div className="feature-icon">
                <f.icon size={20} />
              </div>
              <h3 className="font-display feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <h2 className="font-display page-title" style={{ textAlign: "center", fontSize: 30, marginBottom: 8 }}>
          Plans & Pricing
        </h2>
        <p className="page-sub" style={{ textAlign: "center", marginBottom: 28 }}>
          Choose what fits you — you can switch plans anytime.
        </p>
        <div className="packages-grid">
          {PACKAGES.map((p) => {
            const Icon = getIcon(p.icon);
            return (
              <div key={p.id} className={`card package-card ${p.highlight ? "highlight" : ""}`}>
                {p.highlight && (
                  <span className="package-badge">
                    <Star size={12} /> Most popular
                  </span>
                )}
                <div className={`package-icon-wrapper color-${p.color || "violet"}`}>
                  <Icon size={24} />
                </div>
                <p className="package-name font-display">{p.name}</p>
                <p className="package-price">{p.price}</p>
                <p className="package-tagline">{p.tagline}</p>
                <ul className="package-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={14} className="package-check" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={p.highlight ? "btn-primary package-btn" : "btn-outline package-btn"}
                  onClick={() => onChoosePackage(p)}
                >
                  Choose {p.name}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-inner">
          <div>
            <h3 className="font-display trust-title">
              Built to sit beside your clinicians, not replace them.
            </h3>
            <p className="trust-sub">
              Every AI result carries a confidence level and a clear disclaimer.
              Final calls always stay with your doctors.
            </p>
          </div>
          <button onClick={() => setView("checker")} className="trust-btn">
            Try the checker <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};