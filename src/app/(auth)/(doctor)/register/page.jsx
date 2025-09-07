"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import postApiClient from "@/utils/postApiClient"

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required")
      return
    }

    setLoading(true)

    const response = await postApiClient("/api/doctor/register", formData)

    setLoading(false)

    if (response.status === "failed") {
      setError(response.message)
      setTimeout(() => setError(""), 3000)
      return
    }

    // Store email for OTP verification
    localStorage.setItem("verifyEmail", formData.email)
    router.push("/verify-otp")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex justify-center items-center">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-green-700 text-center text-2xl">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
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
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
