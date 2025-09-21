import reportModel from "@/model/report.model"
import dbConnect from "@/lib/connectDB";

export async function GET(req) {
    try {
        await dbConnect()

        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get("page") || "1")
        const limit = parseInt(searchParams.get("limit") || "10")

        const skip = (page - 1) * limit

        const reports = await reportModel.find().skip(skip).limit(limit)

        const totalReports = await reportModel.countDocuments()
        const totalPages = Math.ceil(totalReports / limit)

        return new Response(
            JSON.stringify({
                status: "success",
                data: reports,
                pagination: {
                    totalReports,
                    totalPages,
                    currentPage: page,
                    limit
                }
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        )
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ status: "failed", message: "Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        )
    }
}
