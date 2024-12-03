import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST || "smtp.gmail.com";
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;
const SMTP_SERVER_PORT = process.env.SMTP_SERVER_PORT || 587;

export async function POST(req) {
  const body = await req.json();
  const { name, email, message } = body;

  let transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: SMTP_SERVER_PORT,
    secure: false, // Use true for port 465
    auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"Contact Form" <${SMTP_SERVER_USERNAME}>`,
      to: SITE_MAIL_RECIEVER,
      subject: `Run Boy Contact Form message from ${name}`,
      text: `You have a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log("Email sent successfully");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email" }),
      { status: 500 }
    );
  }
}
