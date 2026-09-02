import nodemailer from "nodemailer";

export const NOTIFY_RECEIVER = "leasing@kshinfra.com";
export const HR_RECEIVER = "hr@kshinfra.com";

let _transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
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
  }
  return _transporter;
}
