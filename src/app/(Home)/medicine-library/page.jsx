"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getApiClient } from "@/utils/getApiClient"

const loadData = async (key, id) => {

  let url = ''
  switch (key) {

    case 'medicine': { 
      url = `/api/medicine/${id}` 
      break 
    }

    case 'name': url = '/api/medicine-name'
  }
  console.log(url)
  const response = await getApiClient(url)
  return response
}

export default function MedicineLibraryPage() {
  const [medicines, setMedicines] = useState([])
  const [selectedMed, setSelectedMed] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await loadData('name')
      if (response.status !== 'success') return setError(response.message)
      setMedicines(response.data)
    }
    fetchData()
  }, [])

  const handleSelect = async (id) => {

    const response = await loadData('medicine', id)
    console.log(response)
    setSelectedMed(response.data)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl text-center">Medicine Library</CardTitle>
          </CardHeader>
          <CardContent className="p-6">

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                {error}
              </div>
            )}

            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a medicine" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((m) => (
                  <SelectItem key={m._id} value={m._id.toString()}>
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
