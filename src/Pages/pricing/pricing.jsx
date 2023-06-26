import React from "react";
import Nav from "../../Components/navbar/nav";
import Pricingcard from "../../Components/pricingcard/pricingcard";

const pricing = () => {
  return (
    <div>
      <Nav />
      <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 -mx-4 mb-4">
        Login
      </button>
      <Pricingcard />
    </div>
  );
};

export default pricing;
