import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Digital Tool Radar - Honest Reviews & Exclusive Bonuses",
  description:
    "Independent reviews and exclusive bonuses for the best digital marketing software launches.",
  metadataBase: new URL("https://digitaltoolradar.com"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-02M525D9E4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-02M525D9E4', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(8,11,16,0.96)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 1.25rem",
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>&#128225;</span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: "#edf2f7",
                  letterSpacing: "-0.02em",
                }}
              >
                Digital
                <span style={{ color: "#00d492" }}>Tool</span>
                Radar
              </span>
            </a>
            <nav style={{ display: "flex", gap: "1.5rem" }}>
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

        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "2.5rem 1.25rem",
            textAlign: "center",
            color: "#4a5568",
            fontSize: "0.82rem",
            lineHeight: 1.7,
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} DigitalToolRadar &middot;
            Independent reviews &amp; affiliate bonuses
            <br />
            We may earn commissions when you buy through our links.
          </p>
        </footer>
      </body>
    </html>
  )
}
