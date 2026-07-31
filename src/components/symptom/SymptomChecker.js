import React, { useState } from "react";
import { 
  Send, Clock, AlertTriangle, CheckCircle2, MessageCircle 
} from "lucide-react";
import { UrgencyBadge } from "../common/UrgencyBadge";
import { SymptomSearchInput } from "./SymptomSearchInput";
import { sendWhatsAppEnquiry } from "../../utils/whatsapp";
import { searchDiseases } from "../../utils/search";

export const SymptomChecker = ({ onSaveCheck, currentName }) => {
  const [patientName, setPatientName] = useState(currentName || "");
  const [text, setText] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [symptomInput, setSymptomInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setSymptomInput("");
      performSearch([...symptoms, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    const newSymptoms = symptoms.filter(s => s !== symptom);
    setSymptoms(newSymptoms);
    performSearch(newSymptoms);
  };

  const performSearch = (symptomList) => {
    if (symptomList.length === 0) {
      setSearchResults([]);
      return;
    }
    
    const query = symptomList.join(" ");
    const results = searchDiseases(query);
    setSearchResults(results);
  };

  const clearAllSymptoms = () => {
    setSymptoms([]);
    setSearchResults([]);
  };

  const analyzeWithSymptoms = async () => {
    if (symptoms.length === 0) {
      setError("Please add at least one symptom first.");
      return;
    }

    const description = symptoms.join(", ");
    setText(description);
    setLoading(true);
    setError("");
    setResult(null);
    setSaved(false);
    setUsedFallback(false);

    const systemPrompt = `You are a clinical triage assistant. Given symptoms, respond with ONLY a JSON object:
{
  "urgency": "emergency" | "urgent" | "routine" | "self-care",
  "conditions": [ { "name": string, "likelihood": "high" | "moderate" | "low", "description": string } ],
  "redFlags": [string],
  "recommendedAction": string,
  "disclaimer": "This is not a diagnosis. Please consult a licensed doctor."
}`;

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
          messages: [{ role: "user", content: description }],
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
      parsed = {
        urgency: searchResults.length > 0 ? searchResults[0].urgency : "routine",
        conditions: searchResults.slice(0, 3).map(d => ({
          name: d.disease,
          likelihood: "moderate",
          description: d.description
        })),
        redFlags: searchResults.filter(d => d.urgency === "emergency").map(d => d.disease),
        recommendedAction: searchResults.length > 0 ? 
          `Consider consulting a doctor for ${searchResults[0].disease}.` : 
          "Book a routine check-up.",
        disclaimer: "This is not a diagnosis. Please consult a licensed doctor."
      };
      setUsedFallback(true);
    }

    setResult(parsed);
    setLoading(false);
  };

  const save = () => {
    if (!result) return;
    onSaveCheck({
      patientName: patientName.trim() || "Guest patient",
      symptomsText: text || symptoms.join(", "),
      result,
    });
    setSaved(true);
  };

  return (
    <div className="page-narrow fade-in-up">
      <h1 className="font-display page-title">Symptom Checker</h1>
      <p className="page-sub">
        Type your symptoms below. The search will suggest matching diseases and conditions.
      </p>

      <div className="card checker-form">
        <label className="field-label">Your name</label>
        <input
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="e.g. Jiss Poulose"
          className="field-input"
        />

        <label className="field-label">Add symptoms</label>
        <SymptomSearchInput 
          value={symptomInput}
          onChange={setSymptomInput}
          onSelect={addSymptom}
        />
        
        <div className="symptom-tags">
          {symptoms.map((symptom) => (
            <span key={symptom} className="symptom-tag">
              {symptom}
              <button onClick={() => removeSymptom(symptom)} className="symptom-tag-remove">×</button>
            </span>
          ))}
          {symptoms.length === 0 && (
            <span className="symptom-placeholder">No symptoms added yet. Type to add.</span>
          )}
          {symptoms.length > 0 && (
            <button onClick={clearAllSymptoms} className="clear-symptoms-btn">
              Clear all
            </button>
          )}
        </div>

        {symptoms.length > 0 && (
          <div className="search-results-section">
            <h4 className="search-results-title">
              {searchResults.length > 0 ? `Possible conditions (${searchResults.length} found)` : "Searching..."}
            </h4>
            <div className="search-results-list">
              {searchResults.slice(0, 10).map((result, index) => (
                <div key={index} className={`search-result-item urgency-${result.urgency}`}>
                  <div className="search-result-header">
                    <span className="search-result-disease">{result.disease}</span>
                    <span className={`search-result-urgency ${result.urgency}`}>
                      {result.urgency}
                    </span>
                  </div>
                  <p className="search-result-desc">{result.description}</p>
                  <div className="search-result-symptoms">
                    <span>Matched: </span>
                    {result.matchedSymptoms.map(s => (
                      <span key={s} className="search-result-matched-symptom">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
              {searchResults.length > 10 && (
                <div className="search-result-more">
                  +{searchResults.length - 10} more conditions
                </div>
              )}
            </div>
          </div>
        )}

        <div className="example-chips" style={{ marginTop: 12 }}>
          <span style={{ fontSize: '12px', color: 'var(--slate-400)', marginRight: 4 }}>Quick add: </span>
          {["cough", "fever", "headache", "chest pain", "nausea"].map((s) => (
            <button key={s} onClick={() => addSymptom(s)} className="chip">
              {s}
            </button>
          ))}
        </div>

        <button 
          onClick={analyzeWithSymptoms} 
          disabled={loading || symptoms.length === 0} 
          className="btn-primary analyze-btn"
        >
          {loading ? (
            <>
              <span className="beat-loader">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.12}s` }} className="beat-bar" />
                ))}
              </span>
              Analyzing symptoms…
            </>
          ) : (
            <>
              Analyze symptoms <Send size={16} />
            </>
          )}
        </button>
        {error && <p className="error-text">{error}</p>}
        {symptoms.length > 0 && (
          <p className="symptom-count-hint">{symptoms.length} symptom{symptoms.length > 1 ? 's' : ''} selected</p>
        )}
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
            {usedFallback && " · Estimated from offline database."}
          </p>

          <div className="result-actions">
            <button onClick={save} disabled={saved} className="btn-outline send-doctor-btn">
              {saved ? (
                <>
                  <CheckCircle2 size={16} /> Sent to your clinic
                </>
              ) : (
                <>Send this to my doctor</>
              )}
            </button>
            <button className="btn-primary whatsapp-consult-btn" onClick={() => {
              const name = patientName || "Guest Patient";
              sendWhatsAppEnquiry("", name, "consultation");
            }}>
              <MessageCircle size={16} />
              Consult Doctor on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};