"use client"
import { useState, useEffect } from "react"

export default function StickyScrollCTA({
  href,
  productName,
}: {
  href: string
  productName: string
}) {
  const [visible, setVisible] = useState(false)

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
        transform: `translateX(-50%) translateY(${visible ? "0" : "90px"})`,
        opacity: visible ? 1 : 0,
        transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease",
        zIndex: 900,
        pointerEvents: visible ? "auto" : "none",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        background: "rgba(3,26,16,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,212,146,0.35)",
        borderRadius: "3rem",
        padding: "0.7rem 1.5rem 0.7rem 1.125rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,212,146,0.1)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00d492",
          flexShrink: 0,
          boxShadow: "0 0 6px #00d492",
        }}
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={{
          color: "#edf2f7",
          fontWeight: 700,
          fontSize: "0.875rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
          letterSpacing: "-0.01em",
        }}
      >
        Get {productName} + Bonus &rarr;
      </a>
    </div>
  )
}
