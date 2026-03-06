import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Webhook verification failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      break
    case 'customer.subscription.deleted':
      break
  }

  return NextResponse.json({ received: true })
}
