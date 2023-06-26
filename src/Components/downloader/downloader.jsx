import React, { useState, useEffect } from "react";
import { Image, Shimmer } from 'react-shimmer'

const Downloader = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading state for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 -mt-48 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item, index) => (
        <div
          key={index}
          className="max-w-sm p-3 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            
       <Image
        src=''
        fallback={<Shimmer width={800} height={600} />}
      />
         
            {/* <img
              className="rounded-t-lg"
              src={item.thumbnailUrl}
              alt='...'
            />  */}
          <div className="pt-3 flex justify-between">
            {/* <a href={item.downloadLink}> */}
            {/* <h5 className="px-2 text-2x font-bold cursor-none text-gray-900 dark:text-white">
              {item.title}
            </h5> */}
            {/* </a> */}
            <a
              href={item.url}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-md ml-8 duration-500 hover:bg-cyan-500"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Downloader;
