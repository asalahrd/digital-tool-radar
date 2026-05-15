import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "Digital Tool Radar", template: "%s | Digital Tool Radar" },
  description: "Honest reviews, exclusive bonuses, and the best deals on digital marketing tools.",
  metadataBase: new URL("https://digitaltoolradar.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-slate-900 text-white px-4 py-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <a href="/" className="flex items-center gap-2 font-black text-xl">
              <span className="text-amber-400">📡</span>
              <span>Digital Tool Radar</span>
            </a>
            <nav className="hidden sm:flex gap-6 text-sm text-slate-300">
              <a href="/" className="hover:text-white transition-colors">Reviews</a>
              <a href="https://www.youtube.com/@DigitalToolRadar" className="hover:text-white transition-colors" target="_blank" rel="noopener">YouTube</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
