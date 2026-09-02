import { getTransporter, NOTIFY_RECEIVER } from "@/lib/mailer";

export const runtime = "nodejs";

const NAME_REGEX = /^[A-Za-z ]{2,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PARK_NAME = "KSH Chakan Park IV";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();

    if (!NAME_REGEX.test(name)) {
      return Response.json({ success: false, error: "Invalid name" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    const timestamp = body?.timestamp || new Date().toISOString();

    const sheetUrl = process.env.SHEET_URL7;
    if (!sheetUrl) {
      return Response.json(
        { success: false, error: "Brochure lead sheet URL is not configured." },
        { status: 500 },
      );
    }

    const sheetResponse = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        form_type: "chakan_iv_brochure",
        timestamp,
      }),
    });

    if (!sheetResponse.ok) {
      return Response.json(
        { success: false, error: `Sheet error: ${sheetResponse.status}` },
        { status: 502 },
      );
    }

    const brochureLink = "https://www.kshinfra.com/brochure/ksh-chakan-iv.pdf";

    await getTransporter().sendMail({
      from: `"KSH INFRA Leasing" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `${PARK_NAME} Brochure Download`,
      html: `<p>Hi there!</p>
<p>Thank you for your interest in our ${PARK_NAME} Brochure.</p>
<p>You can download it right now by clicking the link below:</p>
<p><a href="${brochureLink}">Download the ${PARK_NAME} Brochure</a></p>
<hr />
<p>If the link doesn't work, copy &amp; paste this URL into your browser:</p>
<p>${brochureLink}</p>
<p>Best regards,<br/>KSH INFRA</p>`,
      text: `Hi there!

Thank you for your interest in our ${PARK_NAME} Brochure.

You can download it right now by clicking the link below:

${brochureLink}

Best regards,
KSH INFRA`,
    });

    await getTransporter().sendMail({
      from: `"KSH INFRA Website" <${process.env.SMTP_USER}>`,
      to: NOTIFY_RECEIVER,
      subject: `New brochure request: ${PARK_NAME}`,
      text: `New brochure request received.

Name: ${name}
Email: ${email}
Park: ${PARK_NAME}
Timestamp: ${timestamp}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Chakan IV brochure API error:", error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 },
    );
  }
}
