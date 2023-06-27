import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Downloader from "../downloader/downloader";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import { get_api, post_api } from "../../api";
import VideoThumbnail from "./VideoThumbnailComp";

const uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const storedFileAddress = localStorage.getItem("selectedFileAddress");
  const [showUploadComponent, setShowUploadComponent] = useState(
    !storedFileAddress
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  var [clipUrls, setClipUrls] = useState([]);
  var [noOfClips, setNoOfClips] = useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (storedFileAddress) {
      setSelectedFile(storedFileAddress);
    }
  }, []);

  ///////////////////////////////////////////

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes("video")) {
      setSelectedFile(URL.createObjectURL(file));
      localStorage.setItem("selectedFileAddress", URL.createObjectURL(file));
      setShowUploadComponent(false);
    } else {
      setSelectedFile(null);
      localStorage.removeItem("selectedFileAddress");
    }
  };

  const handleRemoveUrl = () => {
    setSelectedFile(null);
    localStorage.removeItem("selectedFileAddress");
    setShowUploadComponent(true);
  };

  const [url, setUrl] = useState(localStorage.getItem("url") || "");
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem("url");
    if (storedUrl) {
      setUrl(storedUrl);
    }
  }, []);

  useEffect(() => {
    if (!url) {
      localStorage.removeItem("url");
    } else {
      localStorage.setItem("url", url);
    }
  }, [url]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (!inputValue || youtubeRegex.test(inputValue)) {
      setUrl(inputValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid YouTube URL.");
    }
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        // Check if the pasted text is a valid YouTube URL
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

        if (!youtubeRegex.test(text)) {
          setErrorMessage("Please paste a valid YouTube URL.");
          return;
        }

        setUrl(text);
      })
      .catch((error) => {
        console.error("Failed to read clipboard contents: ", error);
      });
  };

  const handleClearUrl = () => {
    setUrl("");
    localStorage.removeItem("url");
  };

  var intervalId = 0;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginBanner, setShowLoginBanner] = useState(false);

  const handleCreateLogin = async (e) => {
    const isLoggedIn = localStorage.getItem("credentials");
    if (!isLoggedIn) {
      // User is not logged in, show login required banner and return
      setShowLoginBanner(true);
      setIsLoggedIn(false);
      return;
    } else {
      setIsLoading(true);
      var response = await post_api("clip", {
        URL: `${url}`,
        usr_name: "mrym",
        usr_id: "1",
      });
      setIsLoading(false);
      setMessage(response.message);
      handleClick();
      if (response == null) {
        console.log("error");
      } else {
        setNoOfClips(0);
        clipUrls = [...clipUrls, ""];
        setClipUrls(clipUrls); 
        let id = setInterval(() => {
          console.log("usama1");
          checkClips();
        }, 30000);
        intervalId = id;
      }
    }
  };

  const checkClips = async () => {
    try {
      console.log("current clip ",`clip/${clipUrls.length - 1}`)
      var response = await get_api(`clip/${clipUrls.length - 1}`);
      console.log("api response", response);

      if (response == null) {
      } else {
        setNoOfClips(response.result.clip_count);
        clipUrls[clipUrls.length - 1] = response.result.clip_url; 
        setClipUrls([...clipUrls]);
        console.log("rrsponsez length:  ", clipUrls);
        if (clipUrls.length == response.result.clip_count) {
          clearInterval(intervalId);
        } else {
          clipUrls = [...clipUrls, ""];
          setClipUrls(clipUrls);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={message}
        onClose={() => setOpen(false)}
      />

      {showLoginBanner && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-pink-500 bg-pink-100 px-4 py-2 w-full text-center my-4">
            You need to login in order to create the clips.{" "}
            <Link to="/login">
              <a className="text-blue-500 underline">Login</a>
            </Link>
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center pt-4 m-10 h-70 border-2 border-black-400 border-dashed rounded-lg md:w-1/3 mx-auto max-sm:mx-6">
        <div>
          {showUploadComponent ? (
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full cursor-pointer"
              >
                <div className="flex items-center justify-center px-4 pb-2 pt-4 mt-4 bg-blue-400 text-white rounded-md  duration-500 hover:bg-blue-300">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-black-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-black-400 dark:text-gray-400">
                    <span className="font-semibold text-white">
                      Click to upload
                    </span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="video/mp4,video/quicktime"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-4">
              {/* <p>URL: {url}</p> */}
              <button
                type="button"
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md duration-500 hover:bg-cyan-500"
                // onClick={handleCreateLogin}
              >
                Create Clips
              </button>
              <p
                className="text-blue-500 cursor-pointer underline pt-3"
                onClick={handleRemoveUrl}
              >
                Change Video URl
              </p>
            </div>
          )}
        </div>

        <p className="text-xs my-4 text-gray-500 dark:text-gray-400">Or</p>

        <div>
          {isLoading ? (
            // <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-5 py-3 my-3 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Loading...
            </div>
          ) : (
            // </div>
            <div>
              {url ? (
                <div className="flex flex-col items-center justify-center">
                  {/* <p>URL: {url}</p> */}
                  <div>
                    <button
                      type="button"
                      className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md  duration-500 hover:bg-cyan-500"
                      onClick={handleCreateLogin}
                    >
                      Create Clips
                    </button>
                    <p
                      className="text-blue-500 cursor-pointer underline py-3"
                      onClick={handleClearUrl}
                    >
                      Change YouTube URL
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center mb-4 border border-black-300 p-3 rounded">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Paste YouTube URL"
                      value={url}
                      onChange={handleInputChange} // Update this line
                      autoComplete="off"
                      required
                      ref={inputRef}
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-blue-400"
                    onClick={handlePaste}
                  >
                    Paste
                  </button>
                </div>
              )}

              {errorMessage && (
                <p className="text-red-500 text-xs text-center py-3">
                  {errorMessage}
                </p>
              )}
            </div>
          )}
        </div>
        {/* {clipUrl && <p>URL: {clipUrl}</p>} */}

        <div>
          <p className="text-xs mb-4 pb-4 text-gray-500 dark:text-gray-400">
            Max file size 1GB. Sign Up for more
          </p>
        </div>
      </div>
      {
        noOfClips!=null &&
        <div style={{ height: 10, width: 300, display: "flex", backgroundColor: "lightgray" }}>
            
            {
              Array.from({ length: noOfClips }, (item, index) => { 
                
                  
                  return <div style={{flex:1,height: 10,backgroundColor:clipUrls[index]!=null && clipUrls[index]!=""? "blue":"lightgray"}}></div>
                
              }
            )
            
            }


      </div>
      }
      {/* {videothumb()} */}
      <div className="flex my-20">
        {clipUrls.map((url, index) => {
          console.log("video Url asd", url);
          return <VideoThumbnail key={index} url={url} />;
        })}
      </div>
      
    </div>
  );
};

export default uploader;
