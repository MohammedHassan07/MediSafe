import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";
import bcrypt from 'bcryptjs'
import { SignJWT } from "jose";
export async function POST(request) {

    await dbConnect()
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    const admin = await adminModel.findOne({ email, isAdmin: true })

    if (!admin) return new Response(JSON.stringify({ status: "failed", message: 'Admin with this email is not registered' }),
        {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })

    const isValid = await bcrypt.compare(password, admin.password)

    if (!isValid) return new Response(JSON.stringify({ admin, status: 'failed', message: 'Invalid Credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    // generate token


    const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

    const token = await new SignJWT({ email, isAdmin: admin.isAdmin })
        .setProtectedHeader({ alg: "HS256" })
        // .setIssuedAt()
        // .setExpirationTime("1h")                      // exp (1 hour)
        .sign(SECRET_KEY);

    return new Response(JSON.stringify({ email, token, status: 'success', message: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}