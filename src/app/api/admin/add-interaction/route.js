import interactionModel from "@/model/interaction.model";
import drugModel from "@/model/drug.model";

export async function POST(request) {

    try {

        const body = await request.json();
        const {
            drug1,
            drug2,
            severity,
            description,
            management,
            imageURL,
        } = body;

        Object.keys(body).forEach(key => {

            const value = body[key]
            if (value === undefined || value.trim() === '' || !value) return new Response(JSON.stringify({ status: 'failed', message: `${key} is Required` }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        })


        const [drug1Doc, drug2Doc] = await Promise.all([
            drugModel.findOne({ _id: drug1 }),
            drugModel.findOne({ _id: drug2 })
        ])

        if (!drug1Doc || !drug2Doc) {
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "One or both drugs not found",
                }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        let d1 = drug1Doc._id;
        let d2 = drug2Doc._id;
        if (d1.toString() > d2.toString()) {
            [d1, d2] = [d2, d1];
        }

        const exists = await interactionModel.findOne({ drug1: d1, drug2: d2 })
        console.log(exists)
        if (exists) {
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Interaction already exists",
                }),
                {
                    status: 409,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // TODO: hanlde image URL
        // Save interaction
        const newInteraction = await interactionModel.create({
            drug1: d1,
            drug2: d2,
            severity,
            description,
            management,
            imageURL,
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Interaction created successfully",
                data: newInteraction,
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

