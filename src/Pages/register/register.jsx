import React, { useState } from "react";
import Nav from "../../Components/navbar/nav";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../../firebase";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSignUp = async () => {
    if (!email || !password || !passwordConfirmed) {
      setError("Fill all fields");
    }
    if (password !== passwordConfirmed) {
      setError("Password do not match.");
    }
    setError("");
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password) .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      await setDoc(doc(db, `users`,user.uid), {
        member:false,
        createdAt: Timestamp.fromDate(new Date())
      }).then((a)=>{
        setLoading(false);
        console.log("User Created");
        navigate("/checkout");
      }).catch((e)=>{
        setLoading(false);
        setError("Something went wrong. Please try again");
      });
      // ...
    })
    .catch((error) => {
      setLoading(false);
      var msg = '';
      const errorCode = error.code;
      const errorMessage = error.message;
       if(error.code=="auth/weak-password"){
        msg = "Please create a strong password";
      }else if(error.code=="auth/email-already-in-use"){
        msg = "This email is already registered";
      }else if(error.code=="auth/invalid-email"){
        msg = "Please enter a valid email";
      }else{
         msg = errorMessage;
       }
      console.log(errorCode);
      console.log(errorMessage);
      setError(msg);
      // ..
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
                  autoComplete="off"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-6 md:w-full">
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="password"
                  name="passwordcfm"
                  id="passwordcfm"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  required
                  onChange={(e) => setPasswordConfirmed(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-600 text-center py-1">{error}</p>
              )}
              {/* <Link to="/checkout" style={{ textDecoration: "none" }}> */}
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 w-full rounded-md duration-500 hover:bg-cyan-500 uppercase"
              >
                SignUp
              </button>
              {/* </Link> */}
            </form>
            <p className="flex justify-center text-sm">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <a className="text-blue-700 text-center ml-1">Login here</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
