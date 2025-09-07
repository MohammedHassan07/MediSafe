import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";
import sendMail from '@/utils/sendMail'

export async function POST(request) {

    const body = await request.json();
    const { name, email, password } = body;

    await dbConnect()

    if (!name || !email || !password) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    const existingDoctor = await adminModel.findOne({ email, isAdmin: false })

    if (existingDoctor) return new Response(JSON.stringify({ status: 'failed', message: 'User with this email is already registered' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000)
    otp.toString()

    // send mail
    sendMail(email, otp)

    const newDoctor = {
        name, email, password, OTP: otp
    }

    await adminModel.create(newDoctor)
    return new Response(JSON.stringify({ status: 'success', message: 'OTP sent to your email' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

}