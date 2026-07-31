import { DISEASE_DATABASE } from "../components/disease/DiseaseDatabase";

export function searchDiseases(query) {
  if (!query || query.trim().length < 2) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  const results = DISEASE_DATABASE.map(entry => {
    let score = 0;
    let matchedSymptoms = [];
    
    if (entry.disease.toLowerCase().includes(searchTerm)) {
      score += 10;
    }
    
    if (entry.disease.toLowerCase() === searchTerm) {
      score += 20;
    }
    
    entry.symptoms.forEach(symptom => {
      const symptomLower = symptom.toLowerCase();
      if (symptomLower.includes(searchTerm) || searchTerm.includes(symptomLower)) {
        score += 5;
        if (!matchedSymptoms.includes(symptom)) {
          matchedSymptoms.push(symptom);
        }
      }
    });
    
    if (entry.category.toLowerCase().includes(searchTerm)) {
      score += 3;
    }
    
    return {
      ...entry,
      score,
      matchedSymptoms,
    };
  });
  
  return results
    .filter(r => r.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.disease.localeCompare(b.disease);
    });
}

export function getAllSymptoms() {
  const symptomSet = new Set();
  DISEASE_DATABASE.forEach(entry => {
    entry.symptoms.forEach(s => symptomSet.add(s));
  });
  return Array.from(symptomSet).sort();
}