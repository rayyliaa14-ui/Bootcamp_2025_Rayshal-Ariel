import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const getPopularVideos = async (pageToken = "") => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet,statistics",
      chart: "mostPopular",
      regionCode: "ID",
      maxResults: 12,
      pageToken: pageToken, // untuk infinite scroll
      key: API_KEY,
    },
  });
  return {
    items: response.data.items,
    nextPageToken: response.data.nextPageToken || null,
  };
};

const searchVideo = async (keyword, pageToken = "") => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      q: keyword,
      type: "video",
      maxResults: 12,
      pageToken: pageToken,
      key: API_KEY,
    },
  });
  return {
    items: response.data.items,
    nextPageToken: response.data.nextPageToken || null,
  };
};

const getVideoDetail = async (videoId) => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet,statistics",
      id: videoId,
      key: API_KEY,
    },
  });
  return response.data.items[0];
};

export { getPopularVideos, searchVideo, getVideoDetail };
