import React from 'react'
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import postApiClient from "@/utils/postApiClient"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
const Interaction = () => {
    const [interactions, setInteractions] = useState([])
    const [searchInter, setSearchInter] = useState("")
    const [medicines, setMedicines] = useState([])
    // Interaction Form State
    const [interactionForm, setInteractionForm] = useState({
        drug1: "",
        drug2: "",
        severity: "mild",
        description: "",
        management: "",
        imageURL: "",
    })

    // Fetch interactions
    const fetchInteractions = async () => {
        const interResponse = await postApiClient("/api/interactions", { search: searchInter })

        if (interResponse.status === "success") {
            setInteractions(interResponse.data)
        }
    }
    // Interactions debounce
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchInteractions()
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [searchInter])

    // Handle interaction add
    function handleAddInteraction(e) {
        e.preventDefault()
        if (!interactionForm.drug1 || !interactionForm.drug2 || !interactionForm.description) return

        const newInteraction = { ...interactionForm, id: Date.now() }
        const updated = [...interactions, newInteraction]
        setInteractions(updated)
        saveData("interactions", updated)

        setInteractionForm({
            drug1: "",
            drug2: "",
            severity: "mild",
            description: "",
            management: "",
            imageURL: "",
        })
    }
    return (
        <>
            <form onSubmit={handleAddInteraction} className="space-y-4 mb-6">
                <div className="flex flex-wrap gap-3">
                    <Select
                        onValueChange={(val) => setInteractionForm({ ...interactionForm, drug1: val })}
                        value={interactionForm.drug1}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Drug 1" />
                        </SelectTrigger>
                        <SelectContent>
                            {medicines.map((m) => (
                                <SelectItem key={m._id} value={m.drugName}>{m.drugName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        onValueChange={(val) => setInteractionForm({ ...interactionForm, drug2: val })}
                        value={interactionForm.drug2}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Drug 2" />
                        </SelectTrigger>
                        <SelectContent>
                            {medicines.map((m) => (
                                <SelectItem key={m._id} value={m.drugName}>{m.drugName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        onValueChange={(val) => setInteractionForm({ ...interactionForm, severity: val })}
                        value={interactionForm.severity}
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

                <Textarea placeholder="Interaction Description" value={interactionForm.description}
                    onChange={(e) => setInteractionForm({ ...interactionForm, description: e.target.value })}
                />
                <Textarea placeholder="Management" value={interactionForm.management}
                    onChange={(e) => setInteractionForm({ ...interactionForm, management: e.target.value })}
                />
                <Input placeholder="Image URL (optional)" value={interactionForm.imageURL}
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
                                <TableCell>{i.drug1?.drugName || "—"}</TableCell>
                                <TableCell>{i.drug2?.drugName || "—"}</TableCell>
                                <TableCell className="capitalize">{i.severity || "—"}</TableCell>
                                <TableCell>{i.description || "—"}</TableCell>
                                <TableCell>{i.management || "—"}</TableCell>
                                <TableCell>
                                    {i.imageURL ? (
                                        <img
                                            src={i.imageURL}
                                            alt="interaction"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        "—"
                                    )}
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