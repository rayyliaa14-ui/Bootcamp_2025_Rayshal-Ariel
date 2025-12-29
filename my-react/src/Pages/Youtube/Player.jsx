import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPopularVideos, getVideoDetail } from "../../api/youtube_api";
import "./Player.css";

function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(videoId);
    const fetchVideo = async () => {
      try {
        const data = await getVideoDetail(videoId);
        setVideo(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (!video) {
    return <div className="loading">Video not found</div>;
  }
  return (
    <div className="video-player-page">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.snippet.title}
          frameBorder="0"
          allowFullScreen
          className="video-iframe"
        />
      </div>
      <div className="video-details">
        <h1 className="video-title">{video.snippet.title}</h1>
        <p className="video-stats">
          {parseInt(video.statistics.viewCount).toLocaleString()} views
        </p>
        <p className="channel-name">{video.snippet.channelTitle}</p>
        <p className="video-description">{video.snippet.description}</p>
      </div>
    </div>
  );
}
export default VideoPlayer;
