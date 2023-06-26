import React, { useState } from "react";
import Nav from "../../Components/navbar/nav";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
// import logo from "../../assets/logo.png";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      setMessage("");
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your inbox for futher instructions.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Nav />
      <div className="bg-gray-200 text-gray-900">
        <div className="flex items-center h-screen w-full">
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <div className="flex justify-center items-center">
              <span className="text-3xl mb-4 font-bold">
                {/* <img
                  className="h-12 mb-3 inline rounded-md"
                  src={logo}
                  alt="Logo"
                /> */}
                HybrVid
              </span>
            </div>
            {/* <span className="flex w-full text-lg uppercase font-bold mb-4 justify-center">
              Login
            </span> */}
            <form className="mb-4" action="/" method="post">
              <div className="mb-4 md:w-full">
                {/* <label htmlFor="email" className="block text-xs mb-1">
                  Email
                </label> */}
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* {error && (
                <p className="text-red-600 text-center py-2">{error}</p>
              )}
              {message && (
                <p className="text-green-600 text-center py-2">{message}</p>
              )} */}
              {error || message ? (
                <p
                  className={`text-${
                    error ? "red" : "green"
                  }-600 text-center py-2`}
                >
                  {error || message}
                </p>
              ) : null}

              <button
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 w-full rounded-md duration-500 hover:bg-cyan-500 uppercase"
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            </form>
            <div className="flex justify-center">
              <p>Don't have an account?</p>
              <p className="ml-1">
                <Link to="/pricing" style={{ textDecoration: "none" }}>
                  <a className="text-blue-700 text-center text-sm">
                    Sign up here
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
