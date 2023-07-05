import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Timestamp, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [error, setError] = useState("");
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

  const handleSignUp = async () => {
    setLoading(true);
    if (!email || !password || !passwordConfirmed) {
      setError("Fill all fields");
    }
    if (password !== passwordConfirmed) {
      setError("Password do not match.");
    }
    setError("");
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setSubmitted(true);

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        // members value
        const members = userData && userData.members ? userData.members : false;
        const credentials = `${email}:${password}:${members || false}`;

        localStorage.setItem("credentials", credentials);
        await setDoc(doc(db, `users`, user.uid), {
          member: false,
          createdAt: Timestamp.fromDate(new Date()),
        })
          .then((a) => {
            setLoading(false);
            console.log("User Created");

            if (credentials && credentials.includes(":false")) {
              navigate("/checkout");
            }
          })
          .catch((e) => {
            setLoading(false);
            setError("Something went wrong. Please try again");
          });
        // ...
      })
      .catch((error) => {
        setLoading(false);
        var msg = "";
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code == "auth/weak-password") {
          msg = "Please create a strong password";
        } else if (error.code == "auth/email-already-in-use") {
          msg = "This email is already registered";
        } else if (error.code == "auth/invalid-email") {
          msg = "Please enter a valid email";
        } else {
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
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 w-full rounded-md duration-500 hover:bg-cyan-500"
                >
                  {loading ? 'Loading...' : 'SIGNUP'}
              </button>
            </form>
            <div className="flex justify-center text-sm">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <p className="text-blue-700 text-center ml-1">Login here</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
