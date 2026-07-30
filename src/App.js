import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import {
  Activity,
  Users,
  LayoutDashboard,
  CalendarClock,
  Search,
  AlertTriangle,
  CheckCircle2,
  Menu,
  X,
  Send,
  Clock,
  ShieldAlert,
  Stethoscope,
  Bell,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
  FileText,
  LogOut,
  Package,
  Check,
  Star,
  UserPlus,
  Compass,
  MessageCircle,
  Heart,
  Microscope,
  Phone,
  Shield,
  Award,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  WhatsApp Integration                                                  */
/* ---------------------------------------------------------------------- */

const WHATSAPP_NUMBER = "9633228352";

const sendWhatsAppEnquiry = (packageName, patientName, enquiryType = "package") => {
  const name = patientName && patientName.trim() !== "" ? patientName.trim() : "Guest Patient";
  
  let message = "";
  
  if (enquiryType === "package") {
    message = `Hi! 👋 I'm interested in the ${packageName} package.\n\nMy name: ${name}\n\nCan you please provide more details about the features and pricing?`;
  } else if (enquiryType === "appointment") {
    message = `Hi! 👋 I'd like to book an appointment.\n\nMy name: ${name}\n\nPlease let me know the available slots.`;
  } else if (enquiryType === "consultation") {
    message = `Hi! 👋 I need a medical consultation.\n\nMy name: ${name}\n\nI'm experiencing some symptoms and need medical advice.`;
  } else {
    message = `Hi! 👋 I need assistance with Symptra.\n\nMy name: ${name}`;
  }
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

/* ---------------------------------------------------------------------- */
/*  Comprehensive Disease Database - 75+ diseases with symptoms          */
/* ---------------------------------------------------------------------- */

const DISEASE_DATABASE = [
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

/* ---------------------------------------------------------------------- */
/*  Small building blocks                                                 */
/* ---------------------------------------------------------------------- */

const PulseMark = ({ width = 34, strokeWidth = 2.5 }) => (
  <svg viewBox="0 0 60 32" style={{ width, height: width * (32 / 60) }} fill="none">
    <path
      d="M0 16 H14 L19 6 L25 26 L31 10 L35 16 H60"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const URGENCY_META = {
  emergency: { label: "Emergency", cls: "urgency-emergency" },
  urgent: { label: "Urgent", cls: "urgency-urgent" },
  routine: { label: "Routine", cls: "urgency-routine" },
  "self-care": { label: "Self-care", cls: "urgency-self-care" },
};

const UrgencyBadge = ({ level, size = "" }) => {
  const meta = URGENCY_META[level] || URGENCY_META.routine;
  return (
    <span className={`badge ${meta.cls} ${size === "sm" ? "sm" : ""}`}>
      <span className="badge-dot" />
      {meta.label}
    </span>
  );
};

const Avatar = ({ initials, tone = "violet" }) => (
  <div className={`avatar ${tone !== "violet" ? `tone-${tone}` : ""}`}>{initials}</div>
);

/* ---------------------------------------------------------------------- */
/*  Search Functions - Improved with alphabetical ordering               */
/* ---------------------------------------------------------------------- */

function searchDiseases(query) {
  if (!query || query.trim().length < 2) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  const results = DISEASE_DATABASE.map(entry => {
    let score = 0;
    let matchedSymptoms = [];
    
    // Check disease name match (highest priority)
    if (entry.disease.toLowerCase().includes(searchTerm)) {
      score += 10;
    }
    
    // Check exact disease name match
    if (entry.disease.toLowerCase() === searchTerm) {
      score += 20;
    }
    
    // Check symptoms match
    entry.symptoms.forEach(symptom => {
      const symptomLower = symptom.toLowerCase();
      if (symptomLower.includes(searchTerm) || searchTerm.includes(symptomLower)) {
        score += 5;
        if (!matchedSymptoms.includes(symptom)) {
          matchedSymptoms.push(symptom);
        }
      }
    });
    
    // Check category match
    if (entry.category.toLowerCase().includes(searchTerm)) {
      score += 3;
    }
    
    return {
      ...entry,
      score,
      matchedSymptoms,
    };
  });
  
  // Filter results with score > 0 and sort by score (highest first), then alphabetically
  return results
    .filter(r => r.score > 0)
    .sort((a, b) => {
      // First sort by score
      if (b.score !== a.score) return b.score - a.score;
      // If scores are equal, sort alphabetically by disease name
      return a.disease.localeCompare(b.disease);
    });
}

function getAllSymptoms() {
  const symptomSet = new Set();
  DISEASE_DATABASE.forEach(entry => {
    entry.symptoms.forEach(s => symptomSet.add(s));
  });
  return Array.from(symptomSet).sort();
}

/* ---------------------------------------------------------------------- */
/*  Mock Data                                                             */
/* ---------------------------------------------------------------------- */

const MOCK_PATIENTS = [
  { id: 1, name: "Ananya Rao", age: 29, gender: "F", avatar: "AR", tone: "violet", lastVisit: "2026-07-18" },
  { id: 2, name: "Rahul Menon", age: 45, gender: "M", avatar: "RM", tone: "fuchsia", lastVisit: "2026-07-24" },
  { id: 3, name: "Priya Nair", age: 34, gender: "F", avatar: "PN", tone: "indigo", lastVisit: "2026-07-22" },
  { id: 4, name: "Thomas Varghese", age: 61, gender: "M", avatar: "TV", tone: "plum", lastVisit: "2026-07-15" },
  { id: 5, name: "Fathima Beevi", age: 52, gender: "F", avatar: "FB", tone: "violet", lastVisit: "2026-07-10" },
];

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    tagline: "Try Symptra for occasional check-ins.",
    features: ["2 AI symptom checks / month", "Standard response time", "Basic health record", "Access to disease library"],
    icon: Heart,
    color: "violet"
  },
  {
    id: "plus",
    name: "Plus",
    price: "₹499/mo",
    tagline: "For families who want faster answers.",
    features: [
      "Unlimited AI symptom checks",
      "24-hour doctor review",
      "Appointment booking",
      "Up to 3 family profiles",
      "Full disease database access",
      "Treatment recommendations"
    ],
    highlight: true,
    icon: Shield,
    color: "emerald"
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹999/mo",
    tagline: "Priority care, always on.",
    features: [
      "Everything in Plus",
      "Priority same-day review",
      "Dedicated care coordinator",
      "Unlimited family profiles",
      "Specialist referrals",
      "Health tracking & analytics"
    ],
    icon: Award,
    color: "amber"
  },
];

const seedCheck = (id, patientName, symptomsText, urgency, conditions, redFlags, action, reviewed, note) => ({
  id,
  patientName,
  symptomsText,
  timestamp: new Date(Date.now() - id * 36e5 * 9).toISOString(),
  result: {
    urgency,
    conditions,
    redFlags,
    recommendedAction: action,
    disclaimer: "This is not a diagnosis. Please consult a licensed doctor for confirmation and treatment.",
  },
  doctorReviewed: reviewed,
  doctorNote: note || "",
});

const INITIAL_CHECKS = [
  seedCheck(
    1,
    "Rahul Menon",
    "Tight chest pain radiating to my left arm, shortness of breath, started 20 minutes ago.",
    "emergency",
    [
      { name: "Possible cardiac event", likelihood: "high", description: "Chest pain with arm radiation and breathlessness needs urgent evaluation." },
      { name: "Severe anxiety attack", likelihood: "low", description: "Can mimic cardiac symptoms but should not be assumed." },
    ],
    ["Chest pain radiating to arm", "Shortness of breath"],
    "Call emergency services or go to the nearest ER immediately.",
    false,
    ""
  ),
  seedCheck(
    2,
    "Priya Nair",
    "Dry cough for 9 days, mild fever in the evenings, tired all the time.",
    "urgent",
    [
      { name: "Lower respiratory infection", likelihood: "moderate", description: "Persistent cough with evening fever can indicate a chest infection." },
      { name: "Post-viral cough", likelihood: "moderate", description: "Cough can linger for weeks after a viral illness." },
    ],
    ["Cough lasting over a week"],
    "Book a clinic visit within 24–48 hours for a chest check.",
    true,
    "Ordered chest X-ray, prescribed antibiotics pending review."
  ),
  seedCheck(
    3,
    "Ananya Rao",
    "Throbbing headache on one side, sensitive to light, nausea, happens most Fridays.",
    "routine",
    [
      { name: "Migraine", likelihood: "high", description: "One-sided throbbing pain with light sensitivity is a classic migraine pattern." },
      { name: "Tension headache", likelihood: "low", description: "Usually feels more like pressure than throbbing." },
    ],
    [],
    "Track triggers and book a routine neurology follow-up.",
    true,
    "Prescribed preventive medication, review in 4 weeks."
  ),
];

/* ---------------------------------------------------------------------- */
/*  Auth Screen                                                           */
/* ---------------------------------------------------------------------- */

const AuthScreen = ({ onAuth }) => {
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

/* ---------------------------------------------------------------------- */
/*  Packages Screen with WhatsApp                                        */
/* ---------------------------------------------------------------------- */

const PackagesScreen = ({ onChoose, onSkip, patientName }) => {
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
            const Icon = p.icon || Heart;
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

      {/* WhatsApp Confirmation Modal */}
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

/* ---------------------------------------------------------------------- */
/*  Confirmation Screen                                                   */
/* ---------------------------------------------------------------------- */

const ConfirmationScreen = ({ pkg, onConfirm, onBack }) => (
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

/* ---------------------------------------------------------------------- */
/*  Sidebar / Topbar                                                      */
/* ---------------------------------------------------------------------- */

const NAV_ITEMS = {
  patient: [
    { key: "landing", label: "Overview", icon: LayoutDashboard },
    { key: "checker", label: "Symptom Checker", icon: Activity },
    { key: "diseaseLibrary", label: "Disease Library", icon: Microscope },
    { key: "patientDashboard", label: "My Health", icon: FileText },
  ],
  doctor: [
    { key: "landing", label: "Overview", icon: LayoutDashboard },
    { key: "checker", label: "Symptom Checker", icon: Activity },
    { key: "diseaseLibrary", label: "Disease Library", icon: Microscope },
    { key: "doctorDashboard", label: "Clinic Dashboard", icon: Stethoscope },
  ],
};

const Sidebar = ({ view, setView, role, mobileOpen, setMobileOpen }) => {
  const items = NAV_ITEMS[role];
  const Content = (
    <div className="sidebar-inner">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <PulseMark width={36} />
        </div>
        <div>
          <p className="font-display sidebar-brand-name">Symptra</p>
          <p className="sidebar-brand-tag">Know before you go</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;
          const active = view === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setView(item.key);
                setMobileOpen(false);
              }}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        Symptra assists triage. It does not replace a licensed clinician.
      </div>
    </div>
  );

  return (
    <>
      <aside className="sidebar">{Content}</aside>
      {mobileOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <aside className="mobile-drawer">
            <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
            {Content}
          </aside>
        </div>
      )}
    </>
  );
};

const TopBar = ({ role, name, setMobileOpen, alertCount, onLogout }) => (
  <header className="topbar">
    <div className="topbar-left">
      <button className="mobile-nav-toggle" onClick={() => setMobileOpen(true)}>
        <Menu size={24} />
      </button>
      <span className="role-pill">{role === "doctor" ? "Doctor account" : "Patient account"}</span>
      <span className="user-name-display">👤 {name}</span>
    </div>
    <div className="topbar-right">
      <div className="bell-wrap">
        <Bell size={20} />
        {alertCount > 0 && <span className="bell-badge">{alertCount}</span>}
      </div>
      <div className="topbar-user">
        <Avatar initials={(name || "?").slice(0, 2).toUpperCase()} />
        <span className="topbar-user-name">{name}</span>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={16} />
        <span className="login-btn-label">Log out</span>
      </button>
    </div>
  </header>
);

/* ---------------------------------------------------------------------- */
/*  Landing Page                                                          */
/* ---------------------------------------------------------------------- */

const Landing = ({ setView, onChoosePackage }) => (
  <div className="fade-in-up">
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <Sparkles size={14} />
          AI triage built for clinics
        </div>
        <h1 className="font-display hero-title">
          Know what's wrong <span className="accent">before</span> you walk in.
        </h1>
        <p className="hero-sub">
          Patients describe symptoms in plain words. Symptra reads the pattern,
          flags urgency, and hands your clinic a ready-to-review case — before
          the appointment starts.
        </p>
        <div className="hero-ctas">
          <button onClick={() => setView("checker")} className="btn-primary hero-primary-btn">
            Check my symptoms <ArrowRight size={16} />
          </button>
          <button onClick={() => setView("doctorDashboard")} className="btn-secondary">
            I run a clinic
          </button>
        </div>

        <svg viewBox="0 0 600 40" className="hero-divider">
          <path
            d="M0 20 H220 L232 4 L246 36 L260 12 L272 20 H600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pulse-line"
          />
        </svg>
      </div>
    </section>

    <section className="features">
      <div className="features-grid">
        {[
          { icon: Activity, title: "AI symptom analysis", desc: "Free-text symptoms become ranked possible conditions, urgency level, and next steps in seconds." },
          { icon: Users, title: "Patient records, unified", desc: "Every check-in, visit, and note lives on one timeline your care team can trust." },
          { icon: Stethoscope, title: "Doctor-first triage queue", desc: "Cases sort themselves by urgency, so the chest pain never waits behind the skin rash." },
          { icon: CalendarClock, title: "Appointments that fit", desc: "Booking suggests the right slot and specialist based on what the AI already flagged." },
          { icon: ShieldAlert, title: "Red flag alerts", desc: "Emergency-level symptoms are surfaced instantly, not buried in a queue." },
          { icon: FileText, title: "One shared history", desc: "Patients and doctors see the same record — no retelling the story twice." },
        ].map((f, i) => (
          <div key={i} className="card feature-card">
            <div className="feature-icon">
              <f.icon size={20} />
            </div>
            <h3 className="font-display feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="features">
      <h2 className="font-display page-title" style={{ textAlign: "center", fontSize: 30, marginBottom: 8 }}>
        Plans & Pricing
      </h2>
      <p className="page-sub" style={{ textAlign: "center", marginBottom: 28 }}>
        Choose what fits you — you can switch plans anytime.
      </p>
      <div className="packages-grid">
        {PACKAGES.map((p) => {
          const Icon = p.icon || Heart;
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
              <button
                className={p.highlight ? "btn-primary package-btn" : "btn-outline package-btn"}
                onClick={() => onChoosePackage(p)}
              >
                Choose {p.name}
              </button>
            </div>
          );
        })}
      </div>
    </section>

    <section className="trust-section">
      <div className="trust-inner">
        <div>
          <h3 className="font-display trust-title">
            Built to sit beside your clinicians, not replace them.
          </h3>
          <p className="trust-sub">
            Every AI result carries a confidence level and a clear disclaimer.
            Final calls always stay with your doctors.
          </p>
        </div>
        <button onClick={() => setView("checker")} className="trust-btn">
          Try the checker <ChevronRight size={16} />
        </button>
      </div>
    </section>
  </div>
);

/* ---------------------------------------------------------------------- */
/*  Disease Library Component                                             */
/* ---------------------------------------------------------------------- */

const DiseaseLibrary = ({ patientName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDisease, setSelectedDisease] = useState(null);

  const categories = ["All", ...new Set(DISEASE_DATABASE.map(d => d.category))];
  
  // Improved search with alphabetical ordering
  const filteredDiseases = searchTerm.trim().length >= 2 
    ? searchDiseases(searchTerm)
    : DISEASE_DATABASE;
  
  // Further filter by category and sort alphabetically
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

      {/* Disease Detail Modal */}
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

/* ---------------------------------------------------------------------- */
/*  Symptom Checker with Enhanced Search                                  */
/* ---------------------------------------------------------------------- */

const SymptomSearchInput = ({ value, onChange, onSelect }) => {
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

const SymptomChecker = ({ onSaveCheck, currentName }) => {
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
    // Fix: Use the correct function name 'searchDiseases'
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
      // Fallback to local matching - diseases appear at top
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
          placeholder="e.g. Ananya Rao"
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

/* ---------------------------------------------------------------------- */
/*  Patient Dashboard                                                     */
/* ---------------------------------------------------------------------- */

const PatientDashboard = ({ checks, name, pkg, onChangePlan }) => {
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

/* ---------------------------------------------------------------------- */
/*  Doctor Dashboard                                                       */
/* ---------------------------------------------------------------------- */

const urgencyRank = { emergency: 0, urgent: 1, routine: 2, "self-care": 3 };

const DoctorDashboard = ({ checks, patients, onReview }) => {
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
    { label: "Diseases in DB", value: DISEASE_DATABASE.length, icon: Microscope },
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

/* ---------------------------------------------------------------------- */
/*  Root App                                                               */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState("login");
  const [role, setRole] = useState("patient");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [patients] = useState(MOCK_PATIENTS);
  const [checks, setChecks] = useState(INITIAL_CHECKS);
  const [activeName, setActiveName] = useState("");
  const [pendingPackage, setPendingPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const nextId = useRef(INITIAL_CHECKS.length + 1);

  const handleSaveCheck = ({ patientName, symptomsText, result }) => {
    setActiveName(patientName);
    setChecks((prev) => [
      ...prev,
      {
        id: nextId.current++,
        patientName,
        symptomsText,
        timestamp: new Date().toISOString(),
        result,
        doctorReviewed: false,
        doctorNote: "",
      },
    ]);
  };

  const handleReview = (id, note) => {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, doctorReviewed: true, doctorNote: note } : c)));
  };

  const handleAuth = ({ name, role: authRole, guest }) => {
    setActiveName(name);
    setAuthenticated(true);
    setRole(authRole);
    if (authRole === "doctor") {
      setView("doctorDashboard");
    } else {
      setView(guest ? "landing" : "packages");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setView("login");
    setRole("patient");
    setActiveName("");
    setSelectedPackage(null);
    setPendingPackage(null);
  };

  const alertCount = checks.filter((c) => c.result.urgency === "emergency" && !c.doctorReviewed).length;

  let content;

  if (!authenticated) {
    content = <AuthScreen onAuth={handleAuth} />;
  } else if (view === "packages") {
    content = (
      <PackagesScreen
        onChoose={(pkg) => {
          setPendingPackage(pkg);
          setView("confirmation");
        }}
        onSkip={() => setView("landing")}
        patientName={activeName}
      />
    );
  } else if (view === "confirmation" && pendingPackage) {
    content = (
      <ConfirmationScreen
        pkg={pendingPackage}
        onBack={() => setView("landing")}
        onConfirm={() => {
          setSelectedPackage(pendingPackage);
          setPendingPackage(null);
          setView("landing");
        }}
      />
    );
  } else {
    content = (
      <div className="app-shell">
        <Sidebar view={view} setView={setView} role={role} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="app-main-col">
          <TopBar role={role} name={activeName} setMobileOpen={setMobileOpen} alertCount={alertCount} onLogout={handleLogout} />
          <main>
            {view === "landing" && (
              <Landing
                setView={setView}
                onChoosePackage={(pkg) => {
                  setPendingPackage(pkg);
                  setView("confirmation");
                }}
              />
            )}
            {view === "checker" && <SymptomChecker onSaveCheck={handleSaveCheck} currentName={activeName} />}
            {view === "diseaseLibrary" && <DiseaseLibrary patientName={activeName} />}
            {view === "patientDashboard" && (
              <PatientDashboard
                checks={checks}
                name={activeName}
                pkg={selectedPackage}
                onChangePlan={() => setView("packages")}
              />
            )}
            {view === "doctorDashboard" && (
              <DoctorDashboard checks={checks} patients={patients} onReview={handleReview} />
            )}
          </main>
          <footer className="app-footer">
            © 2026 Symptra · AI-assisted triage, not a substitute for professional medical advice.
            <br />
            <small>📞 Contact us on WhatsApp: +91 9633228352</small>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      {content}
    </div>
  );
}