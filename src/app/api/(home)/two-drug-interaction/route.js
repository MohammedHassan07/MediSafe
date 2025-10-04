import dbConnect from "@/lib/connectDB";
import interactionModel from "@/model/interaction.model";

export async function POST(req) {
    const body = await req.json();
    const { drug1, drug2 } = body;

    if (!drug1 || !drug2) {
        return new Response(
            JSON.stringify({
                status: "failed",
                message: "Both drug1 and drug2 are required.",
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    await dbConnect();

    // ✅ Find interaction in either order
    const filter = {
        $or: [
            { drug1: drug1, drug2: drug2 },
            { drug1: drug2, drug2: drug1 },
        ],
    };

    const interaction = await interactionModel
        .findOne(filter)
        .populate({ path: "drug1", select: "drugName" })
        .populate({ path: "drug2", select: "drugName" });

    if (!interaction) {
        return new Response(
            JSON.stringify({
                status: "failed",
                message: "No interaction found between the selected drugs.",
            }),
            {
                status: 404,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    return new Response(
        JSON.stringify({
            status: "success",
            message: "Interaction found successfully",
            data: interaction,
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}
