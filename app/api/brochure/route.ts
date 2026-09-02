import { NextResponse } from "next/server";
import { getTransporter, NOTIFY_RECEIVER } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, email, park, timestamp, brochureUrl } = await request.json();

    if (!name || !email || !park) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const sheetUrl = process.env.SHEET_URL6;
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, error: "Brochure lead sheet URL is not configured." },
        { status: 500 },
      );
    }

    const sheetRes = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, park, timestamp }),
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheet responded with ${sheetRes.status}`);
    }

    const reportLink = brochureUrl
      ? `https://www.kshinfra.com${brochureUrl}`
      : "";

    await getTransporter().sendMail({
      from: `"KSH INFRA TEAM" <${process.env.SMTP_USER}>`,
      to: NOTIFY_RECEIVER,
      replyTo: email,
      subject: `New Brochure Download Request from ${name}`,
      html: `<p><b>Name:</b> ${name}<br/>
<b>Email:</b> ${email}<br/>
<b>Park:</b> ${park}<br/>
They've requested to download the Brochure.</p>`,
      text: `Name: ${name}
Email: ${email}
Park: ${park}
They've requested to download the Brochure.`,
    });

    await getTransporter().sendMail({
      from: `"KSH INFRA" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your ${park} Brochure Is Ready for Download!`,
      html: `<p>Hi there!</p>
<p>Thank you for your interest in our ${park} Brochure.</p>
<p>You can download it right now by clicking the link below:</p>
<p><a href="${reportLink}">Download the Brochure</a></p>
<hr />
<p>If the link doesn't work, copy &amp; paste this URL into your browser:</p>
<p>${reportLink}</p>
<p>Best regards,<br/>KSH INFRA</p>`,
      text: `Hi there!

Thank you for your interest in our ${park} Brochure.

You can download it right now by clicking the link below:

Download the Brochure

${reportLink}

Best regards,
KSH INFRA`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Brochure lead form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log submission." },
      { status: 500 },
    );
  }
}
