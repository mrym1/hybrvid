import React from "react";
import Payment from "../../Components/payment/payment";
import Nav from "../../Components/navbar/nav";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("pk_test_51L9OUFHYMywy7UqrbREXzmBj470OQskl4oqvdbc4YLsrU5L96GVEOMTKTP2zAl8P5QC8OF2j9mnLv5SsGJPEQgRa00Py746Mtn");

const checkout = () => {
  return (
    <div>
      <Nav />
      <div className="bg-white rounded-lg shadow w-full p-8 mt-8 md:max-w-lg  md:mx-auto">
        <h2 className="text-xl font-bold mb-4">Order Review</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-gray-500">Product:</td>
              <td className="text-right">Pro (7GB) Plan</td>
            </tr>
            <tr>
              <td className="text-gray-500">Price:</td>
              <td className="text-right">$49.99</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <span className="text-blue-700 cursor-pointer">Change</span>
        </div>
      </div>
      {/* </div> */}
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    </div>
  );
};

export default checkout;
