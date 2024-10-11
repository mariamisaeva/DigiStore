import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { amount } = data;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: 'USD',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
