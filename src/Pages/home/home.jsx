import React, { useEffect } from "react";
import Nav from "../../Components/navbar/nav";
import Uploader from "../../Components/uploader/uploader";
import Footer from "../../Components/footer/footer";
import { useNavigate } from "react-router-dom";

const home = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const credentials = localStorage.getItem("credentials");
  //   if (credentials) {
  //     const [, , members] = credentials.split(":");
  //     if (members === "false") {
  //       navigate("/checkout"); 
  //     }
  //   } else {
  //     navigate("/"); 
  //   }
  // }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Uploader />
      <Footer />
    </div>
  );
};

export default home;
