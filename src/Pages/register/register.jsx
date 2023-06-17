import React from "react";
import Nav from "../../Components/navbar/nav";
import { Link } from "react-router-dom";

const register = () => {
  return (
    <div>
      <Nav />
      <div className="bg-gray-200 text-gray-900">
        <div className="flex items-center h-screen w-full">
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <div className="flex justify-center items-center">
              <span className="text-3xl mb-4 font-bold">
                HybrVid
              </span>
            </div>
            {/* <span className="flex w-full text-lg uppercase font-bold mb-4 justify-center">
              SignUp
            </span> */}
            <form className="mb-4" action="/" method="post">
              <div className="mb-4 md:w-full">
                {/* <label for="email" className="block text-xs mb-1">
                  Email
                </label> */}
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6 md:w-full">
                {/* <label for="password" className="block text-xs mb-1">
                  Password
                </label> */}
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-6 md:w-full">
                {/* <label for="password" className="block text-xs mb-1">
                  Confirm Password
                </label> */}
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Confirm Password"
                />
              </div>
              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 w-full rounded-md duration-500 hover:bg-cyan-500 uppercase">
                  SignUp
                </button>
              </Link>
            </form>
            {/* <p className="flex justify-between text-sm">
            By creating an account you are agreeing to our{" "}
            <a className="text-blue-700 text-center ml-1" href="#">
              Terms
            </a>
          </p> */}
            <p className="flex justify-center text-sm">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <a className="text-blue-700 text-center ml-1">Login here</a>
              </Link>
            </p>
            {/* <p className=" flex justify-center">
            Already have an account?
            <a className="text-blue-700 text-center" href="#">
              Login here
            </a>
          </p> */}
            {/* <a
            className="text-blue-700 text-center text-sm flex justify-center"
            href="#"
          >
            Forgot password?
          </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
