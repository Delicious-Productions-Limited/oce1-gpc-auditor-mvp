import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY not set')
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed'
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
