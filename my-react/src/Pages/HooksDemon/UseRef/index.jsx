import Span from "../../../components/views/span";
import Timer from "./timer";
import SimpleRef from "./simple";
import PreviousCount from "./previous";
import Flag from "./flag";

const UseRef = () => {
  return (
    <div className="usestate-body">
      <Span />
      <div className="usestate-container">
        <Timer />
        <SimpleRef />
        <PreviousCount />
        <Flag />
      </div>
    </div>
  );
};
export default UseRef;
