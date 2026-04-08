import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

// xhku ixwk cedy qlfz

interface IMailDetails {
  name: string;
  message: string;
  phone?: number;
  email?: string
}

const customerTemplate = ({ name, message }: IMailDetails) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:#111;color:#fff;padding:20px;text-align:center;font-size:22px;font-weight:bold;">
              🔩 Your Request is Received
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;color:#333;">
              <h2 style="margin-top:0;">Hi ${name},</h2>
              <p style="font-size:16px;line-height:1.6;">
                Thank you for contacting us. We have received your details successfully.
              </p>

              <p style="font-size:16px;line-height:1.6;">
                Our team will review your request and someone from our team will contact you shortly.
              </p>

              <div style="margin:20px 0;padding:15px;background:#f1f1f1;border-left:4px solid #111;">
                <strong>Your Message:</strong>
                <p style="margin:10px 0 0;">${message}</p>
              </div>

              <p style="font-size:14px;color:#777;">
                If you have any urgent queries, feel free to reply to this email.
              </p>
            </td>
          </tr>

          <!-- Grill Images Section -->
          <tr>
            <td style="padding:20px;">
              <h3 style="text-align:center;margin-bottom:15px;">Our Grill Designs</h3>

              <table width="100%">
                <tr>
                 ss
                  <td style="padding:5px;">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" width="100%" style="border-radius:8px;" />
                  </td>
                 
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111;color:#fff;text-align:center;padding:15px;font-size:14px;">
              © 2026 LNS invishield grills• All rights reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;


const companyTemplate = ({ name, email, phone, message }: IMailDetails) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:#ff4d4f;color:#fff;padding:20px;text-align:center;font-size:22px;font-weight:bold;">
              🚨 New Contact Form Submission
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;color:#333;">
              <h2 style="margin-top:0;">Hey!! 👋</h2>
              <p style="font-size:16px;">
                A new contact request has been submitted from your website.
              </p>

              <!-- Details Card -->
              <table width="100%" style="margin-top:20px;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px;background:#f1f1f1;"><strong>Name</strong></td>
                  <td style="padding:10px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px;background:#f1f1f1;"><strong>Email</strong></td>
                  <td style="padding:10px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px;background:#f1f1f1;"><strong>Phone</strong></td>
                  <td style="padding:10px;">${phone}</td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-top:20px;padding:15px;background:#fff3cd;border-left:4px solid #ffa502;">
                <strong>Message:</strong>
                <p style="margin-top:10px;">${message}</p>
              </div>

              <!-- CTA -->
              <div style="margin-top:25px;text-align:center;">
                <a href="mailto:${email}" 
                   style="background:#111;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block;">
                  Reply to Customer
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111;color:#fff;text-align:center;padding:15px;font-size:14px;">
              Internal Notification • Do not ignore
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body;

    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 587,
      secure: false,
      auth: {
        user: "info@lnsinvishieldgrills.com",
        pass: "Naveen@81447",
      },
    });

    const mailOptions = {
      from: '"LNS Invishield" <info@lnsinvishieldgrills.com>',
      to: '"LNS Invishield" <info@lnsinvishieldgrills.com>',
      subject: `New Contact Form Submission from ${name}`,
      html: companyTemplate({ name, email, phone, message })
    };


    const CusmtomerMailOptions = {
     from: '"LNS Invishield" <info@lnsinvishieldgrills.com>',
      to: email,
      subject: "Thank you for contacting us",
      html: customerTemplate({ name, message })
    }

    // await transporter.sendMail(mailOptions);

    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(CusmtomerMailOptions)
    ])

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error'  , message:error},
      { status: 500 }
    )
  }
}
