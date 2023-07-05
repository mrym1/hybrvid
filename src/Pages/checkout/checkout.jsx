import React, { useEffect } from "react";
// import Payment from "../../Components/payment/payment";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Nav from "../../Components/navbar/nav";
import { auth, db } from "../../firebase";



const checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");
    if (!credentials){
      navigate("/");
      return;
    }
    else if (credentials && credentials.includes(":true")) {
      navigate("/");
      return;
    } 
  }, []);
  const onToken = (token) => {
    console.log(token);
    handleMembership();
  }

  const handleMembership = async () => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      member: true,
    });

    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const updatedCredentials = credentials.replace(":false", ":true");
      localStorage.setItem("credentials", updatedCredentials);
    }
    navigate("/");
  };

  return (
    <div>
      <Nav />
      <div className="bg-white flex flex-col justify-center rounded-lg shadow w-full p-8 my-8 md:max-w-lg  md:mx-auto">
        <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Checkout</h2>
        </div>
        <div className="text-center">
          <a href="https://buy.stripe.com/4gwbKg7qs9cwfDyaEF">
           <button
          className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-12 py-2 rounded-md ml-1 mt-5 duration-500 hover:bg-cyan-500 -mx-4 mb-4"
            >
          Pay Now
        </button>

          </a>
      </div>
      </div>
      
      
    </div>
  );
};

export default checkout;
