import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Digital Tool Radar — Honest Reviews & Exclusive Bonuses",
  description:
    "Independent reviews and exclusive bonuses for the best digital marketing software launches. Find out what’s worth buying before you spend a cent.",
  metadataBase: new URL("https://digitaltoolradar.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ── Navbar ── */}
        <header
          className="sticky top-0 z-50 border-b"
          style={{
            background: "rgba(8,11,16,0.96)",
            backdropFilter: "blur(14px)",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="mx-auto px-5 flex items-center justify-between"
            style={{ maxWidth: 1200, height: 60 }}
          >
            <a
              href="/"
              className="flex items-center gap-2.5 no-underline"
              style={{ textDecoration: "none" }}
            >
              <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>&#128225;</span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: "#edf2f7",
                  letterSpacing: "-0.02em",
                }}
              >
                Digital<span style={{ color: "#00d492" }}>Tool</span>Radar
              </span>
            </a>

            <nav className="flex items-center gap-5">
              <a
                href="/"
                style={{
                  color: "#7b8ea5",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Reviews
              </a>
              <a
                href="https://youtube.com/@digitaltoolradar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#7b8ea5",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                YouTube
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* ── Footer ── */}
        <footer
          className="py-10 px-5 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p style={{ color: "#4a5568", fontSize: "0.82rem", lineHeight: 1.7 }}>
            © {new Date().getFullYear()} DigitalToolRadar · Independent reviews &amp; affiliate
            bonuses
            <br />
            We may earn commissions when you buy through our links. This never affects
            our editorial integrity.
          </p>
        </footer>
      </body>
    </html>
  )
}
