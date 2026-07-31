import React from "react";
import { Menu, Bell, LogOut } from "lucide-react";
import { Avatar } from "../common/Avatar";

export const TopBar = ({ role, name, setMobileOpen, alertCount, onLogout }) => (
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