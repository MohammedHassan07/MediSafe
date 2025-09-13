import dbConnect from "@/lib/connectDB";
import drugModel from "@/model/drug.model";

export async function POST(req) {
    await dbConnect();

    try {
        const { page = 1, limit = 10 } = await req.json();

        const skip = (page - 1) * limit;

        const medicines = await drugModel.find({})
            .skip(skip)
            .limit(limit);

        const total = await drugModel.countDocuments();

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Medicines Fetched",
                data: medicines,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
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
