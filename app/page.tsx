import { getAllProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

export default function HomePage() {
  const products = getAllProducts()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          📡 Digital Tool Radar
        </h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto">
          Honest reviews and exclusive bonuses for the best digital marketing tools launching right now.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-slate-400 py-20">No products yet — check back soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  )
}
