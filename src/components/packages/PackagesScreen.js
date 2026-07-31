import React, { useState } from "react";
import { 
  Star, Check, ChevronRight, Shield, Heart, MessageCircle, Phone, UserPlus, Award
} from "lucide-react";
import { PACKAGES } from "../../utils/constants";
import { sendWhatsAppEnquiry } from "../../utils/whatsapp";

export const PackagesScreen = ({ onChoose, onSkip, patientName }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const displayName = patientName && patientName.trim() !== "" ? patientName.trim() : "Guest";

  const handleWhatsAppEnquiry = (pkg) => {
    setSelectedPackage(pkg);
    setShowWhatsAppModal(true);
  };

  const confirmWhatsApp = () => {
    if (selectedPackage) {
      sendWhatsAppEnquiry(selectedPackage.name, patientName || "Guest Patient");
      setShowWhatsAppModal(false);
      setSelectedPackage(null);
    }
  };

  const getIcon = (iconName) => {
    const icons = { Heart, Shield, Award };
    return icons[iconName] || Heart;
  };

  return (
    <>
      <div className="packages-page fade-in-up">
        <div className="packages-header">
          <div className="packages-header-badge">
            <Shield size={16} />
            Choose Your Care Plan
          </div>
          <h1 className="font-display page-title">Pick a care plan</h1>
          <p className="page-sub">Choose what fits you — you can switch plans anytime.</p>
          <div className="patient-name-display-wrapper">
            <p className="patient-name-display">
              👤 Patient: <strong>{displayName}</strong>
            </p>
          </div>
        </div>
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
                <div className="package-buttons">
                  <button
                    className={p.highlight ? "btn-primary package-btn" : "btn-outline package-btn"}
                    onClick={() => onChoose(p)}
                  >
                    Choose {p.name}
                  </button>
                  <button
                    className="whatsapp-enquiry-btn"
                    onClick={() => handleWhatsAppEnquiry(p)}
                  >
                    <MessageCircle size={16} />
                    Enquire on WhatsApp
                  </button>
                </div>
                <div className="package-contact-info">
                  <small>
                    <Phone size={12} /> Need help? Contact us on WhatsApp
                  </small>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button className="stat-cta" style={{ margin: "0 auto" }} onClick={onSkip}>
            Skip for now — take me to Symptra <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {showWhatsAppModal && selectedPackage && (
        <div className="modal-overlay" onClick={() => setShowWhatsAppModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <MessageCircle size={20} style={{ color: '#25D366' }} />
              <h3 className="modal-title">WhatsApp Enquiry</h3>
              <button className="modal-close-btn" onClick={() => setShowWhatsAppModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-sub">
                You are about to enquire about the <strong>{selectedPackage.name}</strong> package via WhatsApp.
              </p>
              <div className="patient-info-box">
                <UserPlus size={14} />
                <span>
                  <strong>Patient Name:</strong> {displayName}
                </span>
              </div>
              <div className="whatsapp-info">
                <Phone size={14} />
                <span>WhatsApp: +91 9633228352</span>
              </div>
              <div className="whatsapp-preview">
                <p className="preview-label">📨 Message Preview:</p>
                <div className="preview-message">
                  Hi! 👋 I'm interested in the {selectedPackage.name} package.
                  <br />
                  My name: {displayName}
                  <br />
                  Can you please provide more details about the features and pricing?
                </div>
              </div>
            </div>
            <button className="btn-primary whatsapp-send-btn" onClick={confirmWhatsApp}>
              <MessageCircle size={16} />
              Send WhatsApp Message
            </button>
            <button className="modal-cancel" onClick={() => setShowWhatsAppModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};