import React, { useState } from "react";
import { ArrowRight, UserPlus, Compass } from "lucide-react";
import { PulseMark } from "../common/PulseMark";

export const AuthScreen = ({ onAuth }) => {
  const [patientName, setPatientName] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError("Enter your name to continue.");
      return;
    }
    setError("");
    onAuth({ name: patientName.trim(), role });
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
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
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