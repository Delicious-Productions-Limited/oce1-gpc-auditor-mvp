import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { validatePublicHttpUrl } from '@/lib/url-validation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICE_MAP: Record<string, string> = {
  '49': process.env.STRIPE_PRICE_STARTER || 'price_starter',
  '99': process.env.STRIPE_PRICE_PRO || 'price_pro',
  '199': process.env.STRIPE_PRICE_AGENCY || 'price_agency',
}

export async function POST(req: NextRequest) {
  try {
    const { url, priceId, confirmLive } = await req.json()

    const validated = validatePublicHttpUrl(url)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const stripePriceId = PRICE_MAP[priceId] || PRICE_MAP['49']

    if (
      process.env.STRIPE_MODE === 'test' &&
      !process.env.STRIPE_SECRET_KEY_TEST &&
      !confirmLive
    ) {
      return NextResponse.json(
        { error: 'Test keys missing — using LIVE. Confirm?', needsLiveConfirm: true },
        { status: 428 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://gpc.growthauditkit.com'}/results?session_id={CHECKOUT_SESSION_ID}&url=${encodeURIComponent(validated.url)}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://gpc.growthauditkit.com'}/?canceled=1`,
      metadata: { audit_url: validated.url },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
