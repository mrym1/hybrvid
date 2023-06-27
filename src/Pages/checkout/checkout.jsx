import React, { useEffect } from "react";
// import Payment from "../../Components/payment/payment";
import Nav from "../../Components/navbar/nav";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from './PaymentForm';

// const stripePromise = loadStripe("pk_test_51L9OUFHYMywy7UqrbREXzmBj470OQskl4oqvdbc4YLsrU5L96GVEOMTKTP2zAl8P5QC8OF2j9mnLv5SsGJPEQgRa00Py746Mtn");

const checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check member value from local storage
    const credentials = localStorage.getItem("credentials");
    if (!credentials){
      navigate("/");
      return;
    }
    else if (credentials && credentials.includes(":true")) {
      // Redirect the user to the home page if member value is true
      navigate("/");
      return;
    } 
  }, []);

  const handleMembership = async () => {
    // Update members value to true in Firestore
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      member: true,
    });

    // Update members value in local storage
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const updatedCredentials = credentials.replace(":false", ":true");
      localStorage.setItem("credentials", updatedCredentials);
    }

    // Redirect the user to the home page or any other desired page
    navigate("/");
  };

  return (
    <div>
      <Nav />
      <div className="bg-white rounded-lg shadow w-full p-8 mt-8 md:max-w-lg  md:mx-auto">
        <button
          onClick={handleMembership}
          className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 -mx-4 mb-4"
        >
          Checkout
        </button>
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
      {/* <Elements stripe={stripePromise}>
        <Payment />
      </Elements> */}
    </div>
  );
};

export default checkout;
