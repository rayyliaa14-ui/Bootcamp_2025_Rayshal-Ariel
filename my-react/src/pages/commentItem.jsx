import React from "react";

class CommentItem extends React.Component {
  render() {
    const { img, name, date, comment } = this.props;

    return (
      <div className="comment">
        <a className="avatar">
          <img src={img} alt="avatar" />
        </a>

        <div className="content">
          <a className="author">{name}</a>
          <div className="metadata">
            <span className="date">{date}</span>
          </div>
          <div className="text">{comment}</div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
