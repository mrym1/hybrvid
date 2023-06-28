import React from "react";
import Nav from "../../Components/navbar/nav";
import Uploader from "../../Components/uploader/uploader";
import Footer from "../../Components/footer/footer";

const home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Uploader />
      <Footer />
    </div>
  );
};

export default home;
