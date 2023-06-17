import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Downloader from "../downloader/downloader";
import { Link } from "react-router-dom";

const uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const storedFileAddress = localStorage.getItem("selectedFileAddress");
  const [showUploadComponent, setShowUploadComponent] = useState(
    !storedFileAddress
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (storedFileAddress) {
      setSelectedFile(storedFileAddress);
    }
  }, []);

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

  const handleCreate = () => {
    if (!url) {
      setErrorMessage("Please enter a YouTube URL.");
      return;
    }

    // Regular expression to match YouTube URLs
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (!youtubeRegex.test(url)) {
      setErrorMessage("Please enter a valid YouTube URL.");
      return;
    }

    // Process the valid YouTube URL and create action
    // ...

    // Clear the URL input
    setUrl("");
  };

  const handleClearUrl = () => {
    setUrl("");
    localStorage.removeItem("url");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginBanner, setShowLoginBanner] = useState(false);

  const handleCreateLogin = () => {
    const isLoggedIn = localStorage.getItem("credentials");

    if (!isLoggedIn) {
      // User is not logged in, show login required banner and return
      // setIsLoggedIn(false);
      setShowLoginBanner(true);
      setIsLoggedIn(false);
      // navigate("/login");
      return;
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
        {showLoginBanner && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-pink-500 bg-pink-100 px-4 py-2 w-full text-center my-4">
            You need to login in order to create the clips. <Link to="/login"><a className="text-blue-500 underline">Login</a></Link>
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
                onClick={handleCreateLogin}
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
          {url ? (
            <div className="flex flex-col items-center justify-center">
              {/* <p>URL: {url}</p> */}
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
            <p className="text-red-500 text-xs text-center py-3">{errorMessage}</p>
          )}
        </div>

        <div>
          <p className="text-xs mb-4 pb-4 text-gray-500 dark:text-gray-400">
            Max file size 1GB. Sign Up for more
          </p>
        </div>
      </div>
      {isLoggedIn && (
        <Downloader
          data={[
            {
              imageSrc:
                "https://creatopyblogsubfolder.kinsta.cloud/blog/wp-content/uploads/2019/05/Text_to_photo.png",
              title: "Noteworthy 2021",
              downloadLink: "#",
            },
            {
              imageSrc:
                "https://creatopyblogsubfolder.kinsta.cloud/blog/wp-content/uploads/2019/05/Text_to_photo.png",
              title: "Exciting 2022",
              downloadLink: "#",
            },
            {
              imageSrc:
                "https://creatopyblogsubfolder.kinsta.cloud/blog/wp-content/uploads/2019/05/Text_to_photo.png",
              title: "Exciting  2022",
              downloadLink: "#",
            },
            // Add more items as needed
          ]}
        />
        )
          // <div className="flex flex-col items-center justify-center">
          //   <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          //   <p className="text-pink-500 bg-pink-100 px-4 py-2 rounded-md">
          //     You need to login in order to create the clips
          //   </p>
          //   {/* <button
          //     type="button"
          //     className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-md mt-4 duration-500 hover:bg-cyan-500"
          //     // onClick={handleCreateLogin}
          //   >
          //     Login
          //   </button> */}
          // </div>
        }
        {/* <!-- Main modal --> */}
<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                <form class="space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div class="flex justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 
    </div>
  );
};

export default uploader;
