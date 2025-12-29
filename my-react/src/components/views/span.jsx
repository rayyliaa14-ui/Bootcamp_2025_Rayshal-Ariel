import "./span.css";

const Span = ({ text }) => {
  return (
    <>
      <div className="divider">
        <span>{text}</span>
      </div>
    </>
  );
};
export default Span;
