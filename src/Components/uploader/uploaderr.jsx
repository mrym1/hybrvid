import VideoUploader from "./videouploader";
import UrlUploader from "./urlUploader";

function uploaderr() {
  return (
    <div className="flex flex-col items-center pt-4 m-10 justify-center h-70 border-2 border-black-400 border-dashed rounded-lg md:w-1/3 mx-auto max-sm:mx-6">
      <VideoUploader />
      <p className="text-xs mb-4 text-gray-500 dark:text-gray-400">Or</p>

      <UrlUploader />
      <div>
        <p className="text-xs mb-4 pb-4 text-gray-500 dark:text-gray-400">
          Max file size 1GB. Sign Up for more
        </p>
      </div>
    </div>
  );
}

export default uploaderr;
