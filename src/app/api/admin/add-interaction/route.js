import interactionModel from "@/model/interaction.model";

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

        // Ensure drug1 < drug2 (to avoid swapped duplicates)
        let d1 = drug1;
        let d2 = drug2;
        if (d1.toString() > d2.toString()) {
            [d1, d2] = [d2, d1];
        }

        // Check if interaction already exists
        const exists = await interactionModel.findOne({
            drug1: d1,
            drug2: d2,
        });

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

