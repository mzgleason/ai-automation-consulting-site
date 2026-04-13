import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(120),
  challenge: z.string().min(10).max(2500),
  source: z.string().min(2).max(120)
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export const CONTACT_EMAIL = "hello@markgleason.ai";
export const CONTACT_LINKEDIN_URL = "https://www.linkedin.com/in/markgleason/";
export const CONTACT_CALENDLY_URL = "https://calendly.com/markgleason";

export function sanitizeContactSubmission(submission: ContactSubmission): ContactSubmission {
  return {
    name: submission.name.trim(),
    email: submission.email.trim().toLowerCase(),
    company: submission.company.trim(),
    challenge: submission.challenge.trim(),
    source: submission.source.trim()
  };
}

