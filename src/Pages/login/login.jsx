import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/navbar/nav";
import { auth, db } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      navigate("/");
      return;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setSubmitted(true);

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        if (userData != null) {
          console.log(userData.member);

          const members = userData.member;
          const credentials = `${email}:${password}:${members}`;
          localStorage.setItem("credentials", credentials);

          if (members === false) {
            navigate("/checkout"); 
          } else {
            navigate("/");
          }

          console.log(user);
        } else {
          setError("Please create a new account");
        }
      })

      .catch((error) => {
        const errorCode = error.code;

        let errorMessage;

        switch (errorCode) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/user-disabled":
            errorMessage = "Your account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found.";
            break;
          case "auth/wrong-password":
            errorMessage = "Invalid password.";
            break;
          default:
            errorMessage = "An error occurred during authentication.";
        }
        setLoading(false);
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
            <form className="mb-4" action="/" method="post">
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
              <div className="mb-6 md:w-full">
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="off"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-600 text-center py-1">{error}</p>
              )}
              <button
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 w-full rounded-md duration-500 hover:bg-cyan-500"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Loading..." : "LOGIN"}
              </button>
            </form>
            <div className="flex justify-center">
              <p>Don't have an account?</p>
              <Link
                to="/register"
                className="ml-1"
                style={{ textDecoration: "none" }}
              >
                <p className="text-blue-700 text-center text-sm">
                  Sign up here
                </p>
              </Link>
            </div>
            <Link to="/forgetpassword" style={{ textDecoration: "none" }}>
              <p className="text-blue-700 text-center text-sm flex justify-center">
                Forgot password?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
