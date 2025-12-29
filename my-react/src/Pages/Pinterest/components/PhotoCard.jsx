import { Link } from "react-router-dom";
import "./PhotoCard.css";

const PhotoCard = ({ photo }) => {
    return (
        <div className="PhotoCard">
            <Link to={`/photo/${photo.id}`}>
                <img src={photo.urls.small} alt={photo.description || "Photo"} />
            </Link>
            {photo.user && <p className="author">by {photo.user.name}</p>}
        </div>
    );
};

export default PhotoCard;
