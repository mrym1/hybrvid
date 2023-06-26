import React, { useEffect, useState } from "react";
import VideoThumbnail from "react-video-thumbnail";
import Downloader from "../downloader/downloader";
import { Image, Shimmer } from "react-shimmer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";

const VideoThumbnailComp = ({ url }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState();

  const handleThumbnailLoaded = (thumbnail) => {
    setThumbnailUrl(thumbnail);
  };

  return (
    <div className="flex flex-wrap ">
      <Card sx={{ minWidth: 295,maxWidth:295,height:220, marginLeft: 10 }}>
        {url == "" ? (
          <div
            className="flex flex-col justify-center items-center h-600"
            style={{ height: 200 }}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p>Preparing clip. Please wait...</p>
          </div>
        ) : (
          <div>
            <VideoThumbnail
              videoUrl={url}
              thumbnailHandler={(thumbnail) => console.log(thumbnail)} 
            />
            <CardActions>
              <Button variant="contained" className="" size="small">
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
