import { NextResponse } from "next/server";
import { getTransporter, NOTIFY_RECEIVER } from "@/lib/mailer";

export const runtime = "nodejs";

export const DEFAULT_ESG_REPORTS: Record<string, string> = {
  "2023-24": "https://www.kshinfra.com/KSH_ESG_Report_2023.pdf",
  "2024-25": "https://www.kshinfra.com/KSH_ESG_Report_2024-2025.pdf",
};

export async function POST(request: Request) {
  try {
    const { name, email, year, timestamp } = await request.json();

    if (!name || !email || !year) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const sheetUrl = process.env.SHEET_URL4;
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, error: "ESG report sheet URL is not configured." },
        { status: 500 },
      );
    }

    const sheetRes = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, year, timestamp }),
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheet responded with ${sheetRes.status}`);
    }

    const reportLink = DEFAULT_ESG_REPORTS[year] || "";

    await getTransporter().sendMail({
      from: `"KSH INFRA TEAM" <${process.env.SMTP_USER}>`,
      to: NOTIFY_RECEIVER,
      replyTo: email,
      subject: `New ESG Report Download Request from ${name}`,
      html: `<p><b>Name:</b> ${name}<br/>
<b>Email:</b> ${email}<br/>
They've requested to download the ESG Report.</p>`,
      text: `Name: ${name}
Email: ${email}
They've requested to download the ESG Report.`,
    });

    await getTransporter().sendMail({
      from: `"KSH INFRA" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your ESG Report Is Ready for Download!`,
      html: `<p>Hi there!</p>
<p>Thank you for your interest in our ESG Report.</p>
<p>You can download it right now by clicking the link below:</p>
<p><a href="${reportLink}">Download the ESG Report</a></p>
<hr />
<p>If the link doesn't work, copy &amp; paste this URL into your browser:</p>
<p>${reportLink}</p>
<p>Best regards,<br/>KSH INFRA</p>`,
      text: `Hi there!

Thank you for your interest in our ESG Report.

You can download it right now by clicking the link below:

Download the ESG Report

${reportLink}

Best regards,
KSH INFRA`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ESG report form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log submission." },
      { status: 500 },
    );
  }
}
