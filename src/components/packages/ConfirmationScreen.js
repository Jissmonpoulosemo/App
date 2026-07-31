import React from "react";
import { Package, Check, ArrowRight } from "lucide-react";

export const ConfirmationScreen = ({ pkg, onConfirm, onBack }) => (
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