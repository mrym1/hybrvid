import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
// import logo from '../../assets/logo.png';

const nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user credentials exist in local storage
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      setIsLoggedIn(true);
    }
  }, []);

  // const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = async () => {
    try {
      var result = await signOut(auth);
      console.log(result);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <nav className="p-3 bg-white shadow md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="text-3xl font-bold   ml-1">
            {/* <img 
              className="h-10 inline rounded-md"
              src={logo}
              alt="Logo"
            /> */}
            HybrVid
          </span>
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="block text-gray-500 hover:text-black focus:text-black focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5H20V7H4V5ZM4 11H20V13H4V11ZM4 17H20V19H4V17Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5H20V7H4V5ZM4 11H20V13H4V11ZM4 17H20V19H4V17ZM20 9H4V7H20V9ZM20 15H4V13H20V15Z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:inline-flex ${
          isMenuOpen ? "block mb-2 mt-8" : "hidden"
        }`}
      >
        <div className="mt-3 md:mt-0 md:ml-4 md:flex mr-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <p className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 -mx-4 mb-4">
                  Login
                </p>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <p className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 mb-4">
                  Register
                </p>
              </Link>
            </>
          ) : (
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 mb-4 mr-2"
              onClick={() => {
                // Perform logout action here
                // Clear the user credentials from local storage and update isLoggedIn state
                localStorage.removeItem("credentials");
                setIsLoggedIn(false);
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default nav;
