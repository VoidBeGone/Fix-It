import React from "react";
import "../style/SearchBar.css";

export default function Searchbar({ searched, onSearchSubmit, setSearchValue }) {
  const [formValue, setFormValue] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchValue(formValue);
    
    onSearchSubmit();


    setFormValue(""); 
  };

  return (
    <div className="SearchBar">
      <div className="SearchBarContainerForm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="SearchBarContent"
            placeholder={searched}
            value={formValue} 
            onChange={(e) => setFormValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
