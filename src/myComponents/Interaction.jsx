import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import postApiClient from "@/utils/postApiClient"
import { toast } from "sonner"

const Interaction = () => {
    const [interactions, setInteractions] = useState([])
    const [searchInter, setSearchInter] = useState("")

    // Drug suggestions for autocomplete
    const [drug1Suggestions, setDrug1Suggestions] = useState([])
    const [drug2Suggestions, setDrug2Suggestions] = useState([])

    // Interaction Form State
    const [interactionForm, setInteractionForm] = useState({
        drug1: "", // store selected drug ID
        drug2: "", // store selected drug ID
        severity: "mild",
        description: "",
        management: "",
        imageURL: "",
        drug1Name: "", // temporary input value for display
        drug2Name: "",
    })

    // Fetch interactions
    const fetchInteractions = async () => {
        const interResponse = await postApiClient("/api/interactions", { search: searchInter })
        console.log(interResponse)
        if (interResponse.status !== "success") {
            console.log(interResponse.status)
            return toast.error("Error", {
                description: interResponse.message || "Interaction not found",
                style: {
                    background: "red",
                    color: "white",
                },

            })
        }
        setInteractions(interResponse.data)
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchInteractions()
        }, 500)
        return () => clearTimeout(delayDebounce)
    }, [searchInter])
    // Fetch drug suggestions for autocomplete
    const fetchDrugSuggestions = async (query, drugNumber) => {
        if (!query) return
        const response = await postApiClient("/api/get-medicines", { search: query })
        if (response.status !== "success") {
            return toast.error("Error", {
                description: response.message || "Failed to fetch medicine",
                style: {
                    background: "red",
                    color: "white",
                },

            })
        }
        if (drugNumber === 1) setDrug1Suggestions(response.data)
        else setDrug2Suggestions(response.data)
    }

    // Handle interaction add
    const handleAddInteraction = async (e) => {
        e.preventDefault()
        if (!interactionForm.drug1 || !interactionForm.drug2 || !interactionForm.description) return

        const newInteraction = {
            drug1: interactionForm.drug1,
            drug2: interactionForm.drug2,
            severity: interactionForm.severity,
            description: interactionForm.description,
            management: interactionForm.management,
            imageURL: interactionForm.imageURL,
            id: Date.now(),
        }

        const response = await postApiClient('/api/admin/add-interaction', newInteraction)
        if (response.status !== 'success') return toast.error("Error", {
            description: response.message || "Failed to add interaction",
            style: {
                background: "red",
                color: "white",
            },

        })

        toast.success("Added", {
            description: response.message || "Interaciton added",
            style: {
                background: "green",
                color: "white",
            },
        })
        const updated = [...interactions, newInteraction]
        setInteractions(updated)
        setInteractionForm({
            drug1: "",
            drug2: "",
            severity: "mild",
            description: "",
            management: "",
            imageURL: "",
            drug1Name: "",
            drug2Name: "",
        })
    }

    return (
        <>
            <form onSubmit={handleAddInteraction} className="space-y-4 mb-6">
                <div className="flex flex-wrap gap-3 relative">
                    {/* Drug 1 Input */}
                    <div className="w-[25vw] relative">
                        <Input
                            placeholder="Drug 1"
                            value={interactionForm.drug1Name}
                            onChange={(e) => {
                                setInteractionForm({ ...interactionForm, drug1Name: e.target.value, drug1: "" })
                                fetchDrugSuggestions(e.target.value, 1)
                            }}
                        />
                        {drug1Suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-50 max-h-60 overflow-y-auto">
                                {drug1Suggestions.map((drug) => (
                                    <div
                                        key={drug._id}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setInteractionForm({
                                                ...interactionForm,
                                                drug1: drug._id,
                                                drug1Name: drug.drugName
                                            })
                                            setDrug1Suggestions([]) // Clear suggestions
                                        }}
                                    >
                                        {drug.drugName}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Drug 2 Input */}
                    <div className="w-[25vw] relative">
                        <Input
                            placeholder="Drug 2"
                            value={interactionForm.drug2Name}
                            onChange={(e) => {
                                setInteractionForm({ ...interactionForm, drug2Name: e.target.value, drug2: "" })
                                fetchDrugSuggestions(e.target.value, 2)
                            }}
                        />
                        {drug2Suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-50 max-h-60 overflow-y-auto">
                                {drug2Suggestions.map((drug) => (
                                    <div
                                        key={drug._id}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setInteractionForm({
                                                ...interactionForm,
                                                drug2: drug._id,
                                                drug2Name: drug.drugName
                                            })
                                            setDrug2Suggestions([]) // Clear suggestions
                                        }}
                                    >
                                        {drug.drugName}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Severity Dropdown */}
                    <Select
                        value={interactionForm.severity}
                        onValueChange={(val) => setInteractionForm({ ...interactionForm, severity: val })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mild">Mild</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Textarea
                    placeholder="Interaction Description"
                    value={interactionForm.description}
                    onChange={(e) => setInteractionForm({ ...interactionForm, description: e.target.value })}
                />
                <Textarea
                    placeholder="Management"
                    value={interactionForm.management}
                    onChange={(e) => setInteractionForm({ ...interactionForm, management: e.target.value })}
                />
                <Input
                    placeholder="Image URL (optional)"
                    value={interactionForm.imageURL}
                    onChange={(e) => setInteractionForm({ ...interactionForm, imageURL: e.target.value })}
                />

                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Add Interaction
                </Button>
            </form>

            {/* Search Bar */}
            <div className="mb-6">
                <Input
                    placeholder="Search interaction by drug name..."
                    value={searchInter}
                    onChange={(e) => setSearchInter(e.target.value)}
                    className="w-72"
                />
            </div>

            {/* Interaction Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Drug 1</TableHead>
                        <TableHead>Drug 2</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Management</TableHead>
                        <TableHead>Image</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {interactions.length > 0 ? (
                        interactions.map((i) => (
                            <TableRow key={i._id || i.id}>
                                <TableCell>{i.drug1.drugName || "—"}</TableCell>
                                <TableCell>{i.drug2.drugName || "—"}</TableCell>
                                <TableCell className="capitalize">{i.severity || "—"}</TableCell>
                                <TableCell>{i.description || "—"}</TableCell>
                                <TableCell>{i.management || "—"}</TableCell>
                                <TableCell>
                                    {i.imageURL ? (
                                        <img src={i.imageURL} alt="interaction" className="w-16 h-16 object-cover rounded" />
                                    ) : "—"}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500">
                                No Data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default Interaction
