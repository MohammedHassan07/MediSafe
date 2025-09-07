"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import postApiClient from "@/utils/postApiClient"

export default function VerifyOtpPage() {
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleVerify = async (e) => {
        e.preventDefault()

        if (!otp) {
            setError("Please enter OTP")
            return
        }

        setLoading(true)

        const email = localStorage.getItem("verifyEmail")

        const response = await postApiClient("/api/doctor/verify-otp", { email, otp }) 
        
        setLoading(false)

        if (response.status === "failed") {
            setError(response.message)
            setTimeout(() => setError(""), 3000)
            return
        }

        localStorage.removeItem("verifyEmail")
        localStorage.setItem("token", response.token)

        router.push("/submit-report")
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center items-center">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-green-700 text-center text-2xl">
                        Verify OTP
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-600 mb-3">{error}</p>}

                    <form onSubmit={handleVerify} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            maxLength={6}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}
