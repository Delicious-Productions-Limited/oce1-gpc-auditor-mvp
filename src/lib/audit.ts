import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

const TRACKER_DOMAINS = [
  'google-analytics.com',
  'www.google-analytics.com',
  'analytics.google.com',
  'googletagmanager.com',
  'doubleclick.net',
  'googlesyndication.com',
  'connect.facebook.net',
  'facebook.com',
  'fbcdn.net',
  'hotjar.com',
  'script.hotjar.com',
  'analytics.tiktok.com',
  'tiktok.com',
  'cdn.segment.com',
  'api.segment.io',
  'snap.licdn.com',
  'linkedin.com',
  'bat.bing.com',
  'clarity.ms',
]

interface AuditRun {
  requests: string[]
  trackerRequests: string[]
  trackerDomains: string[]
  screenshotBase64?: string
}

async function runOnce(
  url: string,
  gpc: boolean,
  attempt = 1
): Promise<AuditRun> {
  const args = [
    ...chromium.args,
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--no-zygote',
    ...(attempt <= 1 ? ['--single-process'] : []),
  ]

  const browser = await puppeteer.launch({
    args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    defaultViewport: { width: 1280, height: 800 },
    timeout: 120_000,
  })

  try {
    const page = await browser.newPage()
    if (gpc) {
      await page.setExtraHTTPHeaders({ 'Sec-GPC': '1' })
    }

    const requests: string[] = []
    page.on('request', (req) => requests.push(req.url()))

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })
    const screenshotBuffer = await page.screenshot({ fullPage: true })
    const screenshotBase64 = Buffer.from(screenshotBuffer).toString('base64')

    const trackerRequests = requests.filter((r) => {
      try {
        const hostname = new URL(r).hostname
        return TRACKER_DOMAINS.some(
          (d) => hostname === d || hostname.endsWith('.' + d)
        )
      } catch {
        return false
      }
    })

    const trackerDomains = [
      ...new Set(
        trackerRequests
          .map((r) => {
            try {
              return new URL(r).hostname
            } catch {
              return ''
            }
          })
          .filter(Boolean)
      ),
    ]

    return { requests, trackerRequests, trackerDomains, screenshotBase64 }
  } finally {
    await browser.close()
  }
}

async function runOnceWithRetry(
  url: string,
  gpc: boolean,
  maxAttempts = 3
): Promise<AuditRun> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await runOnce(url, gpc, attempt)
    } catch (err) {
      if (attempt === maxAttempts) throw err
      await new Promise((r) => setTimeout(r, 250 * attempt))
    }
  }
  throw new Error('Unreachable')
}

export async function runAudit(url: string) {
  const [baseline, withGpc] = await Promise.all([
    runOnceWithRetry(url, false),
    runOnceWithRetry(url, true),
  ])

  const droppedTrackers = baseline.trackerDomains.filter(
    (d) => !withGpc.trackerDomains.includes(d)
  )
  const persistentTrackers = withGpc.trackerDomains

  return {
    url,
    timestamp: new Date().toISOString(),
    baseline: {
      totalRequests: baseline.requests.length,
      trackerRequests: baseline.trackerRequests.length,
      trackerDomains: baseline.trackerDomains,
      screenshot: baseline.screenshotBase64,
    },
    withGpc: {
      totalRequests: withGpc.requests.length,
      trackerRequests: withGpc.trackerRequests.length,
      trackerDomains: withGpc.trackerDomains,
      screenshot: withGpc.screenshotBase64,
    },
    summary: {
      compliant: persistentTrackers.length === 0,
      droppedTrackers,
      persistentTrackers,
      droppedCount: droppedTrackers.length,
      persistentCount: persistentTrackers.length,
    },
  }
}
