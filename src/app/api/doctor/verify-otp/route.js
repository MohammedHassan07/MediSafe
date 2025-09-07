import jwt from "jsonwebtoken";
export async function POST(request) {

    await dbConnect()
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) return new Response(JSON.stringify({ message: 'All fields are mandatory' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })

    const doctor = await adminModel.findOne({ email, isAdmin: false })

    if (doctor.OTP !== otp) return new Response(JSON.stringify({ status: 'failed', message: 'OTP did not match' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    const SECREY_KEY = process.env.SECREY_KEY
    const token = jwt.sign({ email, role: doctor.isAdmin }, SECREY_KEY)

    new Response(JSON.stringify({ token, status: 'success', message: 'Log in successfull' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

}