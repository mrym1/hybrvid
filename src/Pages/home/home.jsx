import React from "react";
import Nav from "../../Components/navbar/nav";
import Uploader from "../../Components/uploader/uploader";
import Downloader from "../../Components/downloader/downloader";
import Footer from "../../Components/footer/footer";

const home = () => {
  // const data = [
  //   {
  //     imageSrc: "https://creatopyblogsubfolder.kinsta.cloud/blog/wp-content/uploads/2019/05/Text_to_photo.png",
  //     title: "Noteworthy technology 2021",
  //     downloadLink: "#",
  //   },
  //   {
  //     imageSrc: "https://creatopyblogsubfolder.kinsta.cloud/blog/wp-content/uploads/2019/05/Text_to_photo.png",
  //     title: "Exciting innovation 2022",
  //     downloadLink: "#",
  //   },
  //   {
  //       imageSrc: "https://creatopyblogsubfolder.kinsta.cloud/blog/wp-content/uploads/2019/05/Text_to_photo.png",
  //       title: "Exciting innovation 2022",
  //       downloadLink: "#",
  //     },
  //   // Add more items as needed
  // ];

  return (
    <div>
      <Nav />
      <Uploader />
      {/* <Downloader data={data} /> */}
      <Footer />
    </div>
  );
};

export default home;
