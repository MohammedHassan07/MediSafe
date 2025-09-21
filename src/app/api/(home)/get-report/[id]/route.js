import dbConnect from "@/lib/connectDB";
import reportModel from "@/model/report.model";

export async function GET(req, { params }) {

    const { id } = params

    await dbConnect()
    const report = await reportModel.findOne({ _id: id })

    if (!report) return new Response(JSON.stringify({ status: 'failed', message: 'report not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    return new Response(JSON.stringify({ status: 'success', message: 'report Fetched', data: report }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}