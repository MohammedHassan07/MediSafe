"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Example medicines (replace with API call later)
const mockMedicines = [
  {
    id: 1,
    drugName: "Amlodipine",
    molecularFormula: "C20H25ClN2O5.C6H6O3S",
    IUPAC_Name:
      "(RS)-3-ethyl 5-methyl 2-[(2-aminoethoxy)methyl]-4-(2-chlorophenyl)-6-methyl-1,4-dihydropyridine-3,5-dicarboxylate",
    Description:
      "Sold under the brand name Norvasc among others, is a calcium channel blocker medication used to treat high blood pressure and coronary artery disease. It is taken by mouth.",
    Mechanism:
      "Amlodipine is a peripheral arterial vasodilator that reduces peripheral vascular resistance, decreasing blood pressure.",
    Uses:
      "Used to treat high blood pressure, angina (chest pain), and coronary artery disease.",
    adverse_Effect:
      "Swelling of the hands, feet, ankles, or legs, headache, upset stomach, nausea, dizziness, tiredness.",
    drugImage:
      "https://www.universityofcalifornia.edu/sites/default/files/generic-drugs-istock.jpg",
  },
  {
    id: 2,
    drugName: "Paracetamol",
    molecularFormula: "C8H9NO2",
    IUPAC_Name: "N-(4-hydroxyphenyl)acetamide",
    Description:
      "Paracetamol (acetaminophen) is a common pain reliever and fever reducer.",
    Mechanism:
      "Works by inhibiting the cyclooxygenase (COX) pathways in the brain.",
    Uses: "Used to treat mild to moderate pain and reduce fever.",
    adverse_Effect:
      "Rare but can include liver damage in overdose, rash, and allergic reactions.",
    drugImage:
      "https://static.scientificamerican.com/sciam/cache/file/BC2412FA-1388-43B7-877759A80E201C16_source.jpg",
  },
]

export default function MedicineLibraryPage() {
  const [medicines, setMedicines] = useState([])
  const [selectedMed, setSelectedMed] = useState(null)

  useEffect(() => {
    // Replace with API call
    setMedicines(mockMedicines)
  }, [])

  const handleSelect = (id) => {
    const med = medicines.find((m) => m.id.toString() === id)
    setSelectedMed(med)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl text-center">Medicine Library</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a medicine" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((m) => (
                  <SelectItem key={m.id} value={m.id.toString()}>
                    {m.drugName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedMed && (
              <div className="mt-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  {selectedMed.drugImage && (
                    <img
                      src={selectedMed.drugImage}
                      alt={selectedMed.drugName}
                      className="w-40 h-40 object-contain border rounded-lg"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-green-700">{selectedMed.drugName}</h2>
                    <p><strong>Molecular Formula:</strong> {selectedMed.molecularFormula}</p>
                    <p><strong>IUPAC Name:</strong> {selectedMed.IUPAC_Name}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Description</h3>
                  <p>{selectedMed.Description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Mechanism</h3>
                  <p>{selectedMed.Mechanism}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Uses</h3>
                  <p>{selectedMed.Uses}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Adverse Effects</h3>
                  <p>{selectedMed.adverse_Effect}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
