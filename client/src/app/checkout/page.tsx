'use client';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import { useSearchParams } from 'next/navigation';

const STRIPE_PUBLISHABLE_KEY: any =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const searchParams = useSearchParams();
  const amountInDollars = parseFloat(searchParams.get('amount') || '0');
  const amountInCents = Math.round(amountInDollars * 100); // Convert dollars to cents

  const options = {
    mode: 'payment',
    currency: 'usd',
    //   payment_method_types: ['paypal'],
    amount: amountInCents,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amountInCents} />
    </Elements>
  );
}

export default Checkout;
