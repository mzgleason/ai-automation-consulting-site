import { describe, expect, test } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

describe("POST /api/contact", () => {
  test("returns 200 for valid payload", async () => {
    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Taylor Owner",
        email: "taylor@example.com",
        company: "Summit HVAC",
        challenge: "We need automatic quote follow-up and routing.",
        source: "book-page"
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });

  test("returns 400 for invalid payload", async () => {
    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "X",
        email: "nope",
        company: "A",
        challenge: "short",
        source: "x"
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
