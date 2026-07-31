import React, { useState } from "react";
import { 
  Users, Clock, ShieldAlert, Microscope, Search, 
  AlertTriangle, CheckCircle2, ChevronDown 
} from "lucide-react";
import { Avatar } from "../common/Avatar";
import { UrgencyBadge } from "../common/UrgencyBadge";
import { urgencyRank } from "../../utils/constants";

export const DoctorDashboard = ({ checks, patients, onReview }) => {
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
    { label: "Pending reviews", value: pending, icon: Clock },
    { label: "Emergency flags", value: emergencies, icon: ShieldAlert },
    { label: "Diseases in DB", value: 60, icon: Microscope },
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