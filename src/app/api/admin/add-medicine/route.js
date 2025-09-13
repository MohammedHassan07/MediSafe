import dbConnect from "@/lib/connectDB";
import drugModel from "@/model/drug.model";


export async function POST(request) {

    try {

        const body = await request.json();
        const {
            drugName,
            molecularFormula,
            IUPAC_Name,
            description,
            mechanism,
            uses,
            adverseEffect,
            drugImage,
        } = body;

        Object.keys(body).forEach(key => {

            const value = body[key]
            if (value === undefined || value.trim() === '' || !value) return new Response(JSON.stringify({ status: 'failed', message: `${key} is Required` }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        })


        await dbConnect()
        const medicine = await drugModel.findOne({ drugName })

        if (medicine) return new Response(JSON.stringify({ status: "failed", message: `${medicine} Already present.` }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })

        // TODO: Handle Images
        const drugData = {
            drugName,
            molecularFormula,
            IUPAC_Name,
            description,
            mechanism,
            uses,
            adverseEffect,
            drugImage,
        }

        const newDrug = await drugModel.create(drugData)

        return new Response(JSON.stringify({ status: 'success', message: 'Drug Added', newDrug }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ status: "failed", message: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}