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

  const options = {
    mode: 'payment',
    currency: 'usd',
    //   payment_method_types: ['paypal'],
    amount: Number(searchParams.get('amount')),
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={Number(searchParams.get('amount'))} />
    </Elements>
  );
}

export default Checkout;
