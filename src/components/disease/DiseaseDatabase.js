/* ---------------------------------------------------------------------- */
/*  Comprehensive Disease Database - 60+ diseases with symptoms          */
/* ---------------------------------------------------------------------- */

export const DISEASE_DATABASE = [
  // Respiratory System
  { 
    id: 1,
    symptoms: ["cough", "fever", "sore throat", "runny nose", "congestion", "sneezing", "headache", "body ache"], 
    disease: "Common Cold", 
    urgency: "routine", 
    description: "Viral infection of upper respiratory tract causing mild symptoms",
    category: "Respiratory",
    commonTreatments: ["Rest", "Hydration", "Over-the-counter cold medicine", "Warm fluids"],
    prevention: ["Hand washing", "Avoid close contact with sick people", "Healthy lifestyle"]
  },
  { 
    id: 2,
    symptoms: ["cough", "fever", "body ache", "fatigue", "headache", "chills", "sweating", "muscle pain"], 
    disease: "Influenza", 
    urgency: "urgent", 
    description: "Seasonal flu causing severe systemic symptoms and complications",
    category: "Respiratory",
    commonTreatments: ["Antiviral medication", "Rest", "Fluids", "Pain relievers"],
    prevention: ["Annual flu vaccine", "Hand hygiene", "Avoid crowded places"]
  },
  { 
    id: 3,
    symptoms: ["cough", "wheezing", "shortness of breath", "chest tightness", "difficulty breathing", "night cough"], 
    disease: "Asthma", 
    urgency: "urgent", 
    description: "Chronic airway inflammation with recurrent breathing difficulties",
    category: "Respiratory",
    commonTreatments: ["Inhalers", "Avoid triggers", "Anti-inflammatory medication", "Peak flow monitoring"],
    prevention: ["Avoid allergens", "Regular check-ups", "Asthma action plan"]
  },
  { 
    id: 4,
    symptoms: ["cough", "fever", "chest pain", "difficulty breathing", "productive cough", "green sputum", "fatigue"], 
    disease: "Pneumonia", 
    urgency: "emergency", 
    description: "Lung infection requiring immediate medical care",
    category: "Respiratory",
    commonTreatments: ["Antibiotics", "Hospitalization", "Oxygen therapy", "IV fluids"],
    prevention: ["Pneumonia vaccine", "Hand hygiene", "Quit smoking"]
  },
  { 
    id: 5,
    symptoms: ["sore throat", "fever", "swollen lymph nodes", "white patches", "difficulty swallowing", "headache"], 
    disease: "Strep Throat", 
    urgency: "routine", 
    description: "Bacterial throat infection causing severe pain",
    category: "Respiratory",
    commonTreatments: ["Antibiotics", "Pain relievers", "Warm salt water gargle", "Rest"],
    prevention: ["Avoid sharing utensils", "Hand washing", "Cover cough"]
  },
  { 
    id: 6,
    symptoms: ["shortness of breath", "chest pain", "cough", "wheezing", "phlegm", "fever"], 
    disease: "Bronchitis", 
    urgency: "urgent", 
    description: "Inflammation of bronchial tubes causing persistent cough",
    category: "Respiratory",
    commonTreatments: ["Antibiotics if bacterial", "Cough medicine", "Rest", "Steam inhalation"],
    prevention: ["Avoid smoking", "Hand hygiene", "Wear mask in pollution"]
  },
  { 
    id: 7,
    symptoms: ["sneezing", "runny nose", "itchy eyes", "nasal congestion", "watery eyes", "scratchy throat"], 
    disease: "Allergic Rhinitis", 
    urgency: "self-care", 
    description: "Seasonal allergies causing nasal and eye symptoms",
    category: "Respiratory",
    commonTreatments: ["Antihistamines", "Nasal sprays", "Avoid allergens", "Saline rinse"],
    prevention: ["Air purifiers", "Allergy shots", "Keep windows closed"]
  },
  { 
    id: 8,
    symptoms: ["sinus pain", "headache", "nasal congestion", "facial pressure", "post nasal drip", "fever"], 
    disease: "Sinusitis", 
    urgency: "routine", 
    description: "Inflammation of sinus passages causing facial pain",
    category: "Respiratory",
    commonTreatments: ["Antibiotics", "Decongestants", "Nasal irrigation", "Pain relievers"],
    prevention: ["Treat colds promptly", "Humidify air", "Avoid allergens"]
  },
  
  // Cardiovascular
  { 
    id: 9,
    symptoms: ["chest pain", "shortness of breath", "arm pain", "dizziness", "sweating", "nausea", "fatigue"], 
    disease: "Heart Attack", 
    urgency: "emergency", 
    description: "Cardiac emergency requiring immediate attention",
    category: "Cardiovascular",
    commonTreatments: ["Emergency care", "Angioplasty", "Medications", "Lifestyle changes"],
    prevention: ["Healthy diet", "Regular exercise", "Quit smoking", "Manage stress"]
  },
  { 
    id: 10,
    symptoms: ["chest pain", "palpitations", "dizziness", "shortness of breath", "fainting", "fatigue"], 
    disease: "Arrhythmia", 
    urgency: "emergency", 
    description: "Irregular heart rhythm causing palpitations",
    category: "Cardiovascular",
    commonTreatments: ["Medications", "Pacemaker", "Lifestyle changes", "Cardioversion"],
    prevention: ["Heart-healthy diet", "Regular check-ups", "Avoid stimulants"]
  },
  { 
    id: 11,
    symptoms: ["headache", "vision problems", "chest pain", "shortness of breath", "dizziness", "nosebleeds"], 
    disease: "Hypertension", 
    urgency: "routine", 
    description: "High blood pressure requiring management",
    category: "Cardiovascular",
    commonTreatments: ["Blood pressure medication", "Diet changes", "Exercise", "Stress management"],
    prevention: ["Low sodium diet", "Regular monitoring", "Maintain healthy weight"]
  },
  { 
    id: 12,
    symptoms: ["leg pain", "swelling", "redness", "warmth", "calf pain", "difficulty walking"], 
    disease: "Deep Vein Thrombosis", 
    urgency: "emergency", 
    description: "Blood clot in deep vein needing immediate care",
    category: "Cardiovascular",
    commonTreatments: ["Blood thinners", "Compression stockings", "Exercise", "Elevation"],
    prevention: ["Stay active", "Hydration", "Avoid prolonged sitting"]
  },
  
  // Neurological
  { 
    id: 13,
    symptoms: ["severe headache", "confusion", "slurred speech", "weakness", "face drooping", "vision loss", "dizziness"], 
    disease: "Stroke", 
    urgency: "emergency", 
    description: "Brain attack requiring immediate emergency care",
    category: "Neurological",
    commonTreatments: ["Emergency care", "Rehabilitation", "Medications", "Speech therapy"],
    prevention: ["Blood pressure control", "Healthy lifestyle", "Regular check-ups"]
  },
  { 
    id: 14,
    symptoms: ["headache", "nausea", "light sensitivity", "throbbing pain", "vomiting", "aura"], 
    disease: "Migraine", 
    urgency: "routine", 
    description: "Severe neurological headache with systemic symptoms",
    category: "Neurological",
    commonTreatments: ["Pain relievers", "Dark room", "Preventive medication", "Rest"],
    prevention: ["Identify triggers", "Stress management", "Regular sleep"]
  },
  { 
    id: 15,
    symptoms: ["dizziness", "vertigo", "nausea", "loss of balance", "spinning sensation", "vomiting"], 
    disease: "Vertigo", 
    urgency: "routine", 
    description: "Inner ear balance disorder causing spinning sensation",
    category: "Neurological",
    commonTreatments: ["Vestibular exercises", "Medications", "Epley maneuver", "Avoid sudden movements"],
    prevention: ["Stay hydrated", "Avoid sudden movements", "Treat ear infections"]
  },
  { 
    id: 16,
    symptoms: ["headache", "neck stiffness", "fever", "confusion", "light sensitivity", "vomiting"], 
    disease: "Meningitis", 
    urgency: "emergency", 
    description: "Inflammation of meninges requiring emergency care",
    category: "Neurological",
    commonTreatments: ["Emergency antibiotics", "Hospitalization", "IV fluids", "Supportive care"],
    prevention: ["Vaccination", "Hand hygiene", "Avoid close contact"]
  },
  
  // Gastrointestinal
  { 
    id: 17,
    symptoms: ["abdominal pain", "nausea", "vomiting", "diarrhea", "fever", "cramps", "dehydration"], 
    disease: "Gastroenteritis", 
    urgency: "urgent", 
    description: "Stomach and intestinal inflammation causing digestive symptoms",
    category: "Gastrointestinal",
    commonTreatments: ["Oral rehydration", "Rest", "BRAT diet", "Electrolytes"],
    prevention: ["Hand washing", "Safe food handling", "Clean water"]
  },
  { 
    id: 18,
    symptoms: ["lower right abdominal pain", "nausea", "fever", "loss of appetite", "vomiting", "abdominal swelling"], 
    disease: "Appendicitis", 
    urgency: "emergency", 
    description: "Inflammation of appendix requiring immediate surgery",
    category: "Gastrointestinal",
    commonTreatments: ["Emergency surgery", "Antibiotics", "Hospitalization", "Pain management"],
    prevention: ["Seek immediate care for abdominal pain", "Healthy diet"]
  },
  { 
    id: 19,
    symptoms: ["abdominal pain", "bloating", "gas", "diarrhea", "constipation", "mucus in stool"], 
    disease: "Irritable Bowel Syndrome", 
    urgency: "routine", 
    description: "Chronic digestive disorder with alternating bowel habits",
    category: "Gastrointestinal",
    commonTreatments: ["Diet changes", "Stress management", "Medications", "Fiber supplements"],
    prevention: ["Healthy diet", "Regular exercise", "Stress reduction"]
  },
  { 
    id: 20,
    symptoms: ["heartburn", "chest pain", "regurgitation", "difficulty swallowing", "acid taste", "belching"], 
    disease: "GERD", 
    urgency: "routine", 
    description: "Acid reflux disease causing heartburn and discomfort",
    category: "Gastrointestinal",
    commonTreatments: ["Antacids", "Proton pump inhibitors", "Lifestyle changes", "Avoid triggers"],
    prevention: ["Smaller meals", "Avoid spicy foods", "Elevate head while sleeping"]
  },
  { 
    id: 21,
    symptoms: ["abdominal pain", "blood in stool", "diarrhea", "weight loss", "fatigue", "fever"], 
    disease: "Inflammatory Bowel Disease", 
    urgency: "urgent", 
    description: "Chronic digestive inflammation requiring medical management",
    category: "Gastrointestinal",
    commonTreatments: ["Anti-inflammatory medication", "Diet changes", "Surgery", "Immunosuppressants"],
    prevention: ["Regular check-ups", "Healthy diet", "Stress management"]
  },
  { 
    id: 22,
    symptoms: ["nausea", "vomiting", "stomach pain", "loss of appetite", "bloating", "indigestion"], 
    disease: "Gastritis", 
    urgency: "routine", 
    description: "Stomach lining inflammation causing pain and nausea",
    category: "Gastrointestinal",
    commonTreatments: ["Antacids", "Diet changes", "Avoid irritants", "Medications"],
    prevention: ["Healthy eating", "Limit alcohol", "Avoid NSAIDs when possible"]
  },
  { 
    id: 23,
    symptoms: ["constipation", "abdominal pain", "bloating", "straining", "hard stool", "infrequent bowel movements"], 
    disease: "Constipation", 
    urgency: "self-care", 
    description: "Difficulty passing stool causing discomfort",
    category: "Gastrointestinal",
    commonTreatments: ["Fiber supplements", "Hydration", "Exercise", "Laxatives if needed"],
    prevention: ["High fiber diet", "Regular exercise", "Adequate water intake"]
  },
  { 
    id: 24,
    symptoms: ["diarrhea", "abdominal cramps", "fever", "bloody stool", "nausea", "vomiting", "dehydration"], 
    disease: "Food Poisoning", 
    urgency: "urgent", 
    description: "Foodborne illness from contaminated food or water",
    category: "Gastrointestinal",
    commonTreatments: ["Hydration", "Rest", "Medical evaluation", "Electrolytes"],
    prevention: ["Safe food handling", "Cook food thoroughly", "Wash hands"]
  },
  
  // Dermatological
  { 
    id: 25,
    symptoms: ["rash", "itching", "redness", "dry skin", "scaly patches", "cracked skin"], 
    disease: "Eczema", 
    urgency: "routine", 
    description: "Chronic skin inflammation causing dry, itchy skin",
    category: "Dermatological",
    commonTreatments: ["Moisturizers", "Steroid creams", "Avoid triggers", "Antihistamines"],
    prevention: ["Regular moisturizing", "Gentle skincare", "Avoid irritants"]
  },
  { 
    id: 26,
    symptoms: ["rash", "itching", "hives", "swelling", "redness", "burning"], 
    disease: "Allergic Reaction", 
    urgency: "urgent", 
    description: "Hypersensitivity response to allergens",
    category: "Dermatological",
    commonTreatments: ["Antihistamines", "Epinephrine if severe", "Avoid allergens", "Cool compresses"],
    prevention: ["Avoid known allergens", "Carry epipen if severe", "Read labels"]
  },
  { 
    id: 27,
    symptoms: ["itching", "rash", "redness", "burning", "blisters", "dry skin"], 
    disease: "Contact Dermatitis", 
    urgency: "routine", 
    description: "Skin reaction to irritants or allergens",
    category: "Dermatological",
    commonTreatments: ["Avoid irritant", "Topical corticosteroids", "Moisturize", "Cool compresses"],
    prevention: ["Skin protection", "Patch testing", "Avoid known irritants"]
  },
  { 
    id: 28,
    symptoms: ["rash", "fever", "blisters", "headache", "itching", "fatigue"], 
    disease: "Chickenpox", 
    urgency: "urgent", 
    description: "Viral infection causing itchy blisters and fever",
    category: "Dermatological",
    commonTreatments: ["Rest", "Anti-itch medication", "Hydration", "Calamine lotion"],
    prevention: ["Vaccination", "Avoid contact", "Good hygiene"]
  },
  { 
    id: 29,
    symptoms: ["pimples", "blackheads", "whiteheads", "inflamed skin", "cysts", "scars"], 
    disease: "Acne", 
    urgency: "self-care", 
    description: "Skin condition with blocked pores causing pimples",
    category: "Dermatological",
    commonTreatments: ["Topical treatments", "Oral medication", "Skincare routine", "Laser therapy"],
    prevention: ["Regular cleansing", "Non-comedogenic products", "Healthy diet"]
  },
  { 
    id: 30,
    symptoms: ["fever", "rash", "joint pain", "headache", "muscle pain", "fatigue"], 
    disease: "Dengue", 
    urgency: "emergency", 
    description: "Mosquito-borne viral infection requiring medical attention",
    category: "Dermatological",
    commonTreatments: ["Hydration", "Pain relief", "Hospitalization if severe", "Rest"],
    prevention: ["Mosquito repellent", "Remove standing water", "Mosquito nets"]
  },
  
  // Musculoskeletal
  { 
    id: 31,
    symptoms: ["joint pain", "stiffness", "swelling", "warmth", "reduced mobility", "morning stiffness"], 
    disease: "Arthritis", 
    urgency: "routine", 
    description: "Joint inflammation causing pain and stiffness",
    category: "Musculoskeletal",
    commonTreatments: ["Pain relievers", "Physical therapy", "Joint protection", "Heat/cold therapy"],
    prevention: ["Maintain healthy weight", "Regular exercise", "Joint protection"]
  },
  { 
    id: 32,
    symptoms: ["back pain", "muscle spasms", "numbness", "tingling", "leg pain", "weakness"], 
    disease: "Sciatica", 
    urgency: "routine", 
    description: "Sciatic nerve compression causing leg pain",
    category: "Musculoskeletal",
    commonTreatments: ["Physical therapy", "Pain relievers", "Stretching", "Heat therapy"],
    prevention: ["Good posture", "Regular exercise", "Proper lifting technique"]
  },
  { 
    id: 33,
    symptoms: ["joint pain", "redness", "swelling", "warmth", "tophi", "fever"], 
    disease: "Gout", 
    urgency: "urgent", 
    description: "Uric acid crystal arthritis causing severe joint pain",
    category: "Musculoskeletal",
    commonTreatments: ["Pain relievers", "Diet changes", "Medications", "Rest"],
    prevention: ["Low purine diet", "Stay hydrated", "Limit alcohol"]
  },
  
  // Psychological
  { 
    id: 34,
    symptoms: ["sadness", "loss of interest", "fatigue", "sleep problems", "appetite changes", "difficulty concentrating"], 
    disease: "Depression", 
    urgency: "routine", 
    description: "Mood disorder affecting daily functioning",
    category: "Psychological",
    commonTreatments: ["Therapy", "Antidepressants", "Support groups", "Lifestyle changes"],
    prevention: ["Stress management", "Social support", "Regular exercise"]
  },
  { 
    id: 35,
    symptoms: ["anxiety", "restlessness", "rapid heartbeat", "sweating", "panic", "worry", "dizziness"], 
    disease: "Anxiety Disorder", 
    urgency: "routine", 
    description: "Excessive worry and fear affecting daily life",
    category: "Psychological",
    commonTreatments: ["Therapy", "Medication", "Relaxation techniques", "Support groups"],
    prevention: ["Stress management", "Regular exercise", "Healthy lifestyle"]
  },
  { 
    id: 36,
    symptoms: ["panic", "heart racing", "sweating", "trembling", "chest pain", "dizziness", "fear"], 
    disease: "Panic Disorder", 
    urgency: "urgent", 
    description: "Recurrent panic attacks with severe symptoms",
    category: "Psychological",
    commonTreatments: ["Cognitive behavioral therapy", "Medication", "Breathing exercises", "Relaxation"],
    prevention: ["Stress reduction", "Avoid triggers", "Regular exercise"]
  },
  
  // Endocrine
  { 
    id: 37,
    symptoms: ["fatigue", "weight gain", "cold intolerance", "dry skin", "constipation", "hair loss"], 
    disease: "Hypothyroidism", 
    urgency: "routine", 
    description: "Underactive thyroid causing systemic symptoms",
    category: "Endocrine",
    commonTreatments: ["Thyroid hormone replacement", "Regular monitoring", "Diet"],
    prevention: ["Regular check-ups", "Healthy diet", "Exercise"]
  },
  { 
    id: 38,
    symptoms: ["weight loss", "rapid heartbeat", "sweating", "anxiety", "tremor", "heat intolerance"], 
    disease: "Hyperthyroidism", 
    urgency: "routine", 
    description: "Overactive thyroid causing metabolic symptoms",
    category: "Endocrine",
    commonTreatments: ["Medications", "Radioactive iodine", "Surgery", "Beta-blockers"],
    prevention: ["Regular check-ups", "Healthy lifestyle"]
  },
  { 
    id: 39,
    symptoms: ["excessive thirst", "frequent urination", "fatigue", "blurred vision", "hunger", "slow healing"], 
    disease: "Diabetes", 
    urgency: "routine", 
    description: "High blood sugar requiring management",
    category: "Endocrine",
    commonTreatments: ["Insulin", "Oral medication", "Diet management", "Exercise"],
    prevention: ["Healthy diet", "Regular exercise", "Weight management", "Regular check-ups"]
  },
  
  // Urological
  { 
    id: 40,
    symptoms: ["burning urination", "frequent urination", "lower abdominal pain", "cloudy urine", "strong odor"], 
    disease: "Urinary Tract Infection", 
    urgency: "urgent", 
    description: "Bladder infection causing urinary discomfort",
    category: "Urological",
    commonTreatments: ["Antibiotics", "Hydration", "Pain relief", "Cranberry juice"],
    prevention: ["Stay hydrated", "Proper hygiene", "Empty bladder fully"]
  },
  { 
    id: 41,
    symptoms: ["lower back pain", "fever", "nausea", "painful urination", "chills", "vomiting"], 
    disease: "Kidney Infection", 
    urgency: "emergency", 
    description: "Kidney infection requiring immediate medical attention",
    category: "Urological",
    commonTreatments: ["Antibiotics", "Hospitalization", "IV fluids", "Pain management"],
    prevention: ["Treat UTIs promptly", "Stay hydrated", "Good hygiene"]
  },
  
  // Eye Conditions
  { 
    id: 42,
    symptoms: ["red eye", "itching", "discharge", "watery eyes", "gritty feeling", "swollen eyelid"], 
    disease: "Conjunctivitis", 
    urgency: "routine", 
    description: "Pink eye causing redness and discharge",
    category: "Eye",
    commonTreatments: ["Eye drops", "Cold compress", "Hygiene", "Avoid touching"],
    prevention: ["Hand washing", "Avoid touching eyes", "Don't share towels"]
  },
  { 
    id: 43,
    symptoms: ["eye pain", "redness", "blurred vision", "headache", "halos around lights", "nausea"], 
    disease: "Glaucoma", 
    urgency: "emergency", 
    description: "Increased eye pressure requiring immediate care",
    category: "Eye",
    commonTreatments: ["Eye drops", "Laser treatment", "Surgery", "Regular monitoring"],
    prevention: ["Regular eye exams", "Early detection", "Monitor eye pressure"]
  },
  
  // Ear Conditions
  { 
    id: 44,
    symptoms: ["ear pain", "fever", "irritability", "difficulty hearing", "fluid drainage", "tugging ear"], 
    disease: "Ear Infection", 
    urgency: "urgent", 
    description: "Middle ear infection causing pain and fever",
    category: "Ear",
    commonTreatments: ["Antibiotics", "Pain relievers", "Warm compress", "Rest"],
    prevention: ["Avoid smoking", "Dry ears after swimming", "Treat allergies"]
  },
  { 
    id: 45,
    symptoms: ["ringing in ears", "hearing loss", "dizziness", "ear fullness", "headache"], 
    disease: "Tinnitus", 
    urgency: "routine", 
    description: "Ear ringing affecting quality of life",
    category: "Ear",
    commonTreatments: ["Sound therapy", "Hearing aids", "Medication", "Cognitive therapy"],
    prevention: ["Protect hearing", "Avoid loud noise", "Manage stress"]
  },
  
  // Dental
  { 
    id: 46,
    symptoms: ["tooth pain", "swelling", "fever", "bad breath", "difficulty chewing", "sensitivity"], 
    disease: "Tooth Abscess", 
    urgency: "urgent", 
    description: "Dental infection requiring treatment",
    category: "Dental",
    commonTreatments: ["Antibiotics", "Root canal", "Extraction", "Pain relievers"],
    prevention: ["Regular dental care", "Good oral hygiene", "Regular check-ups"]
  },
  { 
    id: 47,
    symptoms: ["tooth pain", "temperature sensitivity", "aching", "sweet sensitivity", "visible hole"], 
    disease: "Cavity", 
    urgency: "routine", 
    description: "Tooth decay causing pain and sensitivity",
    category: "Dental",
    commonTreatments: ["Fillings", "Fluoride treatment", "Crowns", "Root canal"],
    prevention: ["Brush twice daily", "Limit sugar", "Regular dental visits"]
  },
  
  // Systemic
  { 
    id: 48,
    symptoms: ["fever", "headache", "joint pain", "rash", "fatigue", "muscle pain", "chills"], 
    disease: "Viral Infection", 
    urgency: "routine", 
    description: "General viral illness causing systemic symptoms",
    category: "Systemic",
    commonTreatments: ["Rest", "Hydration", "Pain relievers", "Symptom management"],
    prevention: ["Hand hygiene", "Avoid close contact", "Healthy lifestyle"]
  },
  { 
    id: 49,
    symptoms: ["fever", "chills", "sweating", "body ache", "fatigue", "localized pain"], 
    disease: "Bacterial Infection", 
    urgency: "urgent", 
    description: "Bacterial illness requiring antibiotics",
    category: "Systemic",
    commonTreatments: ["Antibiotics", "Rest", "Hydration", "Symptom relief"],
    prevention: ["Hand hygiene", "Wound care", "Avoid contact with sick people"]
  },
  { 
    id: 50,
    symptoms: ["fatigue", "weakness", "pale skin", "shortness of breath", "dizziness", "cold hands"], 
    disease: "Anemia", 
    urgency: "routine", 
    description: "Low red blood cells causing fatigue",
    category: "Systemic",
    commonTreatments: ["Iron supplements", "Vitamin B12", "Diet changes", "Treat underlying cause"],
    prevention: ["Iron-rich diet", "Vitamin supplements", "Regular check-ups"]
  },
  
  // Autoimmune
  { 
    id: 51,
    symptoms: ["joint pain", "rash", "sun sensitivity", "fatigue", "fever", "hair loss"], 
    disease: "Lupus", 
    urgency: "urgent", 
    description: "Autoimmune disease affecting multiple organs",
    category: "Autoimmune",
    commonTreatments: ["Immunosuppressants", "Anti-inflammatory drugs", "Sun protection"],
    prevention: ["Sun protection", "Regular check-ups", "Healthy lifestyle"]
  },
  
  // Pregnancy Related
  { 
    id: 52,
    symptoms: ["nausea", "vomiting", "fatigue", "tender breasts", "missed period", "frequent urination"], 
    disease: "Pregnancy", 
    urgency: "routine", 
    description: "Potential pregnancy with early symptoms",
    category: "Pregnancy",
    commonTreatments: ["Prenatal care", "Healthy diet", "Folic acid", "Regular check-ups"],
    prevention: ["Prenatal vitamins", "Healthy lifestyle", "Regular check-ups"]
  },
  
  // Emergency Conditions
  { 
    id: 53,
    symptoms: ["severe allergic reaction", "swelling", "breathing difficulty", "rash", "dizziness"], 
    disease: "Anaphylaxis", 
    urgency: "emergency", 
    description: "Severe allergic reaction requiring emergency care",
    category: "Emergency",
    commonTreatments: ["Epinephrine", "Emergency care", "Oxygen", "Antihistamines"],
    prevention: ["Avoid allergens", "Carry epipen", "Medical ID bracelet"]
  },
  { 
    id: 54,
    symptoms: ["seizures", "loss of consciousness", "confusion", "stiffness", "jerking movements"], 
    disease: "Epilepsy", 
    urgency: "emergency", 
    description: "Neurological seizure disorder requiring management",
    category: "Emergency",
    commonTreatments: ["Anti-seizure medication", "Ketogenic diet", "VNS therapy"],
    prevention: ["Avoid triggers", "Take medications", "Regular check-ups"]
  },
  { 
    id: 55,
    symptoms: ["severe abdominal pain", "vomiting blood", "black stool", "dizziness", "weakness"], 
    disease: "Bleeding Ulcer", 
    urgency: "emergency", 
    description: "Internal bleeding requiring immediate care",
    category: "Emergency",
    commonTreatments: ["Hospitalization", "Blood transfusion", "Endoscopy", "Surgery"],
    prevention: ["Avoid NSAIDs", "Limit alcohol", "Treat H. pylori"]
  },
  // Additional diseases
  { 
    id: 56,
    symptoms: ["headache", "neck pain", "shoulder pain", "stiffness", "limited movement"], 
    disease: "Cervical Spondylosis", 
    urgency: "routine", 
    description: "Age-related wear and tear of neck vertebrae",
    category: "Musculoskeletal",
    commonTreatments: ["Physical therapy", "Pain relievers", "Neck exercises", "Heat therapy"],
    prevention: ["Good posture", "Ergonomic workspace", "Regular exercise"]
  },
  { 
    id: 57,
    symptoms: ["insomnia", "fatigue", "anxiety", "racing thoughts", "irritability", "difficulty concentrating"], 
    disease: "Insomnia", 
    urgency: "routine", 
    description: "Difficulty sleeping affecting daily functioning",
    category: "Psychological",
    commonTreatments: ["Sleep hygiene", "Cognitive therapy", "Medication", "Relaxation techniques"],
    prevention: ["Regular sleep schedule", "Avoid caffeine", "Relaxation before bed"]
  },
  { 
    id: 58,
    symptoms: ["low blood sugar", "shakiness", "sweating", "confusion", "dizziness", "hunger", "weakness"], 
    disease: "Hypoglycemia", 
    urgency: "urgent", 
    description: "Low blood sugar requiring immediate treatment",
    category: "Endocrine",
    commonTreatments: ["Quick sugar source", "Diet management", "Regular meals"],
    prevention: ["Regular meals", "Monitor blood sugar", "Carry quick sugar"]
  },
  { 
    id: 59,
    symptoms: ["frequent urination", "urgency", "incontinence", "nocturia", "weak stream"], 
    disease: "Overactive Bladder", 
    urgency: "routine", 
    description: "Bladder control issue causing frequent urges",
    category: "Urological",
    commonTreatments: ["Bladder training", "Medications", "Pelvic floor exercises"],
    prevention: ["Pelvic floor exercises", "Limit caffeine", "Stay hydrated"]
  },
  { 
    id: 60,
    symptoms: ["dry eyes", "burning", "gritty feeling", "redness", "blurred vision", "eye fatigue"], 
    disease: "Dry Eye Syndrome", 
    urgency: "routine", 
    description: "Inadequate tear production causing eye discomfort",
    category: "Eye",
    commonTreatments: ["Artificial tears", "Eye drops", "Humidifier", "Omega-3 supplements"],
    prevention: ["Blink regularly", "Use humidifier", "Limit screen time"]
  }
];