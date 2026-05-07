// lib/indexnow.ts
// Submit new/updated URLs to IndexNow API for fast Bing indexing
// Also picked up by Yandex, Seznam, and other IndexNow-compatible engines
// Usage: call notifyIndexNow(url) after publishing a new review page

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? ''
const HOST = 'digitaltoolradar.com'
const BASE_URL = `https://${HOST}`

/**
 * Notify IndexNow of a single URL update.
 * Call this immediately after deploying a new review or bonus page.
 */
export async function notifyIndexNow(path: string): Promise<void> {
  if (!INDEXNOW_KEY) {
    console.warn('[IndexNow] INDEXNOW_KEY not set — skipping submission')
    return
  }

  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: [url],
      }),
    })

    if (res.ok) {
      console.log(`[IndexNow] Submitted: ${url} → HTTP ${res.status}`)
    } else {
      console.error(`[IndexNow] Failed: ${url} → HTTP ${res.status}`)
    }
  } catch (err) {
    console.error('[IndexNow] Error submitting URL:', err)
  }
}

/**
 * Notify IndexNow of multiple URLs at once (e.g. batch publish).
 * Max 10,000 URLs per request (IndexNow spec).
 */
export async function notifyIndexNowBatch(paths: string[]): Promise<void> {
  if (!INDEXNOW_KEY) {
    console.warn('[IndexNow] INDEXNOW_KEY not set — skipping submission')
    return
  }

  const urls = paths.map((p) =>
    p.startsWith('http') ? p : `${BASE_URL}${p}`
  )

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    })

    console.log(`[IndexNow] Batch submitted ${urls.length} URLs → HTTP ${res.status}`)
  } catch (err) {
    console.error('[IndexNow] Batch error:', err)
  }
}

/*
 * SETUP INSTRUCTIONS
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Generate a key (any random alphanumeric string, 8–128 chars)
 *    Example: crypto.randomUUID().replace(/-/g, '')
 *
 * 2. Add to .env.local:
 *    INDEXNOW_KEY=your_key_here
 *
 * 3. Create the key verification file in /public:
 *    /public/{INDEXNOW_KEY}.txt
 *    Contents: just the key string, nothing else
 *
 * 4. Verify: https://digitaltoolradar.com/{INDEXNOW_KEY}.txt should serve the key
 *
 * 5. Register with Bing Webmaster Tools → IndexNow → verify ownership
 *
 * 6. Call notifyIndexNow('/massfluence-20-review') after each new page deploy
 * ─────────────────────────────────────────────────────────────────────────────
 */
