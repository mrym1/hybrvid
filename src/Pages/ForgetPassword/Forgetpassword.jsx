import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/navbar/nav";
import { auth } from "../../firebase";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    setLoading(true);
    setError("");
    setMessage("");
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setSubmitted(true);
        // Password reset email sent!
        setMessage("Check your inbox for futher instructions.");
        setLoading(false)
      })
      .catch((error) => {
        var msg = "";
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code == "auth/user-not-found") {
          msg = "User not Found.";
        } else if (error.code == "auth/invalid-email") {
          msg = "Please enter a valid email";
        } else {
          msg = errorMessage;
        }
        // console.log(errorCode);
        // console.log(errorMessage);
        setLoading(false);
        setError(msg);
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
                }-600 text-center py-4`}
              >
                {error || message}
              </p>
            ) : null}

            <button
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 w-full rounded-md duration-500 hover:bg-cyan-500 uppercase"
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
            {/* </form> */}
            <div className="flex justify-center text-sm py-3">
              <p>Remembered your password?</p>
              <div className="ml-1">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <p className="text-blue-700 text-center text-sm">
                    Login
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
