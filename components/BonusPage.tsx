import type { Product } from "@/lib/types"

export default function BonusPage({ product }: { product: Product }) {
  const { landing } = product

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
          Exclusive Bonus Offer — {product.launch_date}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4 leading-tight max-w-3xl mx-auto">
          {landing.headline}
        </h1>
        <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">{landing.sub_headline}</p>
        <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
          {landing.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-200">
              <span className="text-green-400 font-bold mt-0.5">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <a
          href={product.affiliate_link}
          target="_blank"
          rel="nofollow noopener"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg"
        >
          {landing.cta_text} →
        </a>
        <p className="text-slate-400 text-sm mt-4">⏰ {landing.urgency_line}</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
          🎁 Buy Through My Link — Get These Exclusive Extras
        </h2>
        <div className="space-y-4">
          {landing.bonuses.map((bonus, i) => (
            <div
              key={i}
              className="bg-white border-l-4 border-amber-400 rounded-xl p-5 shadow-sm flex gap-4"
            >
              <div className="text-3xl font-black text-amber-300 leading-none select-none">
                #{i + 1}
              </div>
              <div>
                {bonus.badge && (
                  <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {bonus.badge}
                  </span>
                )}
                <h3 className="font-bold text-slate-900 mt-1">{bonus.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{bonus.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {product.otos.length > 0 && (
        <section className="bg-slate-50 py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
              💰 Full OTO / Upsell Breakdown (No Surprises)
            </h2>
            <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-4 py-3 text-slate-600">Upsell</th>
                  <th className="px-4 py-3 text-slate-600">Price</th>
                  <th className="px-4 py-3 text-slate-600">Worth It?</th>
                </tr>
              </thead>
              <tbody>
                {product.otos.map((oto, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <strong>{oto.name}</strong>
                      <br />
                      <span className="text-slate-500">{oto.description}</span>
                    </td>
                    <td className="px-4 py-3">{oto.price ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500">Covered in review</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="bg-slate-900 text-white py-14 px-4 text-center">
        <h2 className="text-2xl font-extrabold mb-3">Ready to Claim Your Bonuses?</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Step 1 — Enter your email so we can deliver your bonuses.<br />
          Step 2 — Click the button below to buy {product.name}.
        </p>
        <form
          action={`https://app.convertkit.com/forms/${product.slug}/subscriptions`}
          method="POST"
          target="_blank"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
        >
          <input
            type="email"
            name="email_address"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 text-base focus:outline-none"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Secure My Bonuses
          </button>
        </form>
        <a
          href={product.affiliate_link}
          target="_blank"
          rel="nofollow noopener"
          className="inline-block bg-white text-slate-900 font-black px-10 py-5 rounded-xl text-xl hover:bg-amber-50 transition-colors"
        >
          🛒 Buy {product.name} + Claim Bonuses →
        </a>
        <p className="text-slate-500 text-xs mt-4">
          🔒 No spam. Unsubscribe anytime. {landing.urgency_line}.
        </p>
      </section>

      <footer className="text-center py-6 text-xs text-slate-400">
        <p>
          Affiliate disclosure: This page contains affiliate links. I earn a commission at no extra cost to you.
        </p>
        <p className="mt-1">© {new Date().getFullYear()} Digital Tool Radar</p>
      </footer>
    </div>
  )
}
