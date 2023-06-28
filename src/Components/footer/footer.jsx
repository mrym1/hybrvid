import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const footer = () => {
  return (
      <div className="bg-slate-100 bottom-0 left-0 w-full mt-auto">
        <footer className="m-4 mb-0 ">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="grid grid-cols-1 gap-8 px-4 py-6  md:grid-cols-3">
              <div>
                <h1 className="flex flex-col items-center justify-center text-2xl font-semibold text-gray-900 uppercase dark:text-white">
                  Contact Us:
                </h1>
              </div>
              <div className="flex flex-col text-lg items-center justify-center">
                <EmailIcon />
                {/* <h2 className=" text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Email
              </h2> */}

                <p>oozliacademy@gmail.com</p>
              </div>
              <div className="flex flex-col text-lg items-center justify-center">
                <PhoneIcon />
                {/* <h2 className=" text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Phone:
              </h2> */}
                <p>+971503798154</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default footer;
