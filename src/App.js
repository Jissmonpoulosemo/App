import React, { useState, useRef } from "react";
import "./App.css";
import { AuthScreen } from "./components/auth/AuthScreen";
import { PackagesScreen } from "./components/packages/PackagesScreen";
import { ConfirmationScreen } from "./components/packages/ConfirmationScreen";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { Landing } from "./components/landing/Landing";
import { DiseaseLibrary } from "./components/disease/DiseaseLibrary";
import { SymptomChecker } from "./components/symptom/SymptomChecker";
import { PatientDashboard } from "./components/dashboard/PatientDashboard";
import { DoctorDashboard } from "./components/dashboard/DoctorDashboard";
import { MOCK_PATIENTS, INITIAL_CHECKS } from "./utils/mockData";

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