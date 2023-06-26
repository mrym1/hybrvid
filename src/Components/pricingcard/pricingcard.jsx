import React from "react";
// import { BsCheck2Circle } from "react-icons/fa";
import { Link } from "react-router-dom";

const pricingcard = () => {
  return (
    <div className="pricing-table-2 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-medium mb-4 md:mb-6">
            Pricing Plans
          </h1>
        </div>

        <div className="pricing-plans lg:flex lg:-mx-4 mt-6 md:mt-12 ">
          <div className="pricing-plan-wrap lg:w-1/3 my-3 md:my-6 m-3 border border-gray-200 rounded-lg shadow ">
            <div className="pricing-plan border-t-4 border-solid border-white  text-center max-w-sm mx-auto hover:border-blue-500 transition-colors duration-300">
              <div className="p-6 md:py-8">
                <h4 className="font-medium leading-tight text-4xl mb-2">
                  Basic
                </h4>
                <h1 className="font-bold text-3xl">$99</h1>
                <p className="text-gray-600">/Per Month</p>
              </div>
  
              <div className="p-6">
                <ul className="leading-loose">
                  <li>
                    <b>1.5 GB</b> maximum file size
                  </li>
                  <li>
                    <b>1500</b> conversion minutes/Month
                  </li>
                  <li>
                    <b>25</b> conversions at a time
                  </li>
                  <li>
                    Merge <b>40</b> files at a time
                  </li>
                  <li>No Ads</li>
                  <li>High priority</li>
                </ul>
                <div className="mt-6 py-4">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-12 py-4 rounded-md ml-8 duration-500 hover:bg-cyan-500">
                    Continue
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pricing-plan-wrap lg:w-1/3 my-3 md:my-6 m-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="pricing-plan border-t-4 border-solid border-white bg-white text-center max-w-sm mx-auto hover:border-blue-500 transition-colors duration-300">
              <div className="p-6 md:py-8">
                <h4 className="font-medium leading-tight text-4xl mb-2">
                  Standard
                </h4>
                <h1 className="font-bold text-3xl">$99</h1>
                <p className="text-gray-600">/Per Month</p>
              </div>

              <div className="p-6">
                <ul className="leading-loose">
                  <li>
                    <b>1.5 GB</b> maximum file size
                  </li>
                  <li>
                    <b>1500</b> conversion minutes/Month
                  </li>
                  <li>
                    <b>25</b> conversions at a time
                  </li>
                  <li>
                    Merge <b>40</b> files at a time
                  </li>
                  <li>No Ads</li>
                  <li>High priority</li>
                </ul>
                <div className="mt-6 py-4">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-12 py-4 rounded-md ml-8 duration-500 hover:bg-cyan-500">
                    Continue
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pricing-plan-wrap lg:w-1/3 my-3 md:my-6 m-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="pricing-plan border-t-4 border-solid border-white bg-white text-center max-w-sm mx-auto hover:border-blue-500 transition-colors duration-300">
              <div className="p-6 md:py-8">
                <h4 className="font-medium leading-tight text-4xl mb-2">Pro</h4>
                <h1 className="font-bold text-3xl">$99</h1>
                <p className="text-gray-600">/Per Month</p>
              </div>
  
              <div className="p-6">
                <ul className="leading-loose">
                  <li>
                    <b>1.5 GB</b> maximum file size
                  </li>
                  <li>
                    <b>1500</b> conversion minutes/Month
                  </li>
                  <li>
                    <b>25</b> conversions at a time
                  </li>
                  <li>
                    Merge <b>40</b> files at a time
                  </li>
                  <li>No Ads</li>
                  <li>High priority</li>
                </ul>
                <div className="mt-6 py-4">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-12 py-4 rounded-md ml-8 duration-500 hover:bg-cyan-500">
                    Continue
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pricingcard;
