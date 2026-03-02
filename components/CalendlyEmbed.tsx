"use client";

import { trackEvent } from "@/lib/analytics";

const calendlyUrl =
  "https://calendly.com/your-handle/discovery-call?hide_gdpr_banner=1&background_color=ffffff&text_color=121212";

export function CalendlyEmbed({ page }: { page: string }) {
  return (
    <div className="calendly-wrap">
      <p className="muted">Use your real Calendly URL before launch.</p>
      <iframe
        src={calendlyUrl}
        title="Book a discovery call"
        className="calendly-frame"
        onLoad={() => trackEvent("calendly_opened", { page })}
      />
    </div>
  );
}

