"use client"

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js';
import convertToSubCurrency from '@/lib/convertToSubCurrency';
import { Elements } from '@stripe/react-stripe-js';
import CompletePage from '../consults/[id]/components/CompletePage';
import CheckoutForm from '../consults/[id]/components/CheckoutForm';



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PageCheckout() {

  const [clientSecret, setClientSecret] = React.useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);


    const searchParams = useSearchParams()

    const amount = searchParams.get("amount") 



    useEffect(() => {
      setConfirmed(new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      ));
    });
  
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount:convertToSubCurrency(amount) }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          // [DEV] For demo purposes only
          setDpmCheckerLink(data.dpmCheckerLink);
        });
    }, []);


    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    

  return (
    <div className='w-full h-full flex items-center justify-center flex-col gap-12'>
        <h3 className='text-4xl font-bold'>Página de pagamento</h3>

        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
           {confirmed ? <CompletePage /> : <CheckoutForm  dpmCheckerLink={dpmCheckerLink} />}
        </Elements>
      )}
    </div>
  )
}
