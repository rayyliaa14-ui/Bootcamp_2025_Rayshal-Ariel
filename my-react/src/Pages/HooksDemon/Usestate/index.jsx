import React from "react";
import Span from "../../../components/views/span";
import Counter from "./Counter";
import Toggle from "./Toggle";
import FormInput from "./form";
import LoadingExample from "./loading";
import "./useState.css";

const UseState = () => {
  return (
    <div className="usestate-body">
      <Span />
      <div className="usestate-container">
        <Counter />
        <Toggle />
        <FormInput />
        <LoadingExample />
      </div>
    </div>
  );
};
export default UseState;
