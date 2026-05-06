import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const webhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL

    if (webhookUrl) {
      // Forward to configured webhook (ConvertKit, Mailchimp, Make, Zapier, etc.)
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "digitaltoolradar.com",
          timestamp: new Date().toISOString(),
        }),
      })
      if (!res.ok) {
        console.error("[Subscribe] Webhook returned", res.status)
      }
    } else {
      // No webhook configured — log to Vercel Function logs
      // Set SUBSCRIBE_WEBHOOK_URL in Vercel env vars to connect your email provider
      console.log(`[Subscribe] ${email}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Subscribe] Error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
