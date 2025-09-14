import dbConnect from "@/lib/connectDB";
import drugModel from "@/model/drug.model";

export async function POST(req) {
    await dbConnect();

    try {
        const { search } = await req.json();

        let filter = {}
        if (search && search.trim() !== "") {
            filter = {
                $or: [
                    { drugName: { $regex: search, $options: "i" } },
                    { IUPAC_Name: { $regex: search, $options: "i" } },
                    { molecularFormula: { $regex: search, $options: "i" } },
                ],
            };
        }
        const medicines = await drugModel.find(filter)

        if (!medicines || medicines.length < 1) return new Response(JSON.stringify({
            status: "failed",
            message: "Medicine not found",
        }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        })
        return new Response(
            JSON.stringify({
                status: "success",
                message: "Medicines Fetched",
                data: medicines,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ status: "failed", message: error.message }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
