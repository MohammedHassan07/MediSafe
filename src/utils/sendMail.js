import nodemailer from 'nodemailer'
import { otpTemplate } from '@/lib/OTP/OTPTemplate'

export default async function sendMail(email, otp) {

    const MED_EMAIL = process.env.MED_EMAIL
    const MED_PASS = process.env.MED_PASS

    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: MED_EMAIL,
            pass: MED_PASS
        }
    })
    
    await transporter.sendMail({
        from: `"MediSafe" <${MED_EMAIL}>`,
        to: email,
        subject: "Your MediSafe OTP Code",
        html: otpTemplate(otp),
    });
}