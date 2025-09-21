"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getApiClient } from "@/utils/getApiClient"
import postApiClient from "@/utils/postApiClient"
import { toast } from "sonner"

export default function MedicineLibraryPage() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [selectedMed, setSelectedMed] = useState(null)

  // Fetch medicines by search
  const fetchMedicines = async () => {
    const response = await postApiClient("/api/get-medicines", { search })
    if (response.status !== "success") {
      setResults([])
      return toast.error("Error", {
        description: response.message || "Failed to add medicine",
        style: {
          background: "red",
          color: "white",
        },
      })
    }
    setResults(response.data)

  }

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() !== "") {
        fetchMedicines()
      } else {
        setResults([])
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [search])

  const handleSelect = async (id) => {
    const response = await getApiClient(`/api/medicine/${id}`)
    if (response.status !== "success") return toast.error("Error", {
      description: response.message,
      style: { background: "red", color: "white" },
    })

    setSelectedMed(response.data)
    setResults([])
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl text-center">Medicine Library</CardTitle>
          </CardHeader>
          <CardContent className="p-6">

            {/* Search Input */}
            <Input
              placeholder="Search medicine by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />

            {/* Results */}
            {results.length > 0 && (
              <ul className="border rounded-lg divide-y bg-white shadow">
                {results.map((m) => (
                  <li
                    key={m._id}
                    className="p-3 hover:bg-green-50 cursor-pointer"
                    onClick={() => handleSelect(m._id)}
                  >
                    {m.drugName}
                  </li>
                ))}
              </ul>
            )}

            {/* Selected Medicine Details */}
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
                    <p className="mt-4"><strong>IUPAC Name:</strong> {selectedMed.IUPAC_Name}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Description</h3>
                  <p>{selectedMed.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Mechanism</h3>
                  <p>{selectedMed.mechanism}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Uses</h3>
                  <p>{selectedMed.uses}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Adverse Effects</h3>
                  <p>{selectedMed.adverseEffect}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
