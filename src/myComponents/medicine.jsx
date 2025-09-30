import React from 'react'
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import postApiClient from "@/utils/postApiClient"
import { toast } from "sonner"

const Medicine = () => {
    const [medicines, setMedicines] = useState([])
    const [searchMed, setSearchMed] = useState("")

    // Medicine Form State
    const [medicineForm, setMedicineForm] = useState({
        drugName: "",
        molecularFormula: "",
        IUPAC_Name: "",
        description: "",
        mechanism: "",
        uses: "",
        adverseEffect: "",
        drugImage: "",
        ADRC: "",
        management: "",

    })
    // Fetch medicines
    const fetchMedicines = async () => {
        const medResponse = await postApiClient("/api/get-medicines", { search: searchMed })
        if (medResponse.status === "success") {
            setMedicines(medResponse.data)
        }
    }

    // Medicines debounce
    useEffect(() => {

        if (!searchMed.trim()) {
            setMedicines([])
            return
        }
        const delayDebounce = setTimeout(() => {
            fetchMedicines()
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [searchMed])


    // Handle medicine add
    async function handleAddMedicine(e) {
        e.preventDefault()

        if (!medicineForm.drugName || !medicineForm.description) {
            return toast("Validation Error", {
                description: "Drug name and description are required",
                style: {
                    background: "red",
                    color: "white",
                },

            })
        }

        const newMed = { ...medicineForm, id: Date.now() }

        const response = await postApiClient('/api/admin/add-medicine', newMed)
        if (response.status !== "success") {

            return toast.error("Error", {
                description: response.message || "Failed to add medicine",
                style: {
                    background: "red",
                    color: "white",
                },

            })
        }
        toast.success("Added", {
            description: response.message || "Failed to add medicine",
            style: {
                background: "green",
                color: "white",
            },
        })
        const updated = [...medicines, newMed]
        setMedicines(updated)
        setMedicineForm({
            drugName: "",
            molecularFormula: "",
            IUPAC_Name: "",
            description: "",
            mechanism: "",
            uses: "",
            adverseEffect: "",
            drugImage: "",
            ADRC: "",
            management: "",
        })
    }


    return (
        <>

            <form onSubmit={handleAddMedicine} className="space-y-4 mb-6">
                <Input placeholder="Drug Name" value={medicineForm.drugName}
                    onChange={(e) => setMedicineForm({ ...medicineForm, drugName: e.target.value })}
                />
                <Input placeholder="Molecular Formula" value={medicineForm.molecularFormula}
                    onChange={(e) => setMedicineForm({ ...medicineForm, molecularFormula: e.target.value })}
                />
                <Input placeholder="IUPAC Name" value={medicineForm.IUPAC_Name}
                    onChange={(e) => setMedicineForm({ ...medicineForm, IUPAC_Name: e.target.value })}
                />
                <Textarea placeholder="Description" value={medicineForm.description}
                    onChange={(e) => setMedicineForm({ ...medicineForm, description: e.target.value })}
                />
                <Textarea placeholder="Mechanism of Action" value={medicineForm.mechanism}
                    onChange={(e) => setMedicineForm({ ...medicineForm, mechanism: e.target.value })}
                />
                <Textarea placeholder="Uses" value={medicineForm.uses}
                    onChange={(e) => setMedicineForm({ ...medicineForm, uses: e.target.value })}
                />
                <Textarea placeholder="Adverse Effects" value={medicineForm.adverseEffect}
                    onChange={(e) => setMedicineForm({ ...medicineForm, adverseEffect: e.target.value })}
                />
                <Input placeholder="Types of ADRC" value={medicineForm.ADRC}
                    onChange={(e) => setMedicineForm({ ...medicineForm, ADRC: e.target.value })}
                />
                <Input placeholder="Management" value={medicineForm.management}
                    onChange={(e) => setMedicineForm({ ...medicineForm, management: e.target.value })}
                />
                <Input placeholder="Drug Image URL (optional)" value={medicineForm.drugImage}
                    onChange={(e) => setMedicineForm({ ...medicineForm, drugImage: e.target.value })}
                />
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Add Medicine
                </Button>
            </form>

            {/* Search Bar */}
            <div className="mb-6">
                <Input
                    placeholder="Search medicine by name..."
                    value={searchMed}
                    onChange={(e) => setSearchMed(e.target.value)}
                    className="w-72"
                />
            </div>
            {/* Medicine Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Molecular Formula</TableHead>
                        <TableHead>IUPAC</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Mechanism</TableHead>
                        <TableHead>Uses</TableHead>
                        <TableHead>Adverse Effects</TableHead>
                        <TableHead>Types of ADRC</TableHead>
                        <TableHead>Management</TableHead>
                        <TableHead>Image</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medicines.map((m) => (
                        <TableRow key={m._id || m.id}>
                            <TableCell>{m.drugName}</TableCell>
                            <TableCell>{m.molecularFormula}</TableCell>
                            <TableCell>{m.IUPAC_Name}</TableCell>
                            <TableCell>{m.description}</TableCell>
                            <TableCell>{m.mechanism}</TableCell>
                            <TableCell>{m.uses}</TableCell>
                            <TableCell>{m.adverseEffect}</TableCell>
                            <TableCell>{m.ADRC}</TableCell>
                            <TableCell>{m.management}</TableCell>

                            <TableCell>
                                {m.drugImage ? (
                                    <img src={m.drugImage} alt="drug" className="w-16 h-16 object-cover rounded" />
                                ) : "—"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Medicine