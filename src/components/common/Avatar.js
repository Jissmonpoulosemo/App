import React from "react";

export const Avatar = ({ initials, tone = "violet" }) => (
  <div className={`avatar ${tone !== "violet" ? `tone-${tone}` : ""}`}>{initials}</div>
);