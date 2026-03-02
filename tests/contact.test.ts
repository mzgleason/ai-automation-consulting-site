import { describe, expect, test } from "vitest";
import { contactSubmissionSchema, sanitizeContactSubmission } from "@/lib/contact";

describe("contactSubmissionSchema", () => {
  test("accepts valid payload", () => {
    const payload = {
      name: "Alex Owner",
      email: "alex@example.com",
      company: "Northside Dental",
      challenge: "Manual follow-up and scheduling consumes five hours per week.",
      source: "contact-page"
    };

    const result = contactSubmissionSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const payload = {
      name: "Alex Owner",
      email: "invalid",
      company: "Northside Dental",
      challenge: "Manual follow-up and scheduling consumes five hours per week.",
      source: "contact-page"
    };

    const result = contactSubmissionSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe("sanitizeContactSubmission", () => {
  test("trims fields and normalizes email", () => {
    const sanitized = sanitizeContactSubmission({
      name: "  Alex Owner  ",
      email: "  ALEX@EXAMPLE.COM ",
      company: "  Northside Dental  ",
      challenge: "  Need help with intake routing.  ",
      source: "  contact-page  "
    });

    expect(sanitized.name).toBe("Alex Owner");
    expect(sanitized.email).toBe("alex@example.com");
    expect(sanitized.company).toBe("Northside Dental");
    expect(sanitized.challenge).toBe("Need help with intake routing.");
    expect(sanitized.source).toBe("contact-page");
  });
});
