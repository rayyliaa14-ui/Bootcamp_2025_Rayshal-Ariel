import React from "react";
import CommentItem from "./commentItem";
import { faker } from "@faker-js/faker";

class Comment extends React.Component {
  state = {
    commentList: [
      {
        name: "Ray",
        text: "Kelass King!!",
        date: "Today at 10.30AM",
        img: faker.image.avatar(),
      },
      {
        name: "Sal",
        text: "Madep Madodet!!",
        date: "Today at 10.35AM",
        img: faker.image.avatar(),
      },
      {
        name: "Ariel",
        text: "Keren Masbroo!!",
        date: "Today at 11.00AM",
        img: faker.image.avatar(),
      },
    ],
  };

  render() {
    return (
      <div className="ui container comments">
        {this.state.commentList.map((item, index) => (
          <CommentItem
            key={index}
            img={item.img}
            name={item.name}
            date={item.date}
            comment={item.text}
          />
        ))}
      </div>
    );
  }
}

export default Comment;
