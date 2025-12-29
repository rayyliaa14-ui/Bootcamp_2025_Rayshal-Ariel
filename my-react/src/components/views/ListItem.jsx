import React from "react";

class PracticeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    const { name, bio, button, link } = this.props;
    return (
      <div className="list-box">
        <div className="header">
          <p>{name}</p>
        </div>
        <div className="bio">
          <p>{bio}</p>
        </div>
        <div className="button">
          <a href={link}>
            <button>Get in touch!</button>
          </a>
        </div>
      </div>
    );
  }
}
export default PracticeItem;
