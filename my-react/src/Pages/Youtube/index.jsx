import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { getPopularVideos, searchVideo } from "../../api/youtube_api";
import VideoCard from "./VideoCard";
import "./index.css";

const Youtube = () => {
  const observer = useRef();

  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); // track search keyword
  const [nextPageToken, setNextPageToken] = useState(null); // untuk pagination
  const [hasMore, setHasMore] = useState(true); // masih ada data?

  // Fetch videos (support both popular & search)
  const fetchVideos = async (
    keyword = "",
    pageToken = "",
    isNewSearch = false
  ) => {
    if (isLoading) return;

    try {
      setLoading(true);

      let result;
      if (keyword) {
        result = await searchVideo(keyword, pageToken);
      } else {
        result = await getPopularVideos(pageToken);
      }

      const newVideos = result.items;
      console.log(`Loaded ${newVideos.length} videos`);

      if (isNewSearch || pageToken === "") {
        setVideos(newVideos);
      } else {
        setVideos((prev) => [...prev, ...newVideos]);
      }

      setNextPageToken(result.nextPageToken);
      setHasMore(result.nextPageToken !== null);
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load - popular videos
  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle search
  const handleSearch = async (keyword) => {
    setSearchKeyword(keyword);
    setVideos([]); // clear videos
    setNextPageToken(null); // reset token
    setHasMore(true);
    fetchVideos(keyword, "", true); // new search
  };

  // Load more videos (for infinite scroll)
  const loadMoreVideos = () => {
    if (hasMore && nextPageToken && !isLoading) {
      fetchVideos(searchKeyword, nextPageToken, false);
    }
  };

  // Intersection Observer
  const lastVideoRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreVideos();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, nextPageToken, searchKeyword]
  );

  return (
    <div className="Home">
      <Navbar onSearch={handleSearch} />

      {/* Loading initial */}
      {isLoading && videos.length === 0 && (
        <p className="loading">Loading...</p>
      )}

      <div className="video-feed">
        {videos.map((vid, index) => {
          const isLastVideo = index === videos.length - 1;
          return (
            <div
              ref={isLastVideo ? lastVideoRef : null}
              key={vid.id.videoId || vid.id}
            >
              <VideoCard get_video={vid} />
            </div>
          );
        })}
      </div>

      {/* Loading more */}
      {isLoading && videos.length > 0 && (
        <p className="loading-more">Loading more...</p>
      )}

      {/* No more data */}
      {!hasMore && videos.length > 0 && (
        <p className="end-message">No more videos 🎬</p>
      )}
    </div>
  );
};

export default Youtube;
