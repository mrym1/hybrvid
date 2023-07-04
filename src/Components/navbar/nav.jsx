import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaUserAlt } from "react-icons/fa";
import Button from '@mui/material/Button';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdown, setIsDropwdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user credentials exist in local storage
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenuDropDown = () => {
    setIsDropwdown(!isDropdown);
  };

  const handleLogOut = async () => {
    try {
      // Perform logout action here
      // Clear the user credentials from local storage and update isLoggedIn state
      localStorage.removeItem("credentials");
      setIsLoggedIn(false);
      // You can also use the following line if you're using react-router-dom to navigate to the home page after logout
      // const navigate = useNavigate();
      // navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="relative px-3 bg-white shadow md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="text-3xl font-bold ml-12">HybrVid</span>
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="block my-4 mr-12 text-gray-500 hover:text-black focus:text-black focus:outline-none"
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
          isMenuOpen ? "block mt-8 pb-2" : "hidden mt-3"
        }`}
      >
        <div className="relative mr-12 md:mt-0 md:ml-4 md:flex text-center">
          {!isLoggedIn ? (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <p className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 -mx-4 mb-4">
                  Login
                </p>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <p className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 mb-4 -mx-4">
                  Register
                </p>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={toggleMenuDropDown}
                className="bg-gradient-to-r text-white  py-2 rounded-md  duration-500  mb-4 -mr-2 flex items-center"
              >
                <FaUserAlt className="w-5 h-5 mr-2 text-black" />
              </button>
              {isDropdown && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li>
                      <p
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        John
                      </p>
                    </li>
                    <li>
                      <a
                        href="https://billing.stripe.com/p/login/cN217Q54fglmgPmdQQ"
                        className="block py-2 "
                      >
                        <Button variant="outlined" size="small">Manage Account</Button>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {isLoggedIn && (
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md ml-8 duration-500 hover:bg-cyan-500 mb-4 mr-2"
              onClick={handleLogOut}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
