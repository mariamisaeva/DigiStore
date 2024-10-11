'use client';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';

const STRIPE_PUBLISHABLE_KEY: any =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const options = {
  mode: 'payment',
  currency: 'usd',
  //   payment_method_types: ['paypal'],
  amount: 100,
  // shipping: { name: 'John Doe', address: { line1: '510 Townsend St' } },
  // billing: { name: 'John Doe', address: { line1: '510 Townsend St' } },
  // intent: 'authorize',
};
function Checkout() {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
