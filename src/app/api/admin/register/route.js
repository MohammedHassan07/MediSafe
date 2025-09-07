import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";

export async function POST(request) {

    try {

        await dbConnect()

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })

        const existingAdmin = await adminModel.findOne({ email, isAdmin: true })

        if (existingAdmin) return new Response(JSON.stringify({ status: 'failed', message: 'Admin with this email is already registered' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });

        const newAdmin = {
            email, password,
            isAdmin: true
        }

        const admin = await adminModel.create(newAdmin)

        return new Response(JSON.stringify({ admin, status: 'success', message: 'Admin profile created' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error)
    }

}