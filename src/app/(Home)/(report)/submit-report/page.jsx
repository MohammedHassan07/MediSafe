"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"


export default function ReportPage() {

    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {

        const loggedIn = localStorage.getItem("isLoggedIn")
        if (loggedIn === "true") {
            setIsLoggedIn(true)
        } else {
            router.push("/login")
        }
    }, [router])

    const [formData, setFormData] = useState({
        age: "",
        sex: "",
        medicalHistory: "",
        localId: "",
        drugName: "",
        dosage: "",
        batchNumber: "",
        startDate: "",
        stopDate: "",
        changeDose: "",
        symptoms: "",
        onset: "",
        duration: "",
        severity: "",
        treatment: "",
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        for (let key in formData) {
            if (!formData[key]) {
                setError("Please fill in all fields before submitting.")
                return
            }
        }

        setError("Report Submitted")

        // Get existing reports from localStorage
        const existingReports = JSON.parse(localStorage.getItem("reports") || "[]")

        // Add new report
        const newReports = [...existingReports, { ...formData, submittedAt: new Date().toISOString() }]

        // Save back to localStorage
        localStorage.setItem("reports", JSON.stringify(newReports))

        // console.log("Form Submitted:", formData)

        // Reset form
        setFormData({
            age: "",
            sex: "",
            medicalHistory: "",
            localId: "",
            drugName: "",
            dosage: "",
            batchNumber: "",
            startDate: "",
            stopDate: "",
            changeDose: "",
            symptoms: "",
            onset: "",
            duration: "",
            severity: "",
            treatment: "",
        })
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center">
            <div className="w-full max-w-4xl">
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-green-700 text-2xl text-center">
                            ADR Report Form
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {error && (
                            <p className="text-red-600 font-semibold mb-4">{error}</p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Patient Details */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-green-700">
                                    Patient Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Sex"
                                        name="sex"
                                        value={formData.sex}
                                        onChange={handleChange}
                                    />
                                    
                                    <Input
                                        placeholder="Relevant Medical History"
                                        name="medicalHistory"
                                        value={formData.medicalHistory}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Local Identification Code"
                                        name="localId"
                                        value={formData.localId}
                                        onChange={handleChange}
                                    />
                                </div>
                            </section>

                            {/* Suspected Medication Details */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-green-700">
                                    Suspected Medication Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Drug Name"
                                        name="drugName"
                                        value={formData.drugName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Dosage Route and Form"
                                        name="dosage"
                                        value={formData.dosage}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Batch Number"
                                        name="batchNumber"
                                        value={formData.batchNumber}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="date"
                                        placeholder="Start Date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="date"
                                        placeholder="Stop Date"
                                        name="stopDate"
                                        value={formData.stopDate}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Any change in dose or form"
                                        name="changeDose"
                                        value={formData.changeDose}
                                        onChange={handleChange}
                                    />
                                </div>
                            </section>

                            {/* Adverse Drug Reaction Details */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-green-700">
                                    Adverse Drug Reaction Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Textarea
                                        placeholder="Description of symptoms"
                                        name="symptoms"
                                        value={formData.symptoms}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Onset of the reaction"
                                        name="onset"
                                        value={formData.onset}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Duration of symptoms"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        placeholder="Severity of the reaction"
                                        name="severity"
                                        value={formData.severity}
                                        onChange={handleChange}
                                    />
                                    <Textarea
                                        placeholder="Treatments of ADRC"
                                        name="treatment"
                                        value={formData.treatment}
                                        onChange={handleChange}
                                    />
                                </div>
                            </section>

                            <Button
                                type="submit"
                                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
                            >
                                Submit Report
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
