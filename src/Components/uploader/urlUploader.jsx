import { useState, useEffect } from 'react';

function urlUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const storedFileAddress = localStorage.getItem('selectedFileAddress');
  const [showUploadComponent, setShowUploadComponent] = useState(!storedFileAddress);

  useEffect(() => {
    if (storedFileAddress) {
      setSelectedFile(storedFileAddress);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes('video')) {
      setSelectedFile(URL.createObjectURL(file));
      localStorage.setItem('selectedFileAddress', URL.createObjectURL(file));
      setShowUploadComponent(false);
    } else {
      setSelectedFile(null);
      localStorage.removeItem('selectedFileAddress');
    }
  };

  const handleRemoveUrl = () => {
    setSelectedFile(null);
    localStorage.removeItem('selectedFileAddress');
    setShowUploadComponent(true);
  };

  return (
    <div>
      {showUploadComponent ? (
        <div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full cursor-pointer"
          >
            <div className="flex items-center justify-center px-4 pb-2 pt-4 m-4 bg-blue-400 text-white rounded-md ml-8 duration-500 hover:bg-blue-300">
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
                <span className="font-semibold text-white">Click to upload</span>
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
        <div>
          <button
            type="button"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-blue-400"
            onClick={handleCreate}
          >
            Create
          </button>
          <p
            className="text-blue-500 cursor-pointer"
            onClick={handleRemoveUrl}
          >
            Remove URL
          </p>
        </div>
      )}
    </div>
  );
}


export default urlUploader;