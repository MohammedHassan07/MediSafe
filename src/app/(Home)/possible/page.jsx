"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

import { Input } from "@/components/ui/input"
import postApiClient from "@/utils/postApiClient"
import { toast } from "sonner"
import { getApiClient } from "@/utils/getApiClient"

export default function PossibleADRPage() {

  const [search, setSearch] = useState("")
  const [response, setResponse] = useState(null)
  const [selectedMed, setSelectedMed] = useState(null)
  const [results, setResults] = useState([])

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
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-green-700 text-2xl text-center">
              Adverse Drug Reactions and Drug Candidates
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

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

            {
              !selectedMed ? (
                <p className="text-center text-gray-500">No medicine selected</p>
              ) : (
                <>
                  {/* Drug Name */}
                  <h2 className="text-3xl font-bold text-green-800 text-center">
                    {selectedMed.drugName}
                  </h2>

                  {/* ADRC */}
                  <section className="p-4 border rounded-lg bg-green-50 shadow-sm">
                    <h3 className="font-semibold text-green-700">ADRC</h3>
                    <p className="mt-2 text-gray-700">
                      {selectedMed.adverseEffect}
                    </p>
                  </section>

                  {/* Type of ADRC */}
                  <section className="p-4 border rounded-lg bg-green-50 shadow-sm">
                    <h3 className="font-semibold text-green-700">Type of ADRC</h3>
                    <p className="mt-2 text-gray-700">
                      {selectedMed.ADRC}
                    </p>
                  </section>

                  {/* Management */}
                  <section className="p-4 border rounded-lg bg-green-50 shadow-sm">
                    <h3 className="font-semibold text-green-700">Management</h3>
                    <p className="mt-2 text-gray-700">
                      {selectedMed.management}
                    </p>
                  </section>
                </>
              )
            }

          </CardContent>
        </Card>
      </div>
    </main>
  )
}
