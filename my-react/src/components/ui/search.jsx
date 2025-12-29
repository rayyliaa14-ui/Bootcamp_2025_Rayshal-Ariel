import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [searchKey, setSearchKey] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(searchKey);
    onSubmit(searchKey);
    console.log(onSubmit);
  };

  return (
    <div className="ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>Image Search</label>
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
