/* ---------------------------------------------------------------------- */
/*  WhatsApp Number                                                       */
/* ---------------------------------------------------------------------- */

export const WHATSAPP_NUMBER = "9633228352";

/* ---------------------------------------------------------------------- */
/*  Urgency Meta                                                          */
/* ---------------------------------------------------------------------- */

export const URGENCY_META = {
  emergency: { label: "Emergency", cls: "urgency-emergency" },
  urgent: { label: "Urgent", cls: "urgency-urgent" },
  routine: { label: "Routine", cls: "urgency-routine" },
  "self-care": { label: "Self-care", cls: "urgency-self-care" },
};

export const urgencyRank = { emergency: 0, urgent: 1, routine: 2, "self-care": 3 };

/* ---------------------------------------------------------------------- */
/*  Package Plans                                                         */
/* ---------------------------------------------------------------------- */

export const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    tagline: "Try Symptra for occasional check-ins.",
    features: ["2 AI symptom checks / month", "Standard response time", "Basic health record", "Access to disease library"],
    icon: "Heart",
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
    icon: "Shield",
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
    icon: "Award",
    color: "amber"
  },
];

/* ---------------------------------------------------------------------- */
/*  Navigation Items                                                      */
/* ---------------------------------------------------------------------- */

export const NAV_ITEMS = {
  patient: [
    { key: "landing", label: "Overview", icon: "LayoutDashboard" },
    { key: "checker", label: "Symptom Checker", icon: "Activity" },
    { key: "diseaseLibrary", label: "Disease Library", icon: "Microscope" },
    { key: "patientDashboard", label: "My Health", icon: "FileText" },
  ],
  doctor: [
    { key: "landing", label: "Overview", icon: "LayoutDashboard" },
    { key: "checker", label: "Symptom Checker", icon: "Activity" },
    { key: "diseaseLibrary", label: "Disease Library", icon: "Microscope" },
    { key: "doctorDashboard", label: "Clinic Dashboard", icon: "Stethoscope" },
  ],
};