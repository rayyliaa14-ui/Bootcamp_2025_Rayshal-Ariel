import React, { useState } from "react";

const FormFunc = () => {
  const [firstName, setFirstNmae] = useState("");
  const [lastName, setLastName] = useState("");
  const [value, setValue] = useState({
    first: "",
    last: "",
  });

  const handleChange = (event) => {
    const { name, value: val } = event.target;
    setValue({
      ...value,
      [name]: val,
    });
  };

  const handleChange_firstName = () => {
    setFirstNmae(event.target.value);
  };
  const handleChange_lastName = () => {
    setLastName(event.target.value);
  };
  console.log(value.first + " - " + value.last);

  const handleSubmit = (event) => {
    alert("A name was submited is " + value.first + " " + value.last);
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          First Name :
          <input
            type="text"
            name="first"
            value={value.first}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name :
          <input
            type="text"
            name="last"
            value={value.last}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" value="submit" />
        <br />
        <br />
        <h2>Your name is : {firstName + " " + lastName}</h2>
      </form>
    </>
  );
};
export default FormFunc;
