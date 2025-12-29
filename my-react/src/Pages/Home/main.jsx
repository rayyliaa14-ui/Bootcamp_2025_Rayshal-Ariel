import TextDisplay from "../../components/views/TextDisplay";
import Span from "../../components/views/span";
import List from "../../components/views/List";
import ApiBoxes from "../../components/api-box/apiBoxes";
import MyApp from "./fetchImage";
import "./main.css";

const Main = () => {
  return (
    <div className="ui main-container">
      <TextDisplay />
      <Span text="projects with hooks" />
      <List />
      <Span text="see more with API integrations" />
      <ApiBoxes />
      {/* <MyApp /> */}
    </div>
  );
};
export default Main;
