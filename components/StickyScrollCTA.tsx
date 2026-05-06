"use client"
import { useState, useEffect } from "react"

export default function StickyScrollCTA({ href, productName }: { href: string; productName: string }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 620)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "100px"})`,
        opacity: visible ? 1 : 0,
        transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.24s ease",
        zIndex: 900,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: hovered
            ? "rgba(0,24,14,0.98)"
            : "rgba(3,20,12,0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: hovered
            ? "1px solid rgba(0,212,146,0.55)"
            : "1px solid rgba(0,212,146,0.3)",
          borderRadius: "3rem",
          padding: "0.75rem 1.5rem 0.75rem 1.125rem",
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,212,146,0.1)"
            : "0 8px 32px rgba(0,0,0,0.45)",
          textDecoration: "none",
          transition: "background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
          transform: hovered ? "scale(1.025)" : "scale(1)",
          cursor: "pointer",
        }}
      >
        {/* Pulse dot */}
        <span style={{ position: "relative", width: 9, height: 9, flexShrink: 0 }}>
          <span style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#00d492",
            boxShadow: "0 0 8px rgba(0,212,146,0.7)",
            animation: "pulse-dot 2s ease-in-out infinite",
          }} />
        </span>

        {/* Text */}
        <span style={{ display: "flex", flexDirection: "column", gap: "0.05rem" }}>
          <span style={{
            color: "#edf2f7",
            fontWeight: 700,
            fontSize: "0.875rem",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}>
            Get {productName} + $171 Bonus &rarr;
          </span>
          <span style={{
            color: "#4a6741",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: 1,
          }}>
            Launch pricing · One-time fee
          </span>
        </span>

        <style>{`
          @keyframes pulse-dot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.4); opacity: 0.7; }
          }
        `}</style>
      </a>
    </div>
  )
}
