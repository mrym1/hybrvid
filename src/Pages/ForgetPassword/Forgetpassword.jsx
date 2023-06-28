import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/navbar/nav";
import { auth } from "../../firebase";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      navigate("/");
      return;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setMessage("Check your inbox for futher instructions.");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div>
      <Nav />
      <div className="bg-gray-200 text-gray-900">
        <div className="flex items-center h-screen w-full">
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <div className="flex justify-center items-center">
              <span className="text-3xl mb-4 font-bold">HybrVid</span>
            </div>
            {/* <form className="mb-4" method="post"> */}
              <div className="mb-4 md:w-full">
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
                onClick={(e) => handleSubmit(e)}
              >
                Reset Password
              </button>
            {/* </form> */}
            <div className="flex justify-center">
              <p>Don't have an account?</p>
              <div className="ml-1">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <p className="text-blue-700 text-center text-sm">
                    Sign up here
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
