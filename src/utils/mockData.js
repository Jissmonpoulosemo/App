export const MOCK_PATIENTS = [
  { id: 1, name: "Ananya Rao", age: 29, gender: "F", avatar: "AR", tone: "violet", lastVisit: "2026-07-18" },
  { id: 2, name: "Rahul Menon", age: 45, gender: "M", avatar: "RM", tone: "fuchsia", lastVisit: "2026-07-24" },
  { id: 3, name: "Priya Nair", age: 34, gender: "F", avatar: "PN", tone: "indigo", lastVisit: "2026-07-22" },
  { id: 4, name: "Thomas Varghese", age: 61, gender: "M", avatar: "TV", tone: "plum", lastVisit: "2026-07-15" },
  { id: 5, name: "Fathima Beevi", age: 52, gender: "F", avatar: "FB", tone: "violet", lastVisit: "2026-07-10" },
];

export const seedCheck = (id, patientName, symptomsText, urgency, conditions, redFlags, action, reviewed, note) => ({
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

export const INITIAL_CHECKS = [
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