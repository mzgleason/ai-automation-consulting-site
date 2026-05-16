import { NextRequest, NextResponse } from "next/server";
import {
  contactSubmissionSchema,
  MAX_CONTACT_PAYLOAD_BYTES,
  sanitizeContactSubmission
} from "@/lib/contact";

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestCounts = new Map<string, RateLimitEntry>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || entry.expiresAt <= now) {
    requestCounts.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  requestCounts.set(ip, entry);
  return true;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const clientIp = getClientIp(request);

  if (!checkRateLimit(clientIp)) {
    return NextResponse.json({ error: "Unable to process submission." }, { status: 429 });
  }

  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (Number.isFinite(contentLength) && contentLength > MAX_CONTACT_PAYLOAD_BYTES) {
      return NextResponse.json({ error: "Unable to process submission." }, { status: 413 });
    }
  }

  const rawBody = await request.text().catch(() => "");
  if (!rawBody || rawBody.length > MAX_CONTACT_PAYLOAD_BYTES) {
    return NextResponse.json({ error: "Unable to process submission." }, { status: 400 });
  }

  let body: unknown = null;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Unable to process submission." }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Unable to process submission." }, { status: 400 });
  }

  const sanitized = sanitizeContactSubmission(parsed.data);

  console.info("contact_submission_received", {
    name: sanitized.name,
    emailDomain: sanitized.email.split("@")[1] ?? "unknown",
    company: sanitized.company,
    source: sanitized.source
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}