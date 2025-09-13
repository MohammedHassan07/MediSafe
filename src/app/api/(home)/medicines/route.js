import dbConnect from "@/lib/connectDB";
import drugModel from "@/model/drug.model";

export async function GET() {

    await dbConnect()
    const medicines = await drugModel.find()

    if (!medicines || medicines.length < 1) return new Response(JSON.stringify({ status: 'failed', message: 'Medicines not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    return new Response(JSON.stringify({ status: 'success', message: 'Medicines Fetched', data:medicines }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}