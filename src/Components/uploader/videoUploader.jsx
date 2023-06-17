import { useState, useRef, useEffect } from 'react';

function videoUploader() {
  const [url, setUrl] = useState(localStorage.getItem('url') || '');
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem('url');
    if (storedUrl) {
      setUrl(storedUrl);
    }
  }, []);

  useEffect(() => {
    if (!url) {
      localStorage.removeItem('url');
    } else {
      localStorage.setItem('url', url);
    }
  }, [url]);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setUrl(text);
      })
      .catch((error) => {
        console.error('Failed to read clipboard contents: ', error);
      });
  };

  const handleCreate = () => {
    if (!url) {
      setErrorMessage('Please enter a YouTube URL.');
      return;
    }

    // Regular expression to match YouTube URLs
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (!youtubeRegex.test(url)) {
      setErrorMessage('Please enter a valid YouTube URL.');
      return;
    }

    // Process the valid YouTube URL and create action
    // ...

    // Clear the URL input
    setUrl('');
  };

  const handleClearUrl = () => {
    setUrl('');
    localStorage.removeItem('url');
  };

  return (
    <div>
      {url ? (
        <div>
          <p>URL: {url}</p>
          <button
            type="button"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-blue-400"
            onClick={handleCreate}
          >
            Create
          </button>
          <p
            className="text-blue-500 cursor-pointer"
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
              onChange={handleInputChange}
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
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default videoUploader;