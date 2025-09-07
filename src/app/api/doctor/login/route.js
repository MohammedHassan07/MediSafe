import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export async function POST(request) {

    await dbConnect()
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    const doctor = await adminModel.findOne({ email, isAdmin: false })
    if (!doctor) return new Response(JSON.stringify({ doctor, status: 'failed', message: 'User with this email is not registered ' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    const isValid = await bcrypt.compare(password, doctor.password)

    if (!isValid) return new Response(JSON.stringify({ doctor, status: 'failed', message: 'Invalid Credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    const SECREY_KEY = process.env.SECREY_KEY
    const token = jwt.sign({ email, role: doctor.isAdmin }, SECREY_KEY)

    return new Response(JSON.stringify({ token, status: 'success', message: 'Log in successfull' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}