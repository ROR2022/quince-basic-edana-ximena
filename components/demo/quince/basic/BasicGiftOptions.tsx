"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

import { basicDemoData } from "./data/basic-demo-data"

export function BasicGiftOptions() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section 
    style={{
        backgroundImage: `url('/images/quince/encantada4.png')`,
        filter: "brightness(0.7)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    className="py-16 px-4 bg-white">
      <div
        ref={ref}
         style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 rounded-xl p-6 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="section-title">{basicDemoData.gifts.title}</h2>

        <div className="divider">
          <div className="divider-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        <p className="text-lg mt-8 mb-12 max-w-2xl mx-auto text-black">
          {basicDemoData.gifts.message}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {basicDemoData.gifts.options.map((option, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="text-xl font-medium mb-2 text-black">{option.title}</h3>
              <p className="text-lg font-medium mb-3 text-slate-700">{option.description}</p>
              <div className="text-sm text-gray-600 whitespace-pre-line">
                {option.details}
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  )
} 