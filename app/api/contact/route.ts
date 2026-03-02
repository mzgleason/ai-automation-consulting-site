import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema, sanitizeContactSubmission } from "@/lib/contact";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json().catch(() => null);

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission payload." }, { status: 400 });
  }

  const sanitized = sanitizeContactSubmission(parsed.data);

  // Intentionally logs only business context; never log tokens/secrets.
  console.info("contact_submission_received", {
    name: sanitized.name,
    emailDomain: sanitized.email.split("@")[1] ?? "unknown",
    company: sanitized.company,
    source: sanitized.source
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

