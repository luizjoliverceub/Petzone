"use client"

import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { CreateAppointmentSchema } from "./FormAppointment";
import { queryClient } from "@/hooks/useQuery";
import { createAppointment } from "@/utils/actions/CreateAppointments";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function CheckoutForm({ dpmCheckerLink}: { dpmCheckerLink: any, }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/user/checkout`,
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-4 items-center justify-start">

        <PaymentElement id="payment-element" options={paymentElementOptions} className="w-full" />

        <button disabled={isLoading || !stripe || !elements} id="submit" className="w-full text-white border-2 border-transparent font-semibold py-2 bg-brand-secondary rounded-lg hover:border-brand-secondary hover:bg-transparent hover:text-brand-secondary duration-300">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Efetuar pagamento"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}

    </>
  );
}