"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()

  const [step, setStep] = useState("login") 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError("Please enter email and password")
      return
    }

    setError("")
    // 🔐 TODO: verify email/password with backend
    // If valid, move to OTP step
    setStep("otp")
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()

    if (!formData.otp) {
      setError("Please enter OTP")
      return
    }

    // Mock OTP validation
    if (formData.otp === "123456") {
      setError("")
      console.log("Login success ✅")
      // store login flag in localStorage (for demo)
      localStorage.setItem("isLoggedIn", "true")
      router.push("/report",)
    } else {
      setError("Invalid OTP. Try again.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center items-center">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-green-700 text-center text-2xl">
            {step === "login" ? "Login" : "Verify OTP"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-600 mb-3">{error}</p>}

          {step === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Login
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                maxLength={6}
                value={formData.otp}
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Verify OTP
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
