"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ArrowRight, Calculator, Home, Briefcase, GraduationCap, Heart } from "lucide-react"
import LoanCalculator from "@/components/LandingPage/Loan-Calculator"
import { LoanCalculatorProvider } from "@/context/loanContext"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="w-full py-6 bg-white text-center text-2xl font-extrabold shadow-sm tracking-wide sticky top-0 z-50 transition-all duration-300 ease-in-out">
        <span className="text-blue-600">Saylani</span> Microfinance App
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gray-50">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 animate-fade-in-down">Empower Your Financial Goals</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Experience a seamless loan application process tailored to your needs. Discover flexible options and take the
          next step towards your aspirations.
        </p>
        <Button className="bg-blue-600 px-8 py-6 font-semibold text-lg rounded-full hover:bg-blue-700 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 text-white">
          Apply Now <ArrowRight className="w-5 h-5" />
        </Button>
      </section>

      {/* Loan Categories */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Loan Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Wedding Loans",
              desc: "For Valima, Furniture, and Jahez.",
              icon: Heart,
              color: "bg-pink-50 text-pink-600",
            },
            {
              title: "Home Construction",
              desc: "For structure and finishing.",
              icon: Home,
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Business Startup",
              desc: "Start your new venture.",
              icon: Briefcase,
              color: "bg-purple-50 text-purple-600",
            },
            {
              title: "Education Loans",
              desc: "University and child fees.",
              icon: GraduationCap,
              color: "bg-yellow-50 text-yellow-600",
            },
          ].map((loan, index) => (
            <Card
              key={index}
              className={`${loan.color} shadow-lg rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <loan.icon className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{loan.title}</h3>
                <p className="text-sm text-gray-600">{loan.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Loan Calculator */}
        <LoanCalculator />

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Amina Khan",
              quote: "Saylani Microfinance helped me start my small business. Their support was invaluable!",
              role: "Small Business Owner",
            },
            {
              name: "Fahad Ahmed",
              quote:
                "The education loan allowed me to pursue my dream of higher education. I'm grateful for their assistance.",
              role: "University Student",
            },
            {
              name: "Zainab Bibi",
              quote: "The home construction loan made it possible for us to build our family home. Thank you, Saylani!",
              role: "Homeowner",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-gray-600 text-sm">
        <div className="max-w-4xl mx-auto px-6">
          <p>&copy; 2025 Saylani Microfinance. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

