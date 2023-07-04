import React, { useEffect, useState } from "react";
import VideoThumbnail from "react-video-thumbnail";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const VideoThumbnailComp = ({ url }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState();

  console.log("Video Url to be downloaded", url);

  const handleDownload = () => {
    if (url) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "video.mp4";
      link.click();
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      <Card
        sx={{
          minWidth: 295,
          maxWidth: 295,
          minheight: 340,
          maxHeight: 340,
          // marginLeft: 10,
        }}
      >
        {url == "" ? (
          <div
            className="flex flex-col justify-center items-center h-600"
            style={{ height: 340 }}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p>Preparing clip. Please wait...</p>
          </div>
        ) : (
          <div style={{ height: 340, overflow: "hidden" }}>
            <div style={{ height: 290, overflow: "hidden" }}>
              <VideoThumbnail
                videoUrl={url}
                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
              />
            </div>
            <CardActions className="flex justify-start">
              <Button
                variant="contained"
                className="mb-3 w-full"
                size="small"
                onClick={handleDownload}
              >
                Download
              </Button>
            </CardActions>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VideoThumbnailComp;
