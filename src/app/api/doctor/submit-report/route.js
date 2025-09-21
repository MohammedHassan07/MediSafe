import reportModel from "@/model/report.model";
import dbConnect from "@/lib/connectDB";

export async function POST(request) {

    try {
        await dbConnect()

        const body = await request.json();
        const {
            age,
            sex,
            medicalHistory,
            localId,
            drugName,
            dosage,
            batchNumber,
            startDate,
            stopDate,
            changeDose,
            symptoms,
            onset,
            duration,
            severity,
            treatment,
        } = body;

        const keys = Object.keys(body)

        for (const key of keys) {
            const value = body[key]
            if (
                value === undefined ||
                value === null ||
                (typeof value === "string" && value.trim() === "")
            ) {
                return new Response(JSON.stringify({
                    status: "failed",
                    message: `${key} is required`
                }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                })
            }
        }

        const newReport = await reportModel.create({
            age,
            sex,
            medicalHistory,
            localId,
            drugName,
            dosage,
            batchNumber,
            startDate,
            stopDate,
            changeDose,
            symptoms,
            onset,
            duration,
            severity,
            treatment,
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Report Addded",
                data: newReport,
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.log(err);
        return new Response(
            JSON.stringify({ status: "failed", message: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

