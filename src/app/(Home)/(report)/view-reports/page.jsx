"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ReportsPage() {
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("reports") || "[]")
    setReports(storedReports)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-6xl">
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-green-600 text-white text-center p-6">
            <CardTitle className="text-3xl font-bold">Submitted ADR Reports</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {reports.length === 0 ? (
              <p className="text-gray-500 text-center">No reports submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-100">
                      <TableHead>Patient</TableHead>
                      <TableHead>Drug</TableHead>
                      <TableHead>Reaction</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell>{r.age} yrs / {r.sex}</TableCell>
                        <TableCell>{r.drugName}</TableCell>
                        <TableCell>{r.symptoms}</TableCell>
                        <TableCell>{r.severity}</TableCell>
                        <TableCell>{new Date(r.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => setSelectedReport(r)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal for detailed report */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-green-700">
              ADR Report Details
            </DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              {/* Patient Details */}
              <section>
                <h3 className="text-lg font-semibold text-green-700">Patient Details</h3>
                <p><strong>Age:</strong> {selectedReport.age}</p>
                <p><strong>Sex:</strong> {selectedReport.sex}</p>
                <p><strong>Contact:</strong> {selectedReport.contact}</p>
                <p><strong>Medical History:</strong> {selectedReport.medicalHistory}</p>
                <p><strong>Local ID:</strong> {selectedReport.localId}</p>
              </section>

              {/* Medication Details */}
              <section>
                <h3 className="text-lg font-semibold text-green-700">Suspected Medication Details</h3>
                <p><strong>Drug Name:</strong> {selectedReport.drugName}</p>
                <p><strong>Dosage / Route / Form:</strong> {selectedReport.dosage}</p>
                <p><strong>Batch Number:</strong> {selectedReport.batchNumber}</p>
                <p><strong>Start Date:</strong> {selectedReport.startDate}</p>
                <p><strong>Stop Date:</strong> {selectedReport.stopDate}</p>
                <p><strong>Change in Dose/Form:</strong> {selectedReport.changeDose}</p>
              </section>

              {/* ADR Details */}
              <section>
                <h3 className="text-lg font-semibold text-green-700">Adverse Drug Reaction Details</h3>
                <p><strong>Symptoms:</strong> {selectedReport.symptoms}</p>
                <p><strong>Onset:</strong> {selectedReport.onset}</p>
                <p><strong>Duration:</strong> {selectedReport.duration}</p>
                <p><strong>Severity:</strong> {selectedReport.severity}</p>
                <p><strong>Treatment:</strong> {selectedReport.treatment}</p>
              </section>

              <p className="text-sm text-gray-500">
                Submitted on: {new Date(selectedReport.submittedAt).toLocaleString()}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
