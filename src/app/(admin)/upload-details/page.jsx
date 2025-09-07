"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Local storage mock persistence
const loadData = (key) => JSON.parse(localStorage.getItem(key) || "[]")
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export default function AdminPage() {
  const [medicines, setMedicines] = useState([])
  const [interactions, setInteractions] = useState([])

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
  })

  // Interaction Form State
  const [interactionForm, setInteractionForm] = useState({
    drug1: "",
    drug2: "",
    severity: "mild",
    description: "",
    management: "",
    imageURL: "",
  })

  useEffect(() => {
    setMedicines(loadData("medicines"))
    setInteractions(loadData("interactions"))
  }, [])

  // Handle medicine add
  const handleAddMedicine = (e) => {
    e.preventDefault()
    if (!medicineForm.drugName || !medicineForm.description) return

    const newMed = { ...medicineForm, id: Date.now() }
    const updated = [...medicines, newMed]
    setMedicines(updated)
    saveData("medicines", updated)

    setMedicineForm({
      drugName: "",
      molecularFormula: "",
      IUPAC_Name: "",
      description: "",
      mechanism: "",
      uses: "",
      adverseEffect: "",
      drugImage: "",
    })
  }

  // Handle interaction add
  const handleAddInteraction = (e) => {
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
    <main className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-7xl">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl text-center">Admin Panel</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="medicines">
              <TabsList className="mb-6">
                <TabsTrigger value="medicines">Medicines</TabsTrigger>
                <TabsTrigger value="interactions">Drug Interactions</TabsTrigger>
              </TabsList>

              {/* Medicines */}
              <TabsContent value="medicines">
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
                  <Input placeholder="Drug Image URL (optional)" value={medicineForm.drugImage}
                    onChange={(e) => setMedicineForm({ ...medicineForm, drugImage: e.target.value })}
                  />

                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Add Medicine
                  </Button>
                </form>

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
                      <TableHead>Image</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>{m.drugName}</TableCell>
                        <TableCell>{m.molecularFormula}</TableCell>
                        <TableCell>{m.IUPAC_Name}</TableCell>
                        <TableCell>{m.description}</TableCell>
                        <TableCell>{m.mechanism}</TableCell>
                        <TableCell>{m.uses}</TableCell>
                        <TableCell>{m.adverseEffect}</TableCell>
                        <TableCell>
                          {m.drugImage ? (
                            <img src={m.drugImage} alt="drug" className="w-16 h-16 object-cover rounded" />
                          ) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Interactions */}
              <TabsContent value="interactions">
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
                          <SelectItem key={m.id} value={m.drugName}>{m.drugName}</SelectItem>
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
                          <SelectItem key={m.id} value={m.drugName}>{m.drugName}</SelectItem>
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
                    {interactions.map((i) => (
                      <TableRow key={i.id}>
                        <TableCell>{i.drug1}</TableCell>
                        <TableCell>{i.drug2}</TableCell>
                        <TableCell className="capitalize">{i.severity}</TableCell>
                        <TableCell>{i.description}</TableCell>
                        <TableCell>{i.management}</TableCell>
                        <TableCell>
                          {i.imageURL ? (
                            <img src={i.imageURL} alt="interaction" className="w-16 h-16 object-cover rounded" />
                          ) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
