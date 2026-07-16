type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
};

export async function sendEmail(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`[resend] RESEND_API_KEY not set — skipping email "${input.subject}" to ${input.to}`);
    return { skipped: true as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "ATS India <no-reply@atsindia.test>",
      to: input.to,
      subject: input.subject,
      html: input.html,
    }),
  });

  if (!res.ok) {
    console.error(`[resend] Failed to send email: ${res.status} ${await res.text()}`);
    return { skipped: false as const, ok: false as const };
  }

  return { skipped: false as const, ok: true as const };
}
