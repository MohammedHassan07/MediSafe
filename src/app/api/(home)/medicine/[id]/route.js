import dbConnect from "@/lib/connectDB";
import drugModel from "@/model/drug.model";

export async function GET(req, { params }) {

    const { id } = params
    console.log(id)
    await dbConnect()
    const medicine = await drugModel.findOne({ _id: id })

    if (!medicine) return new Response(JSON.stringify({ status: 'failed', message: 'Medicines not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    return new Response(JSON.stringify({ status: 'success', message: 'Medicines Fetched', data: medicine }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}