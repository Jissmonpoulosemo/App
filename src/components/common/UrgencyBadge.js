import React from "react";
import { URGENCY_META } from "../../utils/constants";

export const UrgencyBadge = ({ level, size = "" }) => {
  const meta = URGENCY_META[level] || URGENCY_META.routine;
  return (
    <span className={`badge ${meta.cls} ${size === "sm" ? "sm" : ""}`}>
      <span className="badge-dot" />
      {meta.label}
    </span>
  );
};