// app/drug-interaction/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const mockDrugs = [
    { id: 1, name: "Paracetamol" },
    { id: 2, name: "Ibuprofen" },
    { id: 3, name: "Amoxicillin" },
    { id: 4, name: "Metformin" },
    { id: 5, name: "Aspirin" },
    { id: 6, name: "Atorvastatin" },
    { id: 7, name: "Omeprazole" },
    { id: 8, name: "Simvastatin" },
    { id: 9, name: "Levothyroxine" },
    { id: 10, name: "Azithromycin" },
    // ... keep rest same
]

export default function DrugInteractionPage() {
    const [drug1, setDrug1] = useState("")
    const [drug2, setDrug2] = useState("")
    const [results, setResults] = useState(null)
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!drug1 || !drug2) {
            setError("⚠️ Please select both Drug 1 and Drug 2 before checking interaction.")
            return
        }

        setError("")
        setResults({
            description: `Interaction between ${drug1} and ${drug2}: May cause stomach irritation.`,
            image: "https://thumbs.dreamstime.com/b/close-up-advanced-medical-anatomy-pharmacological-chemical-focus-showcasing-futuristic-drug-interactions-326375505.jpg",
            management: "Avoid combining these drugs or consult your doctor.",
        })
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

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Drug 1 */}
                                <div>
                                    <label className="text-sm text-gray-600">Drug 1</label>
                                    <Select onValueChange={(val) => setDrug1(val)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Drug 1" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockDrugs.map((d) => (
                                                <SelectItem key={d.id} value={d.name}>
                                                    {d.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Drug 2 */}
                                <div>
                                    <label className="text-sm text-gray-600">Drug 2</label>
                                    <Select onValueChange={(val) => setDrug2(val)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Drug 2" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockDrugs.map((d) => (
                                                <SelectItem key={d.id} value={d.name}>
                                                    {d.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                            <div className="mt-8 p-6 border rounded-lg bg-green-50">
                                <h3 className="font-semibold text-green-700">Results</h3>
                                <p className="mt-2 text-gray-700">
                                    <strong>Description:</strong> {results.description}
                                </p>
                                <img
                                    src={results.image}
                                    alt="Reaction"
                                    className="mt-4 rounded-lg shadow-md w-full md:w-2/3 h-[30vh] object-fill"
                                />
                                <p className="mt-4 text-gray-700">
                                    <strong>Management:</strong> {results.management}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
