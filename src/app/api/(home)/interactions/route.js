import dbConnect from "@/lib/connectDB";
import interactionModel from "@/model/interaction.model";
import drugModel from "@/model/drug.model";

export async function POST(req) {

    try {

        const { search } = await req.json();

        let filter = {};
        await dbConnect()

        if (search && search.trim() !== "") {
            // Step 1: Find matching drugs
            const matchingDrugs = await drugModel.find({
                $or: [
                    { drugName: { $regex: search, $options: "i" } },
                    { IUPAC_Name: { $regex: search, $options: "i" } },
                    { molecularFormula: { $regex: search, $options: "i" } },
                ],
            }).select("_id"); // only need IDs

            const drugIds = matchingDrugs.map((d) => d._id);

            // Step 2: Apply filter for interactions
            filter = {
                $or: [{ drug1: { $in: drugIds } }, { drug2: { $in: drugIds } }],
            };
        }

        const interactions = await interactionModel
            .find(filter)
            .populate({ path: "drug1", select: "drugName molecularFormula" })
            .populate({ path: "drug2", select: "drugName molecularFormula" });
        if (!interactions || interactions.length < 1) return new Response(JSON.stringify({ status: 'failed', message: 'Medicines not found' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })

        return new Response(JSON.stringify({ status: 'success', message: 'Medicines Fetched', data: interactions }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ status: 'faild', message: 'Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }

}