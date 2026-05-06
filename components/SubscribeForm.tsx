"use client"
import { useState } from "react"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? "success" : "error")
      if (res.ok) setEmail("")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          background: "rgba(0,212,146,0.08)",
          border: "1px solid rgba(0,212,146,0.25)",
          borderRadius: "1rem",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>&#10003;</p>
        <p
          style={{
            color: "#edf2f7",
            fontWeight: 700,
            marginBottom: "0.25rem",
          }}
        >
          You&apos;re in!
        </p>
        <p style={{ color: "#7b8ea5", fontSize: "0.875rem" }}>
          Check your inbox — your first deal alert is on the way.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#edf2f7",
          marginBottom: "0.6rem",
        }}
      >
        Your email address
      </p>
      <div style={{ marginBottom: "0.75rem" }}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="subscribe-input"
          style={{
            width: "100%",
            padding: "0.875rem 1rem",
            borderRadius: "0.75rem",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "#edf2f7",
            fontSize: "1rem",
            boxSizing: "border-box",
            transition: "border-color 0.15s ease",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary"
        style={{
          width: "100%",
          fontSize: "1rem",
          opacity: status === "loading" ? 0.7 : 1,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Sending..." : "Get Early Access →"}
      </button>
      {status === "error" && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "0.8rem",
            marginTop: "0.5rem",
            textAlign: "center",
          }}
        >
          Something went wrong. Please try again.
        </p>
      )}
      <p
        style={{
          fontSize: "0.72rem",
          color: "#4a5568",
          marginTop: "0.75rem",
          textAlign: "center",
        }}
      >
        No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
