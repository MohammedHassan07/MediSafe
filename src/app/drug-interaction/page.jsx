// app/drug-interaction/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

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
    { id: 11, name: "Losartan" },
    { id: 12, name: "Amlodipine" },
    { id: 13, name: "Hydrochlorothiazide" },
    { id: 14, name: "Ciprofloxacin" },
    { id: 15, name: "Clopidogrel" },
    { id: 16, name: "Alprazolam" },
    { id: 17, name: "Diazepam" },
    { id: 18, name: "Fluoxetine" },
    { id: 19, name: "Sertraline" },
    { id: 20, name: "Citalopram" },
    { id: 21, name: "Escitalopram" },
    { id: 22, name: "Venlafaxine" },
    { id: 23, name: "Duloxetine" },
    { id: 24, name: "Prednisone" },
    { id: 25, name: "Hydrocortisone" },
    { id: 26, name: "Warfarin" },
    { id: 27, name: "Heparin" },
    { id: 28, name: "Enoxaparin" },
    { id: 29, name: "Insulin Glargine" },
    { id: 30, name: "Insulin Aspart" },
    { id: 31, name: "Insulin Lispro" },
    { id: 32, name: "Salbutamol" },
    { id: 33, name: "Budesonide" },
    { id: 34, name: "Montelukast" },
    { id: 35, name: "Cetirizine" },
    { id: 36, name: "Loratadine" },
    { id: 37, name: "Fexofenadine" },
    { id: 38, name: "Diphenhydramine" },
    { id: 39, name: "Ranitidine" },
    { id: 40, name: "Famotidine" },
    { id: 41, name: "Pantoprazole" },
    { id: 42, name: "Lansoprazole" },
    { id: 43, name: "Doxycycline" },
    { id: 44, name: "Erythromycin" },
    { id: 45, name: "Clarithromycin" },
    { id: 46, name: "Linezolid" },
    { id: 47, name: "Vancomycin" },
    { id: 48, name: "Meropenem" },
    { id: 49, name: "Imipenem" },
    { id: 50, name: "Piperacillin-Tazobactam" },
    { id: 51, name: "Gentamicin" },
    { id: 52, name: "Tobramycin" },
    { id: 53, name: "Amphotericin B" },
    { id: 54, name: "Fluconazole" },
    { id: 55, name: "Ketoconazole" },
    { id: 56, name: "Itraconazole" },
    { id: 57, name: "Voriconazole" },
    { id: 58, name: "Albendazole" },
    { id: 59, name: "Mebendazole" },
    { id: 60, name: "Metronidazole" },
    { id: 61, name: "Tinidazole" },
    { id: 62, name: "Chloroquine" },
    { id: 63, name: "Hydroxychloroquine" },
    { id: 64, name: "Quinine" },
    { id: 65, name: "Artemether" },
    { id: 66, name: "Lumefantrine" },
    { id: 67, name: "Oseltamivir" },
    { id: 68, name: "Zidovudine" },
    { id: 69, name: "Lamivudine" },
    { id: 70, name: "Tenofovir" },
    { id: 71, name: "Efavirenz" },
    { id: 72, name: "Nevirapine" },
    { id: 73, name: "Ritonavir" },
    { id: 74, name: "Lopinavir" },
    { id: 75, name: "Dolutegravir" },
    { id: 76, name: "Raltegravir" },
    { id: 77, name: "Sofosbuvir" },
    { id: 78, name: "Ledipasvir" },
    { id: 79, name: "Daclatasvir" },
    { id: 80, name: "Ribavirin" },
    { id: 81, name: "Methotrexate" },
    { id: 82, name: "Cyclophosphamide" },
    { id: 83, name: "Doxorubicin" },
    { id: 84, name: "Cisplatin" },
    { id: 85, name: "Carboplatin" },
    { id: 86, name: "Paclitaxel" },
    { id: 87, name: "Docetaxel" },
    { id: 88, name: "Tamoxifen" },
    { id: 89, name: "Letrozole" },
    { id: 90, name: "Anastrozole" },
    { id: 91, name: "Leuprolide" },
    { id: 92, name: "Finasteride" },
    { id: 93, name: "Tamsulosin" },
    { id: 94, name: "Dutasteride" },
    { id: 95, name: "Allopurinol" },
    { id: 96, name: "Colchicine" },
    { id: 97, name: "Febuxostat" },
    { id: 98, name: "Gabapentin" },
    { id: 99, name: "Pregabalin" },
    { id: 100, name: "Carbamazepine" }
  ]
  
export default function DrugInteractionPage() {
    const [drug1, setDrug1] = useState("")
    const [drug2, setDrug2] = useState("")
    const [showDropdown1, setShowDropdown1] = useState(false)
    const [showDropdown2, setShowDropdown2] = useState(false)

    const [results, setResults] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        setResults({
            description: `Interaction between ${drug1} and ${drug2}: May cause stomach irritation.`,
            image: "https://thumbs.dreamstime.com/b/close-up-advanced-medical-anatomy-pharmacological-chemical-focus-showcasing-futuristic-drug-interactions-326375505.jpg",
            management: "Avoid combining these drugs or consult your doctor.",
        })
    }

    const filterDrugs = (input) =>
        mockDrugs.filter((d) =>
            d.name.toLowerCase().includes(input.toLowerCase())
        )

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center">
            <div className="w-full max-w-4xl">
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-green-700">
                            Drug Interaction Checker
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                           
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Drug 1 */}
                                <div className="relative">
                                    <label className="text-sm text-gray-600">Drug 1</label>
                                    <Command className="border rounded-lg">
                                        <CommandInput
                                            placeholder="Type drug name..."
                                            value={drug1}
                                            onValueChange={(val) => {
                                                setDrug1(val)
                                                setShowDropdown1(val.length > 0)
                                            }}
                                        />
                                        {showDropdown1 && (
                                            <CommandList className="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-md">
                                                {filterDrugs(drug1).length === 0 ? (
                                                    <CommandEmpty>No results found.</CommandEmpty>
                                                ) : (
                                                    <CommandGroup>
                                                        {filterDrugs(drug1).map((d) => (
                                                            <CommandItem
                                                                key={d.id}
                                                                onSelect={() => {
                                                                    setDrug1(d.name)
                                                                    setShowDropdown1(false)
                                                                }}
                                                            >
                                                                {d.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                )}
                                            </CommandList>
                                        )}
                                    </Command>
                                </div>

                                {/* Drug 2 */}
                                <div className="relative">
                                    <label className="text-sm text-gray-600">Drug 2</label>
                                    <Command className="border rounded-lg">
                                        <CommandInput
                                            placeholder="Type drug name..."
                                            value={drug2}
                                            onValueChange={(val) => {
                                                setDrug2(val)
                                                setShowDropdown2(val.length > 0)
                                            }}
                                        />
                                        {showDropdown2 && (
                                            <CommandList className="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-md">
                                                {filterDrugs(drug2).length === 0 ? (
                                                    <CommandEmpty>No results found.</CommandEmpty>
                                                ) : (
                                                    <CommandGroup>
                                                        {filterDrugs(drug2).map((d) => (
                                                            <CommandItem
                                                                key={d.id}
                                                                onSelect={() => {
                                                                    setDrug2(d.name)
                                                                    setShowDropdown2(false)
                                                                }}
                                                            >
                                                                {d.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                )}
                                            </CommandList>
                                        )}
                                    </Command>
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

                                <p className="mt-2 text-gray-700">  <strong>Description:</strong> {results.description}</p>
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
