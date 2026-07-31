import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { getAllSymptoms } from "../../utils/search";
import { DISEASE_DATABASE } from "../disease/DiseaseDatabase";

export const SymptomSearchInput = ({ value, onChange, onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const allSymptoms = getAllSymptoms();

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);
    
    if (val.trim().length > 0) {
      const searchTerm = val.toLowerCase().trim();
      const filtered = allSymptoms
        .filter(s => s.toLowerCase().includes(searchTerm))
        .slice(0, 20);
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (symptom) => {
    onSelect(symptom);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value.trim().length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
        placeholder="Start typing symptoms (e.g., cough, fever, headache)..."
        className="field-input symptom-search-input"
        style={{ paddingRight: '40px' }}
      />
      <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
      
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {suggestions.map((symptom, index) => (
            <button
              key={symptom}
              className={`suggestion-item ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => handleSelect(symptom)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="symptom-icon">🔍</span>
              {symptom}
              <span className="symptom-count">{DISEASE_DATABASE.filter(d => d.symptoms.includes(symptom)).length} diseases</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};