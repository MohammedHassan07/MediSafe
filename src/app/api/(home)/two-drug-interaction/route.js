import dbConnect from "@/lib/connectDB";
import interactionModel from "@/model/interaction.model";
import drugModel from "@/model/drug.model";

export async function POST(req) {

    const body = await req.json();
    const { drug1, drug2 } = body
    console.log(body)
    let filter = {};
    await dbConnect()

    if (drug1 && drug1.trim() !== "" && drug2 && drug2.trim() !== "") {
        // Step 1: Find matching drugs
        const matchingDrugs = await drugModel.find({
            $or: [
                { drugName: { $regex: drug1, $options: "i" } },
                { drugName: { $regex: drug2, $options: "i" } },
            ],
        }).select("_id"); // only need IDs

        const drugIds = matchingDrugs.map((d) => d._id);

        // Step 2: Apply filter for interactions
        filter = {
            $or: [{ drug1: { $in: drugIds } }, { drug2: { $in: drugIds } }],
        };
    }

    const interactions = await interactionModel
        .findOne(filter)
        .populate({ path: "drug1", select: "drugName molecularFormula" })
        .populate({ path: "drug2", select: "drugName molecularFormula" });
    if (!interactions) return new Response(JSON.stringify({ status: 'failed', message: 'Medicines not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    return new Response(JSON.stringify({ status: 'success', message: 'Medicines Fetched', data: interactions }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}