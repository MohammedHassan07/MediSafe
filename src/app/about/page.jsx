"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-green-600 text-white text-center p-6">
            <CardTitle className="text-3xl font-bold">About</CardTitle>
          </CardHeader>

          <CardContent className="p-6 md:p-10 space-y-8">
            {/* Author Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Image
                src="/images/mujahid.jpg" 
                alt="Mujahid Ahmed Haroon Rasheed"
                width={150}
                height={150}
                className="rounded-full shadow-md object-cover h-35"
              />
              <div>
                <h2 className="text-2xl font-semibold text-green-700">
                  Mujahid Ahmed Haroon Rasheed
                </h2>
                <p className="text-gray-700 italic mb-2">
                  (M.Pharm) Pharmacology & Toxicology
                </p>
                <p className="text-gray-600 leading-relaxed">
                  My key areas of interest include Pharmacovigilance, Drug
                  Safety, Clinical Research, and Toxicology. I am passionate
                  about applying my knowledge to improve patient care and
                  strengthen drug safety practices.
                </p>
              </div>
            </div>

            {/* Project Section */}
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                About the Project
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Medi-Safe</strong> is designed to support healthcare
                professionals by enabling them to check drug–drug interactions,
                access detailed information on adverse drug reactions (ADRs), and
                report ADRs in a simple and efficient way. The vision is to
                promote drug safety awareness and provide a practical tool that
                enhances pharmacovigilance activities globally.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
