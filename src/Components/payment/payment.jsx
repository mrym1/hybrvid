import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Send the payment method to your server for further processing
      console.log(paymentMethod);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-lg rounded-lg shadow-lg">
        <div className="p-8">
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="border border-gray-300 rounded p-2">
                <CardElement id="cardElement" className="p-2 outline-none" />
              </div>
            </div>
            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full py-3 px-4 text-white bg-blue-600 rounded-md font-medium hover:bg-blue-700"
            >
              {loading ? "Processing..." : "Pay"}
            </button>
            {error && <div className="mt-4 text-red-600">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default payment;
