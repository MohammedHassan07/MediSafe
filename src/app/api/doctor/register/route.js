import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";

export async function POST(request) {

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    const existingAdmin = await adminModel.findOne({ email, isAdmin: false })

    if (existingAdmin) return new Response(JSON.stringify({ status: 'failed', message: 'User with this email is already registered' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    const newAdmin = {
        name, email, password,
    }

    await dbConnect()

    const admin = adminModel.create(newAdmin)

    return new Response(JSON.stringify({ newAdmin, status: 'success', message: 'Admin profile created' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}