import { useEffect, useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import { get_api, post_api } from "../../api";
import VideoThumbnail from "./VideoThumbnailComp";

const uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const storedFileAddress = localStorage.getItem("selectedFileAddress");
  // const [showUploadComponent, setShowUploadComponent] = useState(
  //   !storedFileAddress
  // );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  var [clipUrls, setClipUrls] = useState([]);
  const [noOfClips, setNoOfClips] = useState(null);
  const [loadbar, setLoadbar] = useState(false);
  const [userID, setUserID] = useState(false);
  const [userName, setUserName] = useState(false);
  const [url, setUrl] = useState(localStorage.getItem("url") || "");
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef(null);

  const [loadbarComplete, setLoadbarComplete] = useState(false);

  const totalTimeInSeconds = 30 * 60; // 40 minutes in seconds

  const [remainingTime, setRemainingTime] = useState(totalTimeInSeconds);
  const [progressPercentage, setProgressPercentage] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate the progress percentage
    const percentage =
      ((totalTimeInSeconds - remainingTime) / totalTimeInSeconds) * 100;
    setProgressPercentage(percentage);
  }, [remainingTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const borderRadiusClass = noOfClips === 1 ? "rounded-full" : "";
  const firstClipClass = noOfClips > 1 ? "rounded-l-lg" : "";
  const lastClipClass = noOfClips > 1 ? "rounded-r-lg" : "";

  useEffect(() => {
    // Check if user credentials exist in local storage
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const credentialsArray = credentials.split(":");

      const UID = credentialsArray[0];
      const email = credentialsArray[1];
      const UserName = email.split("@")[0];
      setUserID(UID);
      setUserName(UserName);

      console.log(UID, UserName);
    }
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (storedFileAddress) {
      setSelectedFile(storedFileAddress);
    }
  }, []);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file && file.type.includes("video")) {
  //     setSelectedFile(URL.createObjectURL(file));
  //     localStorage.setItem("selectedFileAddress", URL.createObjectURL(file));
  //     setShowUploadComponent(false);
  //   } else {
  //     setSelectedFile(null);
  //     localStorage.removeItem("selectedFileAddress");
  //   }
  // };

  // const handleRemoveUrl = () => {
  //   setSelectedFile(null);
  //   localStorage.removeItem("selectedFileAddress");
  //   setShowUploadComponent(true);
  // };


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
        // Check if YouTube URL is a valid YouTube URL
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
  const [responseSend, setResponseSend] = useState(false);

  const handleCreateLogin = async (e) => {
    const isLoggedIn = localStorage.getItem("credentials");
    if (!isLoggedIn) {
      // User is not login
      setShowLoginBanner(true);
      setIsLoggedIn(false);
      return;
    } else {
      setResponseSend(true);
      setIsLoading(true);
      var response = await post_api("clip", {
        URL: `${url}`,
        usr_name: `${userName}`,
        usr_id: `${userID}`,
      });
      setMessage('The video is too short or maybe its restricted. Please change video Url');
      handleClick();
      if (response == null) {
        console.log("error");
        setIsLoading(false);
      } else {
        setMessage(response.message);
        setNoOfClips(0);
        setLoadbar(true);
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
      console.log("current clip ", `clip/${clipUrls.length - 1}`);
      var response = await get_api(`clip/${clipUrls.length - 1}`);
      console.log("api response", response);

      if (response == null) {
      } else {
        setIsLoading(false);
        setNoOfClips(response.result.clip_count);
        clipUrls[clipUrls.length - 1] = response.result.clip_url;
        setClipUrls([...clipUrls]);
        console.log("rrsponsez length:  ", clipUrls);
        if (clipUrls.length == response.result.clip_count) {
          clearInterval(intervalId);
          setLoadbarComplete(true);
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
      <div>
        {/* <div>
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
              // {/* <p>URL: {url}</p> */}
        {/* <button
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
        </div>  */}

        {/* <p className="text-xs my-4 text-gray-500 dark:text-gray-400">Or</p> */}

        <div className="flex flex-col items-center justify-center pt-4 pb-4 m-10 h-70 border-2 border-black-400 border-dashed rounded-lg md:w-1/3 mx-auto max-sm:mx-6">
          {!message && responseSend && (
            <>
              <p className="text-sm text-center p-3">
                To download all the clips now please stay on the screen while
                clips are generated. This may take around 30 minutes. In case
                you leave the screen, the clips will be shared with you over
                your email.
              </p>
              <p className="text-sm text-center p-3">
                Fetching the video, please wait ...
              </p>
            </>
          )}
          {loadbar && !loadbarComplete ? (
            <div>
              {noOfClips != null && (
                <div className="flex justify-center items-center">
                  <div
                    className="rounded-lg"
                    style={{
                      height: 10,
                      width: 300,
                      display: "flex",
                      borderRadius: 10,
                      backgroundColor: "lightgray",
                    }}
                  >
                    {Array.from({ length: noOfClips }, (item, index) => {
                      return (
                        <div
                          className={`bg-white mb-2 p-2 ${
                            index === 0 ? firstClipClass : ""
                          } ${index === noOfClips - 1 ? lastClipClass : ""}`}
                          style={{
                            flex: 1,
                            height: 10,
                            // borderRadius: 10,
                            backgroundColor:
                              clipUrls[index] != null && clipUrls[index] != ""
                                ? "blue"
                                : "lightgray",
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              )}
              {message && <p className="text-sm text-center py-3">{message}</p>}
            </div>
          ) : (
            <>
              {loadbarComplete ? (
                <p className="text-sm text-center p-3">
                  All Clips are successfully generated. Refresh the page to
                  create clips for another long video.
                </p>
              ) : (
                <div>
                  {isLoading ? (
                    <div className="text-center">
                    {/* <div className="text-lg font-medium mb-3">
                      Estimated Time: {formatTime(remainingTime)}
                    </div> */}
                    <div className="relative w-64 h-4 bg-blue-200 rounded-full">
                      <div
                        className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  ) : (
                    <div>
                      {url ? (
                        <div className="flex flex-col items-center justify-center">
                          <div>
                            <button
                              type="button"
                              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white text-lg px-6 py-3 rounded-md  duration-500 hover:bg-cyan-500 mt-4"
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
                          <div className="relative w-full ">
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
              )}
            </>
          )}
        </div>
      </div>

      {/* <div className="flex justify-center items-center my-20 "> */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 my-20 md:justify-center">
        {clipUrls.map((url, index) => {
          console.log("video Url", url);
          return <VideoThumbnail key={index} url={url} />;
        })}
      </div>
      {/* </div> */}
    </div>
  );
};

export default uploader;
