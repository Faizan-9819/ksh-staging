import nodemailer from "nodemailer";
import path from "path";
import { createHmac } from "crypto";
import { after } from "next/server";
import { NOTIFY_RECEIVER } from "@/lib/mailer";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CERT_FILES: Record<string, { filename: string; path: string; label: string }> = {
  "ksh-hosur-i": {
    filename: "Goldberg_certificates.rar",
    path: path.join(process.cwd(), "public", "Goldberg_certificates.rar"),
    label: "Hosur Park",
  },
  "ksh-chakan-iii": {
    filename: "KSH-Chakan-III-Certificates.rar",
    path: path.join(process.cwd(), "public", "KSH-Chakan-III-Certificates.rar"),
    label: "Chakan III Park",
  },
  "ksh-chakan-iv": {
    filename: "KSH-Chakan-IV-Certificates.rar",
    path: path.join(process.cwd(), "public", "KSH-Chakan-IV-Certificates.rar"),
    label: "Chakan IV Park",
  },
};

const PARK_LABELS: Record<string, string> = {
  "ksh-chakan-i": "Chakan I Park",
  "ksh-chakan-ii": "Chakan II Park",
  "ksh-talegaon-i": "Talegaon I Park",
};

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
      socketTimeout: 30000,
      greetingTimeout: 15000,
      connectionTimeout: 15000,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    _transporter.verify().catch(() => {});
  }
  return _transporter;
}

type OtpVerifyResult = { valid: boolean; error?: string };

function verifyOtpToken(token: string, email: string, otp: string): OtpVerifyResult {
  try {
    const secret = process.env.OTP_SECRET || process.env.SMTP_PASS || "ksh-otp-secret";
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return { valid: false, error: undefined as string | undefined };

    const payload = Buffer.from(payloadB64, "base64url").toString();
    const [tokenEmail, tokenOtp, expiresAt] = payload.split("|");

    const expectedSig = createHmac("sha256", secret).update(payload).digest("hex");
    if (expectedSig !== sig) return { valid: false, error: "Invalid token." };

    if (Date.now() > Number(expiresAt)) {
      return { valid: false, error: "OTP has expired. Please request a new one." };
    }

    if (tokenEmail !== email.toLowerCase()) return { valid: false, error: "Token mismatch." };

    if (tokenOtp !== otp) return { valid: false, error: "Incorrect OTP. Please try again." };

    return { valid: true, error: undefined as string | undefined };
  } catch {
    return { valid: false, error: "Invalid token." };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.website) {
      return Response.json({ success: true }); // honeypot — silent drop
    }

    const email = (body?.email || "").trim().toLowerCase();
    const otp = (body?.otp || "").trim();
    const token = (body?.token || "").trim();
    const name = (body?.name || "").trim();
    const phone = (body?.phone || "").trim();
    const organization = (body?.organization || "").trim();
    const source = (body?.source || "").trim();

    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ success: false, error: "Invalid email" }, { status: 400 });
    }
    if (!/^\d{4}$/.test(otp)) {
      return Response.json({ success: false, error: "Invalid OTP format" }, { status: 400 });
    }
    if (!token) {
      return Response.json(
        { success: false, error: "Session expired. Please request a new OTP." },
        { status: 400 },
      );
    }

    const tokens = token
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    const result = tokens
      .map((t: string) => verifyOtpToken(t, email, otp))
      .find((r: OtpVerifyResult) => r.valid);
    if (!result) {
      const lastErr = verifyOtpToken(tokens[tokens.length - 1], email, otp);
      return Response.json(
        { success: false, error: lastErr.error || "Invalid OTP." },
        { status: 400 },
      );
    }

    // OTP is valid — respond immediately, run email + sheet in background after response
    const cert = CERT_FILES[source];
    const parkLabel = cert?.label || PARK_LABELS[source] || "KSH INFRA";

    after(async () => {
      await Promise.allSettled([
        getTransporter()
          .sendMail(
            cert
              ? {
                  from: `"KSH INFRA" <${process.env.SMTP_USER}>`,
                  to: email,
                  subject: "KSH INFRA – Certification",
                  text: `Hi ${name || "there"},\n\nThank you for your interest in KSH INFRA's certification for ${parkLabel}. Please find the files in the attachments.\n\nRegards,\nKSH INFRA`,
                  attachments: [{ filename: cert.filename, path: cert.path }],
                }
              : {
                  from: `"KSH INFRA" <${process.env.SMTP_USER}>`,
                  to: email,
                  subject: "KSH INFRA – Certification",
                  text: `Hi ${name || "there"},\n\nThank you for your interest in KSH INFRA's certification for ${parkLabel}. Our team will send you the certification documents shortly.\n\nRegards,\nKSH INFRA`,
                },
          )
          .catch((err: unknown) => console.error("cert-verify email error:", err)),

        getTransporter()
          .sendMail({
            from: `"KSH INFRA Website" <${process.env.SMTP_USER}>`,
            to: NOTIFY_RECEIVER,
            replyTo: email,
            subject: `New Certificate Download Request: ${name || email}`,
            html: `<p><b>New certificate download request received.</b></p>
<p><b>Name:</b> ${name}<br/>
<b>Email:</b> ${email}<br/>
<b>Phone:</b> ${phone}<br/>
<b>Organization:</b> ${organization}<br/>
<b>Park:</b> ${parkLabel}</p>`,
            text: `New certificate download request received.

Name: ${name}
Email: ${email}
Phone: ${phone}
Organization: ${organization}
Park: ${parkLabel}`,
          })
          .catch((err: unknown) => console.error("cert-verify notify email error:", err)),

        fetch(process.env.SHEET_URL_PARK_CERTIFICATE as string, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, organization, source }),
        }).catch((err: unknown) => console.error("cert-verify sheet error:", err)),
      ]);
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("cert-verify error:", err);
    return Response.json(
      { success: false, error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 500 },
    );
  }
}
