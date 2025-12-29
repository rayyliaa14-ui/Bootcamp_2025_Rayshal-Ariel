import { useCallback, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import SearchBar from "../../components/ui/search";

const MyApp = () => {
  const [images, setImages] = useState([]); //useState buat image
  const [searchKeyword, setSearchKeyword] = useState(""); //state untuk search keyword
  const [currentPage, setCurrentPage] = useState(1); //state untuk halaman sekarang
  const [isLoading, setLoading] = useState(false); //state untuk loading
  const [hasMore, setHasMore] = useState(true); // state untuk jumlah data/image (by default true)

  const observer = useRef(); //penanda gambar terakhir

  const fetchImage = async (keyword, pageNum) => {
    if (!searchKeyword) return; //kalo user submit tanpa nulis apapun, return!
    setLoading(true);
    const response_Image = await axios.get("/search/photos", {
      params: {
        query: keyword,
        page: pageNum,
        per_page: 10,
      },
    });
    const newImage = response_Image.data.results;
    console.log(`Halaman ${pageNum}: ${newImage.length} gambar`);

    if (pageNum === 1) {
      setImages(newImage);
    } else {
      setImages((prev) => [...prev, ...newImage]);
    }
    setHasMore(newImage.length > 0);
    setLoading(false);
  };

  const onSearchSubmit = async (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
    setImages([]);
    setHasMore(true);
  };

  const lastImageReference = useCallback(
    (node) => {
      if (isLoading) return; //balikeun mun ker loading

      if (observer.current) observer.current.disconnect(); //reset reference heula

      observer.current = new IntersectionObserver((entry) => {
        //mun gambar jeng data sami aya set heula page nu harep
        if (entry[0].isIntersecting && hasMore) {
          console.log("data recieved... load more data");
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node); //nyien data pang akhirna
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (!searchKeyword) return;
    fetchImage(searchKeyword, currentPage);
  }, [searchKeyword, currentPage]);

  return (
    <div className="ui-containers">
      <h1>Pinterest Clone</h1>
      <SearchBar onSubmit={onSearchSubmit} />
      <p>total gambar : {images.length}</p>

      <div className="image-container">
        {images.map((image, index) => {
          const isLastImage = index === images.length - 1;
          return (
            <div
              className="ImageCard"
              key={image.id}
              ref={isLastImage ? lastImageReference : null}
            >
              <Link to={`/photo/${image.id}`}>
                <img src={image.urls.small} alt={image.description} />
                <p>{image.description || " "}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyApp;
