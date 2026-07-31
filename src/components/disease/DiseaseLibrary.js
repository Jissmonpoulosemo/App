import React, { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { DISEASE_DATABASE } from "./DiseaseDatabase";
import { UrgencyBadge } from "../common/UrgencyBadge";
import { searchDiseases } from "../../utils/search";
import { sendWhatsAppEnquiry } from "../../utils/whatsapp";

export const DiseaseLibrary = ({ patientName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDisease, setSelectedDisease] = useState(null);

  const categories = ["All", ...new Set(DISEASE_DATABASE.map(d => d.category))];
  
  const filteredDiseases = searchTerm.trim().length >= 2 
    ? searchDiseases(searchTerm)
    : DISEASE_DATABASE;
  
  const sortedDiseases = filteredDiseases
    .filter(d => selectedCategory === "All" || d.category === selectedCategory)
    .sort((a, b) => a.disease.localeCompare(b.disease));

  return (
    <div className="page-wide fade-in-up">
      <h1 className="font-display page-title">Disease Library</h1>
      <p className="page-sub">Browse our comprehensive database of 60+ diseases and conditions.</p>
      
      {patientName && (
        <div className="patient-name-display-wrapper" style={{ marginBottom: 16 }}>
          <p className="patient-name-display">
            👤 Patient: <strong>{patientName}</strong>
          </p>
        </div>
      )}

      <div className="disease-library-controls">
        <div className="search-wrap">
          <Search size={16} className="search-icon" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search diseases or symptoms (min 2 characters)..."
            className="search-input"
          />
          {searchTerm.length >= 2 && (
            <span className="search-result-count">
              {sortedDiseases.length} results found
            </span>
          )}
        </div>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-filter ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="disease-grid">
        {sortedDiseases.map(disease => (
          <div key={disease.id} className="card disease-card" onClick={() => setSelectedDisease(disease)}>
            <div className="disease-card-header">
              <h3 className="disease-name">{disease.disease}</h3>
              <UrgencyBadge level={disease.urgency} size="sm" />
            </div>
            <p className="disease-description">{disease.description}</p>
            <div className="disease-symptoms">
              <span className="symptoms-label">Symptoms:</span>
              {disease.symptoms.slice(0, 4).map(s => (
                <span key={s} className="symptom-tag-sm">{s}</span>
              ))}
              {disease.symptoms.length > 4 && (
                <span className="symptom-more">+{disease.symptoms.length - 4} more</span>
              )}
            </div>
            <div className="disease-category">
              <span className="category-label">{disease.category}</span>
            </div>
          </div>
        ))}
      </div>

      {sortedDiseases.length === 0 && searchTerm.length >= 2 && (
        <div className="empty-state">
          <p>No diseases found matching "{searchTerm}". Try different keywords.</p>
        </div>
      )}

      {sortedDiseases.length === 0 && searchTerm.length < 2 && (
        <div className="empty-state">
          <p>Type at least 2 characters to search for diseases or symptoms.</p>
        </div>
      )}

      {selectedDisease && (
        <div className="modal-overlay" onClick={() => setSelectedDisease(null)}>
          <div className="modal-card disease-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDisease(null)}>×</button>
            <h2 className="disease-detail-name">{selectedDisease.disease}</h2>
            <UrgencyBadge level={selectedDisease.urgency} />
            <p className="disease-detail-description">{selectedDisease.description}</p>
            <div className="disease-detail-section">
              <h4>Symptoms</h4>
              <div className="symptom-tags">
                {selectedDisease.symptoms.map(s => (
                  <span key={s} className="symptom-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="disease-detail-section">
              <h4>Common Treatments</h4>
              <ul className="treatment-list">
                {selectedDisease.commonTreatments.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="disease-detail-section">
              <h4>Prevention</h4>
              <ul className="prevention-list">
                {selectedDisease.prevention.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="disease-detail-section">
              <h4>Category</h4>
              <span className="category-label">{selectedDisease.category}</span>
            </div>
            <button className="btn-primary whatsapp-consult-btn" onClick={() => {
              sendWhatsAppEnquiry("Disease Consultation", patientName || "Guest Patient", "consultation");
            }}>
              <MessageCircle size={16} />
              Consult a Doctor on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};