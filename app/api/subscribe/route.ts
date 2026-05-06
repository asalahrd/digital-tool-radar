import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const apiKey = process.env.CONVERTKIT_API_KEY
    const formId = process.env.CONVERTKIT_FORM_ID

    if (apiKey && formId) {
      const ckRes = await fetch(
        `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: apiKey, email }),
        }
      )
      if (!ckRes.ok) {
        const body = await ckRes.text()
        console.error("[Subscribe] ConvertKit error:", ckRes.status, body)
        return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
      }
    } else {
      console.log("[Subscribe] No env vars set, logging:", email)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Subscribe] Error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
