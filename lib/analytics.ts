"use client";

import { track } from "@vercel/analytics";

type EventPayload = Record<string, string | number | boolean>;

export function trackEvent(name: string, payload: EventPayload = {}): void {
  track(name, payload);
}

