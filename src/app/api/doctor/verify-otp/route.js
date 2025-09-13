import { SignJWT } from "jose";
import dbConnect from "@/lib/connectDB";
import adminModel from "@/model/admin.model";
export async function POST(request) {

    try {

        const body = await request.json();
        const { email, otp } = body;

        await dbConnect()

        if (!email || !otp) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })

        const doctor = await adminModel.findOne({ email, isAdmin: false })

        if (doctor.OTP !== otp) return new Response(JSON.stringify({ status: 'failed', message: 'OTP did not match' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
        const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

        const token = await new SignJWT({ email, isAdmin: doctor.isAdmin })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            // .setExpirationTime("1h")                      // exp (1 hour)
            .sign(SECRET_KEY)

        return new Response(JSON.stringify({ token, status: 'success', message: 'Log in successfull' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.log(error)

        return new Response(JSON.stringify({ status: 'failed', message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}