type ValidationResult = { ok: true; url: string } | { ok: false; error: string }

const BLOCKED_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0', '[::1]']

export function validatePublicHttpUrl(input: string): ValidationResult {
  if (!input || typeof input !== 'string') {
    return { ok: false, error: 'URL is required' }
  }

  let urlStr = input.trim()
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = 'https://' + urlStr
  }

  let parsed: URL
  try {
    parsed = new URL(urlStr)
  } catch {
    return { ok: false, error: 'Invalid URL format' }
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { ok: false, error: 'Only HTTP/HTTPS URLs are allowed' }
  }

  if (parsed.port && !['80', '443', ''].includes(parsed.port)) {
    return { ok: false, error: 'Custom ports are not allowed' }
  }

  if (parsed.username || parsed.password) {
    return { ok: false, error: 'Credentialed URLs are not allowed' }
  }

  const hostname = parsed.hostname.toLowerCase()
  if (BLOCKED_HOSTNAMES.includes(hostname)) {
    return { ok: false, error: 'Private/local URLs are not allowed' }
  }

  if (/^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(hostname)) {
    return { ok: false, error: 'Private IP ranges are not allowed' }
  }

  if (hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    return { ok: false, error: 'Internal hostnames are not allowed' }
  }

  return { ok: true, url: parsed.toString() }
}
