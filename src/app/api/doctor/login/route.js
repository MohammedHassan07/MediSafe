import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";
import sendMail from "@/utils/sendMail";
import bcrypt from 'bcryptjs'
export async function POST(request) {

    await dbConnect()
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    const doctor = await adminModel.findOne({ email, isAdmin: false })

    const isValid = await bcrypt.compare(password, doctor.password)

    if (!isValid) return new Response(JSON.stringify({ doctor, status: 'failed', message: 'Invalid Credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000)
    otp.toString()
    doctor.OTP = otp

    // send mail
    sendMail(adminModel.email, otp)
    await doctor.save()

    return new Response(JSON.stringify({ status: 'success', message: 'OTP sent to your email' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}