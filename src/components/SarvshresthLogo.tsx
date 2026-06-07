import React from 'react';

interface SarvshresthLogoProps {
  className?: string;
  size?: number;
}

export default function SarvshresthLogo({ className = "", size = 42 }: SarvshresthLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 ${className}`}
    >
      {/* Background White base layer to make the inner grid pop and hold physical contrast */}
      <ellipse
        cx="80"
        cy="65"
        rx="72"
        ry="54"
        fill="white"
      />

      {/* Outer globe boundary ellipse */}
      <ellipse
        cx="80"
        cy="65"
        rx="72"
        ry="54"
        fill="none"
        stroke="#121824"
        strokeWidth="3"
      />

      {/* Longitude Meridians connecting top (80, 11) to bottom (80, 119) */}
      <path d="M80,11 Q62,65 80,119" stroke="#1c2536" strokeWidth="2" opacity="0.85" />
      <path d="M80,11 Q44,65 80,119" stroke="#1c2536" strokeWidth="2" opacity="0.85" />
      <path d="M80,11 Q26,65 80,119" stroke="#1c2536" strokeWidth="2" opacity="0.85" />
      <path d="M80,11 Q8,65 80,119" stroke="#334155" strokeWidth="1.5" opacity="0.8" />

      <path d="M80,11 Q98,65 80,119" stroke="#1c2536" strokeWidth="2" opacity="0.85" />
      <path d="M80,11 Q116,65 80,119" stroke="#1c2536" strokeWidth="2" opacity="0.85" />
      <path d="M80,11 Q134,65 80,119" stroke="#1c2536" strokeWidth="2" opacity="0.85" />
      <path d="M80,11 Q152,65 80,119" stroke="#334155" strokeWidth="1.5" opacity="0.8" />

      {/* Axis lines */}
      <line x1="80" y1="11" x2="80" y2="119" stroke="#121824" strokeWidth="2.5" />

      {/* Latitude Parallels */}
      {/* Northern curves */}
      <path d="M14,45 Q80,25 146,45" stroke="#334155" strokeWidth="1.5" opacity="0.85" />
      <path d="M26,31 Q80,11 134,31" stroke="#334155" strokeWidth="1.5" opacity="0.85" />
      <path d="M44,20 Q80,1 116,20" stroke="#475569" strokeWidth="1.2" opacity="0.8" />

      {/* Southern curves */}
      <path d="M14,85 Q80,105 146,85" stroke="#334155" strokeWidth="1.5" opacity="0.85" />
      <path d="M26,99 Q80,119 134,99" stroke="#334155" strokeWidth="1.5" opacity="0.85" />
      <path d="M44,110 Q80,129 116,110" stroke="#475569" strokeWidth="1.2" opacity="0.8" />

      {/* Central equator axis line */}
      <line x1="8" y1="65" x2="152" y2="65" stroke="#121824" strokeWidth="2" />

      {/* Central clear mask pill matching logo image shape containing the brand name */}
      <ellipse
        cx="80"
        cy="65"
        rx="54"
        ry="23"
        fill="white"
        stroke="#121824"
        strokeWidth="2.5"
      />

      {/* Sanskrit text "सर्वश्रेष्ठ" in rich professional greenery Devanagari branding color */}
      <text
        x="80"
        y="73"
        fill="#15803d"
        fontSize="24"
        fontWeight="bold"
        fontFamily="'Noto Sans Devanagari', 'Inter', sans-serif"
        textAnchor="middle"
        style={{ letterSpacing: '0.01em' }}
      >
        सर्वश्रेष्ठ
      </text>
    </svg>
  );
}
