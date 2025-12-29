import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import PhotoCard from "./components/PhotoCard";
import { getPopularPhotos, searchPhotos } from "../../api/pinterest_api";
import "./index.css";

const Pinterest = () => {
  const observer = useRef();

  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = async (keyword = "", page = 1, isNewSearch = false) => {
    if (isLoading) return;

    try {
      setLoading(true);

      let result;
      if (keyword) {
        result = await searchPhotos(keyword, page);
      } else {
        result = await getPopularPhotos(page);
      }

      const newPhotos = result.items;

      if (isNewSearch || page === 1) {
        setPhotos(newPhotos);
      } else {
        setPhotos((prev) => [...prev, ...newPhotos]);
      }

      setHasMore(result.hasMore);
    } catch (error) {
      console.log("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  //pertama kali render
  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPhotos([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchPhotos(keyword, 1, true);
  };

  const loadMore = () => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPhotos(searchKeyword, nextPage, false);
    }
  };

  const lastPhotoRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, currentPage, searchKeyword]
  );

  return (
    <div className="Pinterest">
      <Navbar onSearch={handleSearch} />

      {isLoading && photos.length === 0 && (
        <p className="loading">Loading...</p>
      )}

      <div className="photo-feed">
        {photos.map((photo, index) => {
          const isLast = index === photos.length - 1;
          return (
            <div ref={isLast ? lastPhotoRef : null} key={photo.id}>
              <PhotoCard photo={photo} />
            </div>
          );
        })}
      </div>

      {isLoading && photos.length > 0 && (
        <p className="loading-more">Loading more...</p>
      )}

      {!hasMore && photos.length > 0 && (
        <p className="end-message">No more photos </p>
      )}
    </div>
  );
};

export default Pinterest;
