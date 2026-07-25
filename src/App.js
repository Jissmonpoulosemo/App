import React, { useState, useRef } from "react";
import "./App.css";
import {
  Activity,
  Users,
  LayoutDashboard,
  CalendarClock,
  Search,
  AlertTriangle,
  CheckCircle2,
  Menu,
  X,
  Send,
  Clock,
  ShieldAlert,
  Stethoscope,
  Bell,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
  FileText,
  LogOut,
  Package,
  Check,
  Star,
  UserPlus,
  Compass,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Small building blocks                                                 */
/* ---------------------------------------------------------------------- */

const PulseMark = ({ width = 34, strokeWidth = 2.5 }) => (
  <svg viewBox="0 0 60 32" style={{ width, height: width * (32 / 60) }} fill="none">
    <path
      d="M0 16 H14 L19 6 L25 26 L31 10 L35 16 H60"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const URGENCY_META = {
  emergency: { label: "Emergency", cls: "urgency-emergency" },
  urgent: { label: "Urgent", cls: "urgency-urgent" },
  routine: { label: "Routine", cls: "urgency-routine" },
  "self-care": { label: "Self-care", cls: "urgency-self-care" },
};

const UrgencyBadge = ({ level, size = "" }) => {
  const meta = URGENCY_META[level] || URGENCY_META.routine;
  return (
    <span className={`badge ${meta.cls} ${size === "sm" ? "sm" : ""}`}>
      <span className="badge-dot" />
      {meta.label}
    </span>
  );
};

const Avatar = ({ initials, tone = "violet" }) => (
  <div className={`avatar ${tone !== "violet" ? `tone-${tone}` : ""}`}>{initials}</div>
);

/* ---------------------------------------------------------------------- */
/*  Mock clinic data (patients + seeded checks stay for demo purposes)    */
/* ---------------------------------------------------------------------- */

const MOCK_PATIENTS = [
  { id: 1, name: "Ananya Rao", age: 29, gender: "F", avatar: "AR", tone: "violet", lastVisit: "2026-07-18" },
  { id: 2, name: "Rahul Menon", age: 45, gender: "M", avatar: "RM", tone: "fuchsia", lastVisit: "2026-07-24" },
  { id: 3, name: "Priya Nair", age: 34, gender: "F", avatar: "PN", tone: "indigo", lastVisit: "2026-07-22" },
  { id: 4, name: "Thomas Varghese", age: 61, gender: "M", avatar: "TV", tone: "plum", lastVisit: "2026-07-15" },
  { id: 5, name: "Fathima Beevi", age: 52, gender: "F", avatar: "FB", tone: "violet", lastVisit: "2026-07-10" },
];

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    tagline: "Try Symptra for occasional check-ins.",
    features: ["2 AI symptom checks / month", "Standard response time", "Basic health record"],
  },
  {
    id: "plus",
    name: "Plus",
    price: "₹499/mo",
    tagline: "For families who want faster answers.",
    features: [
      "Unlimited AI symptom checks",
      "24-hour doctor review",
      "Appointment booking",
      "Up to 3 family profiles",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹999/mo",
    tagline: "Priority care, always on.",
    features: [
      "Everything in Plus",
      "Priority same-day review",
      "Dedicated care coordinator",
      "Unlimited family profiles",
    ],
  },
];

const seedCheck = (id, patientName, symptomsText, urgency, conditions, redFlags, action, reviewed, note) => ({
  id,
  patientName,
  symptomsText,
  timestamp: new Date(Date.now() - id * 36e5 * 9).toISOString(),
  result: {
    urgency,
    conditions,
    redFlags,
    recommendedAction: action,
    disclaimer: "This is not a diagnosis. Please consult a licensed doctor for confirmation and treatment.",
  },
  doctorReviewed: reviewed,
  doctorNote: note || "",
});

const INITIAL_CHECKS = [
  seedCheck(
    1,
    "Rahul Menon",
    "Tight chest pain radiating to my left arm, shortness of breath, started 20 minutes ago.",
    "emergency",
    [
      { name: "Possible cardiac event", likelihood: "high", description: "Chest pain with arm radiation and breathlessness needs urgent evaluation." },
      { name: "Severe anxiety attack", likelihood: "low", description: "Can mimic cardiac symptoms but should not be assumed." },
    ],
    ["Chest pain radiating to arm", "Shortness of breath"],
    "Call emergency services or go to the nearest ER immediately.",
    false,
    ""
  ),
  seedCheck(
    2,
    "Priya Nair",
    "Dry cough for 9 days, mild fever in the evenings, tired all the time.",
    "urgent",
    [
      { name: "Lower respiratory infection", likelihood: "moderate", description: "Persistent cough with evening fever can indicate a chest infection." },
      { name: "Post-viral cough", likelihood: "moderate", description: "Cough can linger for weeks after a viral illness." },
    ],
    ["Cough lasting over a week"],
    "Book a clinic visit within 24–48 hours for a chest check.",
    true,
    "Ordered chest X-ray, prescribed antibiotics pending review."
  ),
  seedCheck(
    3,
    "Ananya Rao",
    "Throbbing headache on one side, sensitive to light, nausea, happens most Fridays.",
    "routine",
    [
      { name: "Migraine", likelihood: "high", description: "One-sided throbbing pain with light sensitivity is a classic migraine pattern." },
      { name: "Tension headache", likelihood: "low", description: "Usually feels more like pressure than throbbing." },
    ],
    [],
    "Track triggers and book a routine neurology follow-up.",
    true,
    "Prescribed preventive medication, review in 4 weeks."
  ),
];

/* ---------------------------------------------------------------------- */
/*  Offline symptom reference (fallback when the AI call can't complete)  */
/* ---------------------------------------------------------------------- */

const LOCAL_CONDITIONS = [
  {
    keywords: ["chest pain", "shortness of breath", "arm pain", "crushing", "tight chest", "can't breathe", "cannot breathe"],
    urgency: "emergency",
    conditions: [
      { name: "Possible cardiac event", likelihood: "high", description: "Chest pain with breathlessness needs immediate evaluation." },
      { name: "Panic or anxiety attack", likelihood: "low", description: "Can mimic heart symptoms but shouldn't be assumed." },
    ],
    redFlags: ["Chest pain", "Shortness of breath"],
    recommendedAction: "Call emergency services or go to the nearest ER immediately.",
  },
  {
    keywords: ["severe headache", "worst headache", "confusion", "slurred", "one side weak", "face drooping"],
    urgency: "emergency",
    conditions: [
      { name: "Possible stroke", likelihood: "high", description: "Sudden weakness, confusion, or facial drooping needs emergency care." },
      { name: "Severe migraine", likelihood: "low", description: "Can feel intense but doesn't usually cause weakness or confusion." },
    ],
    redFlags: ["Sudden neurological symptoms"],
    recommendedAction: "Call emergency services immediately — timing matters for this.",
  },
  {
    keywords: ["fever", "sore throat", "cough", "runny nose", "congestion"],
    urgency: "routine",
    conditions: [
      { name: "Common cold or flu", likelihood: "high", description: "Fever with sore throat and cough usually points to a viral infection." },
      { name: "Strep throat", likelihood: "moderate", description: "A bacterial infection that also causes throat pain and fever." },
    ],
    redFlags: [],
    recommendedAction: "Rest, fluids, and see a doctor if fever lasts beyond 3 days.",
  },
  {
    keywords: ["headache", "light sensitivity", "nausea", "throbbing", "migraine"],
    urgency: "routine",
    conditions: [
      { name: "Migraine", likelihood: "high", description: "One-sided throbbing pain with light sensitivity fits a migraine pattern." },
      { name: "Tension headache", likelihood: "low", description: "Usually a dull pressure rather than throbbing pain." },
    ],
    redFlags: [],
    recommendedAction: "Rest in a dark, quiet room; see a doctor if it worsens or keeps recurring.",
  },
  {
    keywords: ["rash", "itch", "itchy", "skin", "hives"],
    urgency: "self-care",
    conditions: [
      { name: "Contact dermatitis", likelihood: "high", description: "A skin reaction from touching an irritant or allergen." },
      { name: "Eczema flare", likelihood: "moderate", description: "Common in people with a history of sensitive or dry skin." },
    ],
    redFlags: [],
    recommendedAction: "Avoid the irritant, use a gentle moisturizer, and see a doctor if it spreads.",
  },
  {
    keywords: ["stomach pain", "belly pain", "abdominal", "nausea", "vomiting", "lower right"],
    urgency: "urgent",
    conditions: [
      { name: "Gastroenteritis", likelihood: "high", description: "Stomach or intestinal inflammation, often from infection." },
      { name: "Appendicitis", likelihood: "moderate", description: "Sharp lower-right belly pain can indicate this; needs a prompt check." },
    ],
    redFlags: ["Severe abdominal pain"],
    recommendedAction: "See a doctor within a few hours, especially if pain is severe or one-sided.",
  },
  {
    keywords: ["dizzy", "tired", "fatigue", "standing", "lightheaded"],
    urgency: "routine",
    conditions: [
      { name: "Low blood pressure", likelihood: "moderate", description: "Dizziness on standing can point to blood pressure drops." },
      { name: "Anemia", likelihood: "moderate", description: "Low iron can cause fatigue and dizziness." },
    ],
    redFlags: [],
    recommendedAction: "Stay hydrated and book a routine check-up to rule out underlying causes.",
  },
];

function localSymptomMatch(text) {
  const lower = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  LOCAL_CONDITIONS.forEach((entry) => {
    const score = entry.keywords.filter((k) => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  });
  if (!best || bestScore === 0) {
    return {
      urgency: "routine",
      conditions: [
        {
          name: "Not enough detail to narrow down",
          likelihood: "low",
          description: "Add duration, location, and severity so this can point you in the right direction.",
        },
      ],
      redFlags: [],
      recommendedAction: "Book a routine visit so a doctor can examine you directly.",
      disclaimer: "This is not a diagnosis. Please consult a licensed doctor for confirmation and treatment.",
    };
  }
  return {
    urgency: best.urgency,
    conditions: best.conditions,
    redFlags: best.redFlags,
    recommendedAction: best.recommendedAction,
    disclaimer: "This is not a diagnosis. Please consult a licensed doctor for confirmation and treatment.",
  };
}

/* ---------------------------------------------------------------------- */
/*  Entry screen: just a name + role, no account/password required       */
/* ---------------------------------------------------------------------- */

const AuthScreen = ({ onAuth }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Enter your name to continue.");
      return;
    }
    setError("");
    onAuth({ name: name.trim(), role });
  };

  const continueAsGuest = () => {
    onAuth({ name: "Guest", role: "patient", guest: true });
  };

  return (
    <div className="login-page">
      <div className="login-card card fade-in-up">
        <div className="login-brand">
          <div className="login-brand-icon">
            <PulseMark width={38} />
          </div>
          <p className="font-display login-brand-name">Symptra</p>
        </div>

        <h1 className="font-display login-title">Welcome</h1>
        <p className="login-sub">Enter your name to check symptoms and manage your care.</p>

        <form onSubmit={submit}>
          <label className="field-label">Name</label>
          <div className="input-with-icon">
            <UserPlus size={16} className="input-icon" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya Rao"
              className="field-input with-icon"
            />
          </div>

          <label className="field-label">I am a</label>
          <div className="role-toggle" style={{ marginBottom: 16, width: "100%" }}>
            <button
              type="button"
              className={`role-toggle-btn ${role === "patient" ? "active" : ""}`}
              style={{ flex: 1 }}
              onClick={() => setRole("patient")}
            >
              Patient
            </button>
            <button
              type="button"
              className={`role-toggle-btn ${role === "doctor" ? "active" : ""}`}
              style={{ flex: 1 }}
              onClick={() => setRole("doctor")}
            >
              Clinician
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary login-submit-btn">
            Continue <ArrowRight size={16} />
          </button>
        </form>

        <button type="button" className="google-btn" style={{ marginTop: 12 }} onClick={continueAsGuest}>
          <Compass size={16} />
          Continue as guest
        </button>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Packages + confirmation                                                */
/* ---------------------------------------------------------------------- */

const PackagesScreen = ({ onChoose, onSkip }) => (
  <div className="packages-page fade-in-up">
    <div className="packages-header">
      <h1 className="font-display page-title">Pick a care plan</h1>
      <p className="page-sub">Choose what fits you — you can switch plans anytime.</p>
    </div>
    <div className="packages-grid">
      {PACKAGES.map((p) => (
        <div key={p.id} className={`card package-card ${p.highlight ? "highlight" : ""}`}>
          {p.highlight && (
            <span className="package-badge">
              <Star size={12} /> Most popular
            </span>
          )}
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
            onClick={() => onChoose(p)}
          >
            Choose {p.name}
          </button>
        </div>
      ))}
    </div>
    <div style={{ textAlign: "center", marginTop: 24 }}>
      <button className="stat-cta" style={{ margin: "0 auto" }} onClick={onSkip}>
        Skip for now — take me to Symptra <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

const ConfirmationScreen = ({ pkg, onConfirm, onBack }) => (
  <div className="confirmation-page fade-in-up">
    <div className="card confirmation-card">
      <div className="confirmation-icon">
        <Package size={24} />
      </div>
      <h1 className="font-display page-title">Confirm your plan</h1>
      <p className="page-sub">Review the details before you continue.</p>

      <div className="confirmation-summary">
        <div className="confirmation-row">
          <span>Plan</span>
          <strong>{pkg.name}</strong>
        </div>
        <div className="confirmation-row">
          <span>Price</span>
          <strong>{pkg.price}</strong>
        </div>
        <ul className="package-features confirmation-features">
          {pkg.features.map((f) => (
            <li key={f}>
              <Check size={14} className="package-check" /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="confirmation-actions">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn-primary" onClick={onConfirm}>
          Confirm & continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------- */
/*  Sidebar / Topbar                                                       */
/* ---------------------------------------------------------------------- */

const NAV_ITEMS = {
  patient: [
    { key: "landing", label: "Overview", icon: LayoutDashboard },
    { key: "checker", label: "Symptom Checker", icon: Activity },
    { key: "patientDashboard", label: "My Health", icon: FileText },
  ],
  doctor: [
    { key: "landing", label: "Overview", icon: LayoutDashboard },
    { key: "checker", label: "Symptom Checker", icon: Activity },
    { key: "doctorDashboard", label: "Clinic Dashboard", icon: Stethoscope },
  ],
};

const Sidebar = ({ view, setView, role, mobileOpen, setMobileOpen }) => {
  const items = NAV_ITEMS[role];
  const Content = (
    <div className="sidebar-inner">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <PulseMark width={36} />
        </div>
        <div>
          <p className="font-display sidebar-brand-name">Symptra</p>
          <p className="sidebar-brand-tag">Know before you go</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;
          const active = view === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setView(item.key);
                setMobileOpen(false);
              }}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        Symptra assists triage. It does not replace a licensed clinician.
      </div>
    </div>
  );

  return (
    <>
      <aside className="sidebar">{Content}</aside>
      {mobileOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <aside className="mobile-drawer">
            <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
            {Content}
          </aside>
        </div>
      )}
    </>
  );
};

const TopBar = ({ role, name, setMobileOpen, alertCount, onLogout }) => (
  <header className="topbar">
    <div className="topbar-left">
      <button className="mobile-nav-toggle" onClick={() => setMobileOpen(true)}>
        <Menu size={24} />
      </button>
      <span className="role-pill">{role === "doctor" ? "Doctor account" : "Patient account"}</span>
    </div>
    <div className="topbar-right">
      <div className="bell-wrap">
        <Bell size={20} />
        {alertCount > 0 && <span className="bell-badge">{alertCount}</span>}
      </div>
      <div className="topbar-user">
        <Avatar initials={(name || "?").slice(0, 2).toUpperCase()} />
        <span className="topbar-user-name">{name}</span>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={16} />
        <span className="login-btn-label">Log out</span>
      </button>
    </div>
  </header>
);

/* ---------------------------------------------------------------------- */
/*  Landing                                                                */
/* ---------------------------------------------------------------------- */

const Landing = ({ setView, onChoosePackage }) => (
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
        {PACKAGES.map((p) => (
          <div key={p.id} className={`card package-card ${p.highlight ? "highlight" : ""}`}>
            {p.highlight && (
              <span className="package-badge">
                <Star size={12} /> Most popular
              </span>
            )}
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
        ))}
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

/* ---------------------------------------------------------------------- */
/*  Symptom Checker                                                        */
/* ---------------------------------------------------------------------- */

const EXAMPLES = [
  "Fever, sore throat, and cough for 2 days",
  "Sharp lower right belly pain since morning",
  "Itchy red rash on both arms after gardening",
  "Dizzy when standing up, tired for a week",
];

const SymptomChecker = ({ onSaveCheck, currentName }) => {
  const [name, setName] = useState(currentName || "");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setSaved(false);
    setUsedFallback(false);

    const systemPrompt = `You are a clinical triage assistant embedded in a clinic's intake software. Given a patient's described symptoms, respond with ONLY a JSON object — no markdown, no code fences, no preamble — matching exactly this schema:
{
  "urgency": "emergency" | "urgent" | "routine" | "self-care",
  "conditions": [ { "name": string, "likelihood": "high" | "moderate" | "low", "description": string (max 20 words) } ],
  "redFlags": [string],
  "recommendedAction": string (max 25 words, plain language),
  "disclaimer": "This is not a diagnosis. Please consult a licensed doctor for confirmation and treatment."
}
Rules:
- Return 2 to 4 conditions, most likely first.
- redFlags lists concerning signs actually present in the input; return an empty array if none.
- If symptoms suggest a medical emergency (e.g. chest pain, trouble breathing, stroke signs, severe bleeding, suicidal ideation), set urgency to "emergency" and recommendedAction must tell the person to seek emergency care or call emergency services immediately.
- Never include specific drug names or dosages.
- When uncertain, lean toward the higher urgency level.
- Output valid JSON only, nothing else.`;

    let parsed = null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: text }],
        }),
      });
      clearTimeout(timeout);

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      const raw = (data.content || [])
        .map((b) => b.text || "")
        .join("")
        .replace(/```json|```/g, "")
        .trim();
      parsed = JSON.parse(raw);

      if (!parsed || !parsed.urgency || !Array.isArray(parsed.conditions)) {
        throw new Error("Malformed response");
      }
    } catch (e) {
      // AI call failed, timed out, or returned something unusable —
      // fall back to a local keyword-based reference so the person
      // still gets a useful read instead of a dead end.
      parsed = localSymptomMatch(text);
      setUsedFallback(true);
    }

    setResult(parsed);
    setLoading(false);
  };

  const save = () => {
    if (!result) return;
    onSaveCheck({
      patientName: name.trim() || "Guest patient",
      symptomsText: text,
      result,
    });
    setSaved(true);
  };

  return (
    <div className="page-narrow fade-in-up">
      <h1 className="font-display page-title">Symptom Checker</h1>
      <p className="page-sub">
        Describe what you're feeling in your own words. The more detail, the sharper the read.
      </p>

      <div className="card checker-form">
        <label className="field-label">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ananya Rao"
          className="field-input"
        />

        <label className="field-label">Symptoms</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: I have a fever, headache, sore throat, and cough for 2 days..."
          rows={5}
          className="field-textarea"
        />

        <div className="example-chips">
          {EXAMPLES.map((ex) => (
            <button key={ex} onClick={() => setText(ex)} className="chip">
              {ex}
            </button>
          ))}
        </div>

        <button onClick={analyze} disabled={loading || !text.trim()} className="btn-primary analyze-btn">
          {loading ? (
            <>
              <span className="beat-loader">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.12}s` }} className="beat-bar" />
                ))}
              </span>
              Reading your symptoms…
            </>
          ) : (
            <>
              Analyze symptoms <Send size={16} />
            </>
          )}
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>

      {result && (
        <div className="result-panel fade-in-up">
          <div className={`result-summary urgency-bg-${result.urgency}`}>
            <div className="result-summary-top">
              <UrgencyBadge level={result.urgency} />
              <span className="result-timestamp">
                <Clock size={14} /> just now
              </span>
            </div>

            {result.redFlags?.length > 0 && (
              <div className="red-flag-box">
                <AlertTriangle size={16} className="red-flag-icon" />
                <div>
                  <strong>Flagged: </strong>
                  {result.redFlags.join(" · ")}
                </div>
              </div>
            )}

            <p className="result-action">
              <strong>Recommended next step: </strong>
              {result.recommendedAction}
            </p>
          </div>

          <div className="condition-list">
            {result.conditions?.map((c, i) => (
              <div key={i} className="card condition-card">
                <div>
                  <p className="font-display condition-name">{c.name}</p>
                  <p className="condition-desc">{c.description}</p>
                </div>
                <span className={`likelihood-pill ${c.likelihood}`}>{c.likelihood}</span>
              </div>
            ))}
          </div>

          <p className="disclaimer-text">
            {result.disclaimer}
            {usedFallback && " · Estimated from an offline reference because the AI service didn't respond — for a sharper read, try analyzing again."}
          </p>

          <button onClick={save} disabled={saved} className="btn-outline send-doctor-btn">
            {saved ? (
              <>
                <CheckCircle2 size={16} /> Sent to your clinic
              </>
            ) : (
              <>Send this to my doctor</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Patient Dashboard                                                       */
/* ---------------------------------------------------------------------- */

const PatientDashboard = ({ checks, name, pkg, onChangePlan }) => {
  const mine = checks.filter((c) => c.patientName === name);
  return (
    <div className="page-narrow fade-in-up">
      <h1 className="font-display page-title">My Health</h1>
      <p className="page-sub">
        {name ? `Hi ${name.split(" ")[0]}, here's your record.` : "Run a symptom check to start your record."}
      </p>

      <div className="stat-grid-2">
        <div className="card stat-card">
          <p className="stat-label">Next appointment</p>
          <p className="font-display stat-value">Not yet booked</p>
          <button className="stat-cta">
            Book a slot <ChevronRight size={14} />
          </button>
        </div>
        <div className="card stat-card">
          <p className="stat-label">Checks on file</p>
          <p className="font-display stat-value">
            {mine.length} symptom check{mine.length === 1 ? "" : "s"}
          </p>
          <p className="stat-hint">Shared automatically with your clinic</p>
        </div>
        <div className="card stat-card plan-card">
          <p className="stat-label">Current plan</p>
          <p className="font-display stat-value">{pkg ? pkg.name : "No plan selected"}</p>
          {pkg && <p className="stat-hint">{pkg.price}</p>}
          <button className="stat-cta" onClick={onChangePlan}>
            <Package size={14} /> Change plan
          </button>
        </div>
      </div>

      <h2 className="font-display section-title">History</h2>
      {mine.length === 0 && (
        <div className="empty-state">
          <p>Nothing here yet. Use the Symptom Checker and it'll show up on this page.</p>
        </div>
      )}
      <div className="history-list">
        {mine
          .slice()
          .reverse()
          .map((c) => (
            <div key={c.id} className="card history-card">
              <div className="history-card-top">
                <UrgencyBadge level={c.result.urgency} size="sm" />
                <span className="history-date">{new Date(c.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="history-quote">"{c.symptomsText}"</p>
              <p className="history-top-match">
                <strong>Top match: </strong>
                {c.result.conditions?.[0]?.name}
              </p>
              {c.doctorReviewed ? (
                <div className="review-box">
                  <CheckCircle2 size={16} className="review-box-icon" />
                  <p>
                    <strong>Doctor reviewed: </strong>
                    {c.doctorNote || "Reviewed, no notes added."}
                  </p>
                </div>
              ) : (
                <p className="awaiting-text">Awaiting doctor review</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Doctor Dashboard                                                        */
/* ---------------------------------------------------------------------- */

const urgencyRank = { emergency: 0, urgent: 1, routine: 2, "self-care": 3 };

const DoctorDashboard = ({ checks, patients, onReview }) => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  const sortedChecks = checks
    .slice()
    .sort((a, b) => urgencyRank[a.result.urgency] - urgencyRank[b.result.urgency] || b.id - a.id);

  const pending = checks.filter((c) => !c.doctorReviewed).length;
  const emergencies = checks.filter((c) => c.result.urgency === "emergency" && !c.doctorReviewed).length;

  const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const stats = [
    { label: "Total patients", value: patients.length, icon: Users },
    { label: "Pending AI reviews", value: pending, icon: Clock },
    { label: "Emergency flags", value: emergencies, icon: ShieldAlert },
    { label: "Avg. response", value: "8 min", icon: Activity },
  ];

  return (
    <div className="page-wide fade-in-up">
      <h1 className="font-display page-title">Clinic Dashboard</h1>
      <p className="page-sub">AI-flagged cases, sorted so urgency never waits in line.</p>

      <div className="stat-grid-4">
        {stats.map((s) => (
          <div key={s.label} className="card stat-card-sm">
            <s.icon size={16} className="stat-icon" />
            <p className="font-display stat-value-lg">{s.value}</p>
            <p className="stat-label-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div>
          <h2 className="font-display section-title">Triage queue</h2>
          <div className="queue-list">
            {sortedChecks.map((c) => {
              const isOpen = expanded === c.id;
              return (
                <div key={c.id} className="card queue-card">
                  <button
                    onClick={() => {
                      setExpanded(isOpen ? null : c.id);
                      setNoteDraft(c.doctorNote || "");
                    }}
                    className="queue-card-header"
                  >
                    <div className="queue-card-left">
                      <Avatar
                        initials={c.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      />
                      <div>
                        <p className="queue-patient-name">{c.patientName}</p>
                        <p className="queue-patient-condition">{c.result.conditions?.[0]?.name}</p>
                      </div>
                    </div>
                    <div className="queue-card-right">
                      <UrgencyBadge level={c.result.urgency} size="sm" />
                      {c.doctorReviewed ? (
                        <CheckCircle2 size={16} className="reviewed-check" />
                      ) : (
                        <ChevronDown size={16} className={`chevron ${isOpen ? "open" : ""}`} />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="queue-detail">
                      <p className="queue-quote">"{c.symptomsText}"</p>
                      <div className="queue-conditions">
                        {c.result.conditions?.map((cond, i) => (
                          <div key={i} className="queue-condition-row">
                            <span className="name">{cond.name}</span>
                            <span className="likelihood">{cond.likelihood}</span>
                          </div>
                        ))}
                      </div>
                      {c.result.redFlags?.length > 0 && (
                        <p className="queue-redflags">
                          <AlertTriangle size={14} /> {c.result.redFlags.join(" · ")}
                        </p>
                      )}
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Add a clinical note before marking reviewed…"
                        rows={2}
                        className="note-textarea"
                      />
                      <button
                        onClick={() => {
                          onReview(c.id, noteDraft);
                          setExpanded(null);
                        }}
                        className="mark-reviewed-btn"
                      >
                        <CheckCircle2 size={16} /> Mark reviewed
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-display section-title">Patient directory</h2>
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patients…"
              className="search-input"
            />
          </div>
          <div className="directory-list">
            {filteredPatients.map((p) => (
              <div key={p.id} className="card directory-card">
                <Avatar initials={p.avatar} tone={p.tone} />
                <div className="directory-info">
                  <p className="directory-name">{p.name}</p>
                  <p className="directory-meta">
                    {p.age} · {p.gender} · last visit {new Date(p.lastVisit).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {filteredPatients.length === 0 && <p className="no-results">No patients match "{query}".</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Root App                                                                */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState("login"); // login | packages | confirmation | landing | checker | patientDashboard | doctorDashboard
  const [role, setRole] = useState("patient");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [patients] = useState(MOCK_PATIENTS);
  const [checks, setChecks] = useState(INITIAL_CHECKS);
  const [activeName, setActiveName] = useState("");
  const [pendingPackage, setPendingPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const nextId = useRef(INITIAL_CHECKS.length + 1);

  const handleSaveCheck = ({ patientName, symptomsText, result }) => {
    setActiveName(patientName);
    setChecks((prev) => [
      ...prev,
      {
        id: nextId.current++,
        patientName,
        symptomsText,
        timestamp: new Date().toISOString(),
        result,
        doctorReviewed: false,
        doctorNote: "",
      },
    ]);
  };

  const handleReview = (id, note) => {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, doctorReviewed: true, doctorNote: note } : c)));
  };

  const handleAuth = ({ name, role: authRole, guest }) => {
    setActiveName(name);
    setAuthenticated(true);
    setRole(authRole);
    if (authRole === "doctor") {
      setView("doctorDashboard");
    } else {
      // Guests skip straight in — real signups see plans first, but can skip too.
      setView(guest ? "landing" : "packages");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setView("login");
    setRole("patient");
    setActiveName("");
    setSelectedPackage(null);
    setPendingPackage(null);
  };

  const alertCount = checks.filter((c) => c.result.urgency === "emergency" && !c.doctorReviewed).length;

  let content;

  if (!authenticated) {
    content = <AuthScreen onAuth={handleAuth} />;
  } else if (view === "packages") {
    content = (
      <PackagesScreen
        onChoose={(pkg) => {
          setPendingPackage(pkg);
          setView("confirmation");
        }}
        onSkip={() => setView("landing")}
      />
    );
  } else if (view === "confirmation" && pendingPackage) {
    content = (
      <ConfirmationScreen
        pkg={pendingPackage}
        onBack={() => setView("landing")}
        onConfirm={() => {
          setSelectedPackage(pendingPackage);
          setPendingPackage(null);
          setView("landing");
        }}
      />
    );
  } else {
    content = (
      <div className="app-shell">
        <Sidebar view={view} setView={setView} role={role} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="app-main-col">
          <TopBar role={role} name={activeName} setMobileOpen={setMobileOpen} alertCount={alertCount} onLogout={handleLogout} />
          <main>
            {view === "landing" && (
              <Landing
                setView={setView}
                onChoosePackage={(pkg) => {
                  setPendingPackage(pkg);
                  setView("confirmation");
                }}
              />
            )}
            {view === "checker" && <SymptomChecker onSaveCheck={handleSaveCheck} currentName={activeName} />}
            {view === "patientDashboard" && (
              <PatientDashboard
                checks={checks}
                name={activeName}
                pkg={selectedPackage}
                onChangePlan={() => setView("packages")}
              />
            )}
            {view === "doctorDashboard" && (
              <DoctorDashboard checks={checks} patients={patients} onReview={handleReview} />
            )}
          </main>
          <footer className="app-footer">
            © 2026 Symptra · AI-assisted triage, not a substitute for professional medical advice.
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      {content}
    </div>
  );
}