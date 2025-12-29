import React from "react";
import PracticeItem from "./ListItem";
import "./List.css";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceList: [
        {
          header: "useState()",
          bio: "Mempelejari bagaimana penggunaaan usestate",
          button: "Get In Touch",
          link: "/usestate",
        },
        {
          header: "useRef()",
          bio: "Method menyimpan nilai tanpa re-render",
          button: "Get In Touch",
          link: "/useref",
        },
        {
          header: "useState()",
          bio: "Mempelejari bagaimana penggunaaan usestate",
          button: "Get In Touch",
        },
        {
          header: "useState()",
          bio: "Mempelejari bagaimana penggunaaan usestate",
          button: "Get In Touch",
        },
        {
          header: "useState()",
          bio: "Mempelejari bagaimana penggunaaan usestate",
          button: "Get In Touch",
        },
        {
          header: "useState()",
          bio: "Mempelejari bagaimana penggunaaan usestate",
          button: "Get In Touch",
        },
        {
          header: "useState()",
          bio: "Mempelejari bagaimana penggunaaan usestate",
          button: "Get In Touch",
        },
      ],
    };
  }
  render() {
    return (
      <div className="upperlist-container">
        <div className="list-container">
          {this.state.practiceList.map((item, index) => (
            <PracticeItem
              key={index}
              name={item.header}
              bio={item.bio}
              button={item.button}
              link={item.link}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default List;
