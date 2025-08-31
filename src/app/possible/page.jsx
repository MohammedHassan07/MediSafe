"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PossibleADRPage() {
  const drugName = "Paracetamol" // later we can make this dynamic

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-green-700 text-2xl text-center">
              Adverse Drug Reactions and Drug Candidates
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Drug Name */}
            <h2 className="text-3xl font-bold text-green-800 text-center">
              {drugName}
            </h2>

            {/* ADRC */}
            <section className="p-4 border rounded-lg bg-green-50 shadow-sm">
              <h3 className="font-semibold text-green-700">ADRC</h3>
              <p className="mt-2 text-gray-700">
                Adverse drug reactions (ADR) related to {drugName} may include nausea,
                mild allergic reactions, or liver issues if consumed in excess.
              </p>
            </section>

            {/* Type of ADRC */}
            <section className="p-4 border rounded-lg bg-green-50 shadow-sm">
              <h3 className="font-semibold text-green-700">Type of ADRC</h3>
              <p className="mt-2 text-gray-700">
                The ADRs of {drugName} are typically classified as Type A (dose-related)
                reactions, though rare Type B (idiosyncratic) reactions may also occur.
              </p>
            </section>

            {/* Management */}
            <section className="p-4 border rounded-lg bg-green-50 shadow-sm">
              <h3 className="font-semibold text-green-700">Management</h3>
              <p className="mt-2 text-gray-700">
                Management of ADRs includes dose adjustment, symptomatic treatment,
                and immediate consultation with a healthcare professional in severe
                cases.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
