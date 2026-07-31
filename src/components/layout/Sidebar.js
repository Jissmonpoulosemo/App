import React from "react";
import { X } from "lucide-react";
import { PulseMark } from "../common/PulseMark";
import { NAV_ITEMS } from "../../utils/constants";

// Map icon names to actual components
const iconMap = {
  LayoutDashboard: require("lucide-react").LayoutDashboard,
  Activity: require("lucide-react").Activity,
  Microscope: require("lucide-react").Microscope,
  FileText: require("lucide-react").FileText,
  Stethoscope: require("lucide-react").Stethoscope,
};

const SidebarContent = ({ view, setView, role }) => {
  const items = NAV_ITEMS[role];
  
  return (
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
          const Icon = iconMap[item.icon];
          const active = view === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              {Icon && <Icon size={16} />}
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
};

export const Sidebar = ({ view, setView, role, mobileOpen, setMobileOpen }) => {
  return (
    <>
      <aside className="sidebar">
        <SidebarContent view={view} setView={setView} role={role} />
      </aside>
      {mobileOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <aside className="mobile-drawer">
            <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
            <SidebarContent 
              view={view} 
              setView={(key) => {
                setView(key);
                setMobileOpen(false);
              }} 
              role={role} 
            />
          </aside>
        </div>
      )}
    </>
  );
};