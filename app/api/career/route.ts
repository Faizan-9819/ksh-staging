import { NextResponse } from "next/server";
import { getTransporter, HR_RECEIVER } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = (formData.get("first_name") as string) || "";
    const lastName = (formData.get("last_name") as string) || "";
    const userPhone = (formData.get("user_phone") as string) || "";
    const userEmail = (formData.get("user_email") as string) || "";
    const userEducation = (formData.get("user_education") as string) || "";
    const userDepartment = (formData.get("user_department") as string) || "";
    const cv = formData.get("attachment") as File | null;
    const coverLetter = formData.get("cover_letter") as File | null;

    const sheetUrl = process.env.SHEET_URL5;
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, error: "Career lead sheet URL is not configured." },
        { status: 500 },
      );
    }

    const sheetRes = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date().toISOString(),
        first_name: firstName,
        last_name: lastName,
        user_phone: userPhone,
        user_email: userEmail,
        user_education: userEducation,
        user_department: userDepartment,
        cv: cv?.name || "",
        cover_letter: coverLetter?.name || "",
      }),
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheet responded with ${sheetRes.status}`);
    }

    const attachments = [];
    if (cv) {
      attachments.push({
        filename: cv.name,
        content: Buffer.from(await cv.arrayBuffer()),
      });
    }
    if (coverLetter) {
      attachments.push({
        filename: coverLetter.name,
        content: Buffer.from(await coverLetter.arrayBuffer()),
      });
    }

    await getTransporter().sendMail({
      from: `"${firstName} ${lastName}" <${process.env.SMTP_USER}>`,
      to: HR_RECEIVER,
      replyTo: userEmail,
      subject: `New Career Submission: ${firstName} ${lastName}`,
      html: `<p><b>New Career Enquiry Received</b></p>
<p><b>First Name:</b> ${firstName}<br/>
<b>Last Name:</b> ${lastName}<br/>
<b>Phone:</b> ${userPhone}<br/>
<b>Email:</b> ${userEmail}<br/>
<b>Education:</b> ${userEducation}<br/>
<b>Department:</b> ${userDepartment}</p>
<p><b>CV Attachment:</b><br/>
${cv?.name || ""} ${coverLetter?.name || ""}</p>`,
      text: `New Career Enquiry Received

First Name: ${firstName}
Last Name: ${lastName}
Phone: ${userPhone}
Email: ${userEmail}
Education: ${userEducation}
Department: ${userDepartment}

CV Attachment:
${cv?.name || ""} ${coverLetter?.name || ""}`,
      attachments,
    });

    await getTransporter().sendMail({
      from: `"KSH INFRA" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Thank you for reaching out, ${firstName} ${lastName}`,
      html: `<p><b>Thank you, ${firstName} ${lastName}</b></p>
<p>We've received your message at <b>${userEmail}</b> and will respond shortly.</p>
<p>Best regards,<br/>KSH INFRA</p>`,
      text: `Thank you, ${firstName} ${lastName}

We've received your message at ${userEmail} and will respond shortly.

Best regards,
KSH INFRA`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application." },
      { status: 500 },
    );
  }
}
