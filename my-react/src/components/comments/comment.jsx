import React from "react";
import CommentItem from "./commentItem";
import { faker } from "@faker-js/faker";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [
        {
          name: "ray",
          img: faker.image.avatar(),
          text: "Wassup masbro",
          date: "Senin 15-12-25 at 10:00PM",
        },
        {
          name: "sal",
          img: faker.image.avatar(),
          text: "Keren!!",
          date: "Rabu 17-12-25 at 6:00PM",
        },
        {
          name: "ariel",
          img: faker.image.avatar(),
          text: "Kelas King",
          date: "Jumat 19-12-25 at 8:00PM",
        },
      ],
    };
  }
  render() {
    return (
      <div className="ui container comments">
        {this.state.commentList.map((item, index) => (
          <CommentItem
            key={index}
            name={item.name}
            img={item.img}
            comment={item.text}
            time={item.date}
          />
        ))}
      </div>
    );
  }
}
export default Comment;
