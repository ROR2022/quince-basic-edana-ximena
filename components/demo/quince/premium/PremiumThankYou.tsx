"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Link from "next/link"
import { Heart, Sparkles } from "lucide-react"
import { premiumDemoData } from "./data/premium-demo-data"

export function PremiumThankYou() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-100 to-pink-100">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge premium */}
        <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
          💝 Mensaje Premium
        </div>

        {/* Título principal */}
        <div className="mb-8">
          <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <p className="text-xl md:text-2xl mb-6 text-purple-800 leading-relaxed">
            {premiumDemoData.thankYou.title}
          </p>
        </div>

        {/* Mensaje personalizado premium */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200 mb-8">
          <Heart className="w-8 h-8 text-pink-500 mx-auto mb-4 fill-current" />
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {premiumDemoData.thankYou.personalMessage}
          </p>
          
          <div className="border-t border-purple-200 pt-6">
            <p className="text-lg mb-4 text-purple-700">
              {premiumDemoData.thankYou.message}
            </p>
            <h2 className="font-script text-purple-600 text-5xl md:text-6xl">
              {premiumDemoData.thankYou.signature}
            </h2>
          </div>
        </div>

        {/* Footer premium */}
        <div className="text-sm text-purple-700 mt-12 space-y-4">
          <div className="bg-white/50 rounded-lg p-6 border border-purple-200">
            <p className="font-medium">
              © {premiumDemoData.thankYou.footer.year} {premiumDemoData.thankYou.footer.name} {premiumDemoData.thankYou.footer.company} {premiumDemoData.thankYou.footer.rights}
            </p>
            
            <div className="mt-4 pt-4 border-t border-purple-200">
              <p className="mb-2 font-medium text-purple-800">
                {premiumDemoData.thankYou.footer.cta.question}
              </p>
              <p className="mb-2">
                {premiumDemoData.thankYou.footer.cta.action}
              </p>
              <Link 
                href={premiumDemoData.thankYou.footer.cta.link}
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
              >
                {premiumDemoData.thankYou.footer.cta.linkText}
              </Link>
            </div>
          </div>
        </div>

        {/* Nota del demo premium */}
        <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-700">
            💎 <strong>Premium:</strong> Mensaje de agradecimiento personalizado con mayor detalle y enlaces promocionales elegantes.
          </p>
        </div>
      </div>
    </section>
  )
} 