import React from "react";

export const PulseMark = ({ width = 34, strokeWidth = 2.5 }) => (
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