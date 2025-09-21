import dbConnect from "@/lib/connectDB";
import drugModel from "@/model/drug.model";

export async function GET(req, { params }) {
    try {
        await dbConnect()

        const { id } = params;
        const medicine = await drugModel.findById({ _id: id })

        return new Response(
            JSON.stringify({
                status: "success",
                data: medicine,

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
