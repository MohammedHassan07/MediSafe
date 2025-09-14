"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Interaction from "@/myComponents/Interaction"
import Medicine from "@/myComponents/medicine"

export default function AdminPage() {

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

              < TabsContent value="medicines" >
                <Medicine />
              </TabsContent>

              < TabsContent value="interactions" >
                <Interaction />
              </TabsContent>


            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
