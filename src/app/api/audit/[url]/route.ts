import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '../../../../lib/audit'
import { validatePublicHttpUrl } from '../../../../lib/url-validation'

export const maxDuration = 120

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const targetUrl = decodeURIComponent(params.url)
    const validated = validatePublicHttpUrl(targetUrl)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const result = await runAudit(validated.url)
    return NextResponse.json(result)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Audit failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
