import { NextResponse } from "next/server";
import { getTransporter, NOTIFY_RECEIVER } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subscriber_email = "", source_url = "" } = body || {};

    const sheetUrl = process.env.SHEET_URL3;
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, error: "Newsletter sheet URL is not configured." },
        { status: 500 },
      );
    }

    const sheetRes = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheet responded with ${sheetRes.status}`);
    }

    await getTransporter().sendMail({
      from: `"KSH INFRA Newsletter" <${process.env.SMTP_USER}>`,
      to: NOTIFY_RECEIVER,
      replyTo: subscriber_email,
      subject: `New subscriber: ${subscriber_email}`,
      html: `<p>You've got a new newsletter signup:</p>
<p><b>Email:</b> ${subscriber_email}<br/>
<b>Source URL:</b> ${source_url}</p>
<hr />
<p>This notification was sent automatically by your website.</p>`,
      text: `You've got a new newsletter signup:

Email: ${subscriber_email}
Source URL: ${source_url}

This notification was sent automatically by your website.`,
    });

    await getTransporter().sendMail({
      from: `"KSH INFRA Team" <${process.env.SMTP_USER}>`,
      to: subscriber_email,
      subject: `Thanks for subscribing to our newsletter!`,
      html: `<p>Hi ${subscriber_email},</p>
<p>Thank you for joining our newsletter!</p>
<p>&ndash; The KSH INFRA Team</p>`,
      text: `Hi ${subscriber_email},

Thank you for joining our newsletter!

– The KSH INFRA Team`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log submission." },
      { status: 500 },
    );
  }
}
