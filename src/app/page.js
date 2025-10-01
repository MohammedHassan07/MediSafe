// app/page.tsx (Next.js 13+ App Router)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pill, FileText, ClipboardList, Eye, User, Shield, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const sections = [
    {
      title: "Drug-Drug Interaction",
      description: "Check for interactions between two or more drugs.",
      icon: <Pill className="w-8 h-8 text-green-600" />,
      href: "/drug-interaction",
    },
    {
      title: "Possible ADR of Drug",
      description: "Find possible side effects and usage guidelines.",
      icon: <ClipboardList className="w-8 h-8 text-green-600" />,
      href: "/possible",
    },
    // {
    //   title: "Medicine Library",
    //   description: "Explore details of drugs including structure, chemical formula, IUPAC name, and medical uses.",
    //   icon: <BookOpen className="w-8 h-8 text-green-600" />,
    //   href: "/medicine-library",
    // },
    {
      title: "Report ADR",
      description: "Submit your own obervations view reports (login required).",
      icon: <FileText className="w-8 h-8 text-green-600" />,
      href: "/submit-report",
      protected: true,
    },
    {
      title: "View Reports",
      description: "Browse previously submitted ADR reports by other users.",
      icon: <Eye className="w-8 h-8 text-green-600" />,
      href: "/view-reports",
    },
    {
      title: "About",
      description: "Know more about the pharmacist behind this platform.",
      icon: <User className="w-8 h-8 text-green-600" />,
      href: "/about",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-700">MediSafe</h1>
        <p className="text-gray-600">Smart tools for drug safety and reporting</p>

        {/* Admin Login Button */}
        <div className="flex justify-center mt-4">
          <Link href="/admin-login">
            <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Admin Login
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {sections.map((section, idx) => (
            <Card
              key={idx}
              className="shadow-lg hover:shadow-xl transition rounded-2xl "
            >
              <CardHeader>
                <div className="flex items-center justify-center">{section.icon}</div>
                <CardTitle className="text-green-700 text-lg mt-2">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{section.description}</p>
                <Link href={section.href}>
                  <Button
                    variant="default"
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer"
                  >
                    {section.protected ? "Login to Access" : "Explore"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
