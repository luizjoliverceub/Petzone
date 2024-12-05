"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CompletePage from '../consults/[id]/components/CompletePage';
import CheckoutForm from '../consults/[id]/components/CheckoutForm';
import { CheckoutApointForm } from './components/CheckoutApoint';
import { useMutation } from '@tanstack/react-query';
import { createAppointment } from '@/utils/actions/CreateAppointments';
import { toast } from 'sonner';
import { queryClient } from '@/hooks/useQuery';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PageCheckout() {

  const [clientSecret, setClientSecret] = React.useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [amount, setAmount] = React.useState(() => {
    const amountLocalStorage = Number(localStorage.getItem('amount'))
    console.log(amountLocalStorage)

    return amountLocalStorage
  });
  const [form, setForm] = React.useState(() => {
    const storedValue = localStorage.getItem('apointForm');
    const apointForm = storedValue ? JSON.parse(storedValue) : null;

    console.log(apointForm)

    return apointForm
  });

  const router = useRouter()

  useEffect(() => {
    setConfirmed(Boolean(new URLSearchParams(window.location.search).get("payment_intent_client_secret")));
  });

  useEffect(() => {
    if (amount <= 0) {
      console.error("Valor inválido para amount");
      return;
    }

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount + 20 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col ml-64 overflow-hidden py-12 px-24 gap-20'>
      <h3 className='text-4xl font-bold'>Página de pagamento</h3>

      <div className='w-full h-full flex justify-between items-start gap-24'>
        <CheckoutApointForm form={form} consultValue={amount} />

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            {confirmed ? <CompletePage form={form}/> : <CheckoutForm dpmCheckerLink={dpmCheckerLink} />}
          </Elements>
        )}
      </div>
    </div>
  )
}
