import React from "react";
import "./VideoCard.css";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ get_video }) => {
  const { snippet } = get_video;
  const navigate = useNavigate();

  //Search id - Feed id
  const video_id = get_video.id.videoId || get_video.id;

  const handleClick = () => {
    navigate(`/metube/video/${video_id}`);
  };
  return (
    <div className="video-card" onClick={handleClick}>
      <img
        src={snippet.thumbnails.medium.url}
        alt={snippet.title}
        className="thumbnail"
      />
      <div className="video-info">
        <h3 className="video-title">{snippet.title}</h3>
        <p className="channel-name">{snippet.channelTitle}</p>
      </div>
    </div>
  );
};

export default VideoCard;
