import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import "./PhotoDetail.css";

const PhotoDetail = () => {
  const [image, setImage] = useState(null);
  const [relatedImage, setRelatedImage] = useState([]);
  const [relatedKey, setRelatedKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();
  const observer = useRef();

  useEffect(() => {
    //fetching jeung detail image
    const fetch_detailImage = async () => {
      const getImageResult = await axios.get(`/photos/${id}`);
      const imageResult = getImageResult.data;
      setImage(imageResult);
      if (
        imageResult.related_collections.results &&
        imageResult.related_collections.results.length > 0
      ) {
        // console.log(imageResult.related_collections.results[0].title);
        setRelatedKey(imageResult.related_collections.results[0].title);
        setCurrentPage(1);
        setRelatedImage([]);
      }
    };
    fetch_detailImage();

    if (!relatedKey) return;
  }, [id]);

  useEffect(() => {
    //fetching jeung gambar lain
    if (!relatedKey) return;
    const fetch_anotherImage = async () => {
      setIsLoading(true);
      const response_anotherImage = await axios.get("/search/photos", {
        params: {
          query: relatedKey,
          page: currentPage,
          per_page: 10,
        },
      });
      const new_anotherImage = response_anotherImage.data.results;

      console.log(new_anotherImage + " - ");

      if (currentPage === 1) {
        setRelatedImage(new_anotherImage);
      } else {
        setRelatedImage((prev) => [...prev, ...new_anotherImage]);
      }
      setHasMore(new_anotherImage.length > 0);
      setIsLoading(false);
    };
    fetch_anotherImage();
  }, [relatedKey, currentPage]);

  const lastImageRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting && hasMore) {
          console.log("data recieved, load more!!");
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  if (!image) {
    return <p>Loading...</p>;
  }
  //   console.log(relatedImage);
  console.log("Keyword:", relatedKey);
  return (
    <div className="ui-containers">
      <h1>Detail image</h1>
      <div className="first-image">
        <div className="image-sect">
          <img src={image.urls.small} alt="" />
        </div>
        <div className="bio-sect">
          <div className="title-sect">
            <h1>{image.description}</h1>
          </div>
          <div className="desc-sect">
            <h2>by : {image.user.name}</h2>
          </div>
          <div className="interact-sect">
            <p>
              <i class="fa-solid fa-heart">{image.likes}</i>
            </p>
          </div>
        </div>
      </div>

      <div className="image-container">
        {relatedImage.map((image, index) => {
          const isLastImage = index === relatedImage.length - 1;
          return (
            <div
              key={image.id}
              ref={isLastImage ? lastImageRef : null}
              className="ImageCard"
            >
              <Link to={`/photo/${image.id}`}>
                <img src={image.urls.small} alt={image.description} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoDetail;
