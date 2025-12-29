import React from "react";

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    const { name, img, comment, time } = this.props;
    return (
      <div className="comment">
        <a className="avatar">
          <img src={img} alt="avatar" />
        </a>
        <div className="content">
          <a className="author">{name}</a>
          <div className="metadata">
            <span className="date">{time} | </span>
          </div>
          <i className="fa-solid fa-thumbs-up"></i> {this.state.count}
          <div className="text">{comment}</div>
          <button
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            Like
          </button>
        </div>
      </div>
    );
  }
}

export default CommentItem;
