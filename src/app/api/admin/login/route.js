import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
export async function POST(request) {

    await dbConnect()
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    const admin = await adminModel.findOne({ email, isAdmin: true })

    const isValid = await bcrypt.compare(password, admin.password)

    if (!isValid) return new Response(JSON.stringify({ admin, status: 'failed', message: 'Invalid Credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    // generate token
    const SECREY_KEY = process.env.SECREY_KEY
    const token = jwt.sign({ email, role: admin.isAdmin }, SECREY_KEY)

    return new Response(JSON.stringify({ email, token, status: 'success', message: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}