import nodemailer from "nodemailer";
import { createHmac } from "crypto";

export const runtime = "nodejs";

const NAME_REGEX = /^[A-Za-z ]{2,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

// Stateless signed token: base64url(email|otp|expiresAt) + "." + HMAC-SHA256
export function signOtpToken(email: string, otp: string, expiresAt: number) {
  const secret = process.env.OTP_SECRET || process.env.SMTP_PASS || "ksh-otp-secret";
  const payload = `${email}|${otp}|${expiresAt}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64url") + "." + sig;
}

let _transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      socketTimeout: 10000,
      greetingTimeout: 10000,
      connectionTimeout: 10000,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    _transporter.verify().catch(() => {});
  }
  return _transporter;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.website) {
      return Response.json({ success: true }); // honeypot — silent drop
    }

    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim().toLowerCase();

    if (!NAME_REGEX.test(name)) {
      return Response.json({ success: false, error: "Invalid name" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    const otp = generateOtp();
    const expiresAt = Date.now() + OTP_TTL_MS;
    const token = signOtpToken(email, otp, expiresAt);

    await getTransporter().sendMail({
      from: `"KSH INFRA" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Verification Code – KSH INFRA",
      text: `Hi ${name},\n\nYour one-time verification code is: ${otp}\n\nValid for 5 minutes.\n\nRegards,\nKSH INFRA`,
    });

    return Response.json({ success: true, token });
  } catch (err) {
    console.error("cert-otp error:", err instanceof Error ? err.message : err);
    return Response.json({ success: false, error: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}
