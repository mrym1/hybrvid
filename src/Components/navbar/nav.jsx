import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaUserAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Drope down Menu

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   // Check if user credentials exist in local storage
  //   const credentials = localStorage.getItem("credentials");
  //   if (credentials) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  useEffect(() => {
    // Check if user credentials exist in local storage
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      // Split the credentials string into its individual parts
      const [email, password, members] = credentials.split(":");
      // Use the email value as needed
      console.log(email);
      setEmail(email);
      setIsLoggedIn(true);
    }
  }, []);

  console.log(email);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("credentials");
      setIsLoggedIn(false);
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
            <div className="relative -mr-6 mb-3">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <FaUserAlt className="w-5 h-5 mr-2 text-black" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Typography className="block px-8 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {email}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="https://billing.stripe.com/p/login/cN217Q54fglmgPmdQQ">
                    <Button variant="outlined" size="small">
                      Manage Account
                    </Button>
                  </Link>
                </MenuItem>
              </Menu>
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
