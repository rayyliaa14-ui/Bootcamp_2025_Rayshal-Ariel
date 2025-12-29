import { Link } from "react-router-dom";

const BoxList = ({ logo, header, description, link }) => {
  return (
    <div className="apiBox-wrapper">
      <div className="imgSect">
        <img src={logo} alt="" />
      </div>

      <div className="apiBox-bioSect">
        <div className="apiBox-headSect">
          <h1>{header}</h1>
        </div>

        <div className="apiBox-descSect">
          <p>{description}</p>
        </div>
      </div>

      <div className="apiBox-btnSect">
        <Link to={link} className="apiBox-btn">
          View Project
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default BoxList;
