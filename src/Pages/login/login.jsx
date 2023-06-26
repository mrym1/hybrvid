import React, { useState } from "react";
import Nav from "../../Components/navbar/nav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

// import logo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Perform login action
   
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          // dispatch({ type: "LOGIN", payload: user });

          // Concatenate email and password with a separator
          const credentials = `${email}:${password}`;

          // Store credentials in local storage
          localStorage.setItem("credentials", credentials);
          navigate("/");
          console.log(user);
          // localStorage.setItem("email", email);
          // localStorage.setItem("password", password);
        }
      ).catch((error)=>{
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
  
        // Display the error message to the user
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
              <div className="mb-6 md:w-full">
                {/* <label htmlFor="password" className="block text-xs mb-1">
                  Password
                </label> */}
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
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 w-full rounded-md duration-500 hover:bg-cyan-500 uppercase"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
            <div className="flex justify-center">
              <p>Don't have an account?</p>
              {/* <div className="ml-1"> */}
              <Link
                to="/pricing"
                className="ml-1"
                style={{ textDecoration: "none" }}
              >
                <p className="text-blue-700 text-center text-sm">
                  Sign up here
                </p>
              </Link>
              {/* </p> */}
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
