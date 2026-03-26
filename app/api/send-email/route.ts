import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

// xhku ixwk cedy qlfz

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, phone, email, message } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "LNS InviShield Grills",
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        phone:${phone}
        Message: ${message}
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
    }
}
