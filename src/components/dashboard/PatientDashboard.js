import React from "react";
import { Package, MessageCircle, CheckCircle2 } from "lucide-react";
import { UrgencyBadge } from "../common/UrgencyBadge";
import { sendWhatsAppEnquiry } from "../../utils/whatsapp";

export const PatientDashboard = ({ checks, name, pkg, onChangePlan }) => {
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
          <button className="stat-cta" onClick={() => sendWhatsAppEnquiry("", name || "Guest Patient", "appointment")}>
            <MessageCircle size={14} />
            Book via WhatsApp
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