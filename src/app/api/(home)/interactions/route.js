import dbConnect from "@/lib/connectDB";
import interactionModel from "@/model/interaction.model";

export async function GET() {

    await dbConnect()
    const interactions = await interactionModel.find()
        .populate({ path: "drug1", select: "drugName molecularFormula" })
        .populate({ path: "drug2", select: "drugName molecularFormula" })

    if (!interactions || interactions.length < 1) return new Response(JSON.stringify({ status: 'failed', message: 'Medicines not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    return new Response(JSON.stringify({ status: 'success', message: 'Medicines Fetched', data: interactions }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}