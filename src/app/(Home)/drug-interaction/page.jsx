"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import postApiClient from "@/utils/postApiClient"
import { toast } from "sonner"

// ✅ reusable debounced drug search
function useDrugSearch(search) {
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!search.trim()) {
      setResults([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      const currentSearch = search
      try {
        const response = await postApiClient("/api/get-medicines", { search })
        if (currentSearch !== search) return // ignore late responses
        if (response.status !== "success") {
          setResults([])
          return toast.error("Error", {
            description: response.message || "Failed to fetch medicines",
            style: { background: "red", color: "white" },
          })
        }
        setResults(response.data)
      } catch (err) {
        console.error("Error fetching medicines", err)
        setResults([])
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [search])

  return [results, setResults]
}

export default function DrugInteractionPage() {
  const [drug1Search, setDrug1Search] = useState("")
  const [drug2Search, setDrug2Search] = useState("")
  const [results, setResults] = useState(null)

  // ✅ use the reusable search hook for both inputs
  const [drug1Results, setDrug1Results] = useDrugSearch(drug1Search)
  const [drug2Results, setDrug2Results] = useDrugSearch(drug2Search)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!drug1Search || !drug2Search) {
      return toast.error("Error", {
        description: "Please enter both Drug 1 and Drug 2 before checking interaction.",
        style: { background: "red", color: "white" },
      })
    }

    const interResponse = await postApiClient("/api/two-drug-interaction", {
      drug1: drug1Search,
      drug2: drug2Search,
    })

    if (interResponse.status !== "success") {
      return toast.error("Error", {
        description: interResponse.message || "Interaction not found",
        style: { background: "red", color: "white" },
      })
    }
    setResults(interResponse.data)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-green-700">Drug Interaction Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Drug 1 Input */}
                <div>
                  <label className="text-sm text-gray-600">Drug 1</label>
                  <Input
                    placeholder="Search medicine by name..."
                    value={drug1Search}
                    onChange={(e) => setDrug1Search(e.target.value)}
                    className="mb-2"
                  />
                  {drug1Results.length > 0 && (
                    <ul className="border rounded-lg divide-y bg-white shadow max-h-60 overflow-y-auto">
                      {drug1Results.map((d) => (
                        <li
                          key={d._id}
                          className="p-2 hover:bg-green-50 cursor-pointer"
                          onClick={() => {
                            setDrug1Search(d.drugName) // ✅ fill input
                            setDrug1Results([]) // ✅ clear dropdown immediately
                          }}
                        >
                          {d.drugName}{" "}
                          <span className="text-xs text-gray-500">
                            ({d.molecularFormula})
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Drug 2 Input */}
                <div>
                  <label className="text-sm text-gray-600">Drug 2</label>
                  <Input
                    placeholder="Search medicine by name..."
                    value={drug2Search}
                    onChange={(e) => setDrug2Search(e.target.value)}
                    className="mb-2"
                  />
                  {drug2Results.length > 0 && (
                    <ul className="border rounded-lg divide-y bg-white shadow max-h-60 overflow-y-auto">
                      {drug2Results.map((d) => (
                        <li
                          key={d._id}
                          className="p-2 hover:bg-green-50 cursor-pointer"
                          onClick={() => {
                            setDrug2Search(d.drugName)
                            setDrug2Results([])
                          }}
                        >
                          {d.drugName}{" "}
                          <span className="text-xs text-gray-500">
                            ({d.molecularFormula})
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
              >
                Check Interaction
              </Button>
            </form>

            {/* Results */}
            {results && (
              <div className="mt-8 p-6 border rounded-lg bg-green-50 space-y-4">
                <h3 className="font-semibold text-green-700 text-lg">Interaction Results</h3>

                {/* Drug 1 and Drug 2 Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg bg-white shadow">
                    <h4 className="font-semibold text-green-600">Drug 1</h4>
                    <p><strong>Name:</strong> {results.drug1?.drugName}</p>
                    <p><strong>Formula:</strong> {results.drug1?.molecularFormula}</p>
                  </div>

                  <div className="p-4 border rounded-lg bg-white shadow">
                    <h4 className="font-semibold text-green-600">Drug 2</h4>
                    <p><strong>Name:</strong> {results.drug2?.drugName}</p>
                    <p><strong>Formula:</strong> {results.drug2?.molecularFormula}</p>
                  </div>
                </div>

                {/* Interaction Details */}
                <div className="p-4 border rounded-lg bg-white shadow">
                  <p className="text-gray-700">
                    <strong>Severity:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        results.severity === "mild"
                          ? "bg-green-500"
                          : results.severity === "moderate"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {results.severity}
                    </span>
                  </p>
                  <p className="mt-2 text-gray-700">
                    <strong>Description:</strong> {results.description}
                  </p>
                  <p className="mt-2 text-gray-700">
                    <strong>Adverse Drug Reaction:</strong> {results.adr}
                  </p>
                  <p className="mt-2 text-gray-700">
                    <strong>Management:</strong> {results.management}
                  </p>
                  {results.imageURL && (
                    <img
                      src={results.imageURL}
                      alt="Reaction image"
                      className="mt-4 rounded-lg shadow-md w-full md:w-2/3 h-[30vh] object-cover"
                    />
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
