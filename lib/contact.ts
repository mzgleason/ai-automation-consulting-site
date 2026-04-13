import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(120),
  challenge: z.string().min(10).max(2500),
  source: z.string().min(2).max(120)
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export const CONTACT_EMAIL = "mark.z.gleason@gmail.com";
export const CONTACT_LINKEDIN_URL = "https://www.linkedin.com/in/mark-gleason-mba-0558aa80/";
export const CONTACT_CALENDLY_URL = "https://calendly.com/mark-z-gleason/chat-with-mark";

export function sanitizeContactSubmission(submission: ContactSubmission): ContactSubmission {
  return {
    name: submission.name.trim(),
    email: submission.email.trim().toLowerCase(),
    company: submission.company.trim(),
    challenge: submission.challenge.trim(),
    source: submission.source.trim()
  };
}

