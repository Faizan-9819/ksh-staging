import { NextResponse } from "next/server";
import { getTransporter, NOTIFY_RECEIVER } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name = "",
      companyName = "",
      phone = "",
      email = "",
      typeOfEnquiry = "",
      message = "",
    } = body || {};

    const sheetUrl = process.env.SHEET_URL;
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, error: "Contact lead sheet URL is not configured." },
        { status: 500 },
      );
    }

    // The Apps Script backing this sheet reads user_name/user_company/
    // user_phone/user_email/user_subject/user_message (its own doPost's
    // field names, distinct from this form's own name/companyName/phone/
    // email/typeOfEnquiry/message) — forwarding `body` as-is left every
    // field but the script's own `new Date()` timestamp undefined, which
    // appendRow writes as a blank cell. This is only the SHEET payload;
    // mail sending above already reads its own correctly-named local
    // variables directly, unaffected by this.
    const sheetRes = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: name,
        user_company: companyName,
        user_phone: phone,
        user_email: email,
        user_subject: typeOfEnquiry,
        user_message: message,
      }),
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheet responded with ${sheetRes.status}`);
    }

    await getTransporter().sendMail({
      from: `"KSH INFRA" <${process.env.SMTP_USER}>`,
      to: NOTIFY_RECEIVER,
      replyTo: email,
      subject: `New Contact Inquiry from ${name}`,
      html: `<p>You have a new contact inquiry:</p>
<p><b>Name:</b> ${name}<br/>
<b>Company:</b> ${companyName}<br/>
<b>Phone:</b> ${phone}<br/>
<b>Email:</b> ${email}<br/>
<b>Subject:</b> ${typeOfEnquiry}<br/>
<b>Message:</b><br/>
${message}</p>`,
      text: `You have a new contact inquiry:

Name: ${name}
Company: ${companyName}
Phone: ${phone}
Email: ${email}
Subject: ${typeOfEnquiry}
Message:
${message}`,
    });

    await getTransporter().sendMail({
      from: `"KSH INFRA TEAM" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}`,
      html: `<p>Greetings!</p>
<p>Thank You for reaching out to us.</p>
<p>We have received your message and will get back to you shortly.</p>`,
      text: `Greetings!

Thank You for reaching out to us.
We have received your message and will get back to you shortly.`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log submission." },
      { status: 500 },
    );
  }
}
