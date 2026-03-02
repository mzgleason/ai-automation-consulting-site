"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ source }: { source: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      challenge: String(formData.get("challenge") ?? ""),
      source
    };

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Could not submit the form.");
      }

      setStatus("success");
      setMessage("Thanks. I will reply within one business day.");
      trackEvent("contact_form_submitted", { source });
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Submission failed. Email hello@irisautomation.co and I will follow up manually.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <label>
        Name
        <input name="name" type="text" required minLength={2} />
      </label>
      <label>
        Work Email
        <input name="email" type="email" required />
      </label>
      <label>
        Company
        <input name="company" type="text" required minLength={2} />
      </label>
      <label>
        Current Bottleneck
        <textarea name="challenge" required minLength={10} rows={5} />
      </label>
      <button disabled={status === "submitting"} className="button button-accent" type="submit">
        {status === "submitting" ? "Submitting..." : "Send Intake"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}

