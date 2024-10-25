import React from "react";
import "../style/SearchBar.css";

export default function Searchbar({searched, onSearchSubmit,authentication}){
    const [formValue, setFormValue] = React.useState(searched);

    const handleSubmit = (event) =>{
        event.preventDefault();
        onSearchSubmit();
    };



    return(
        <div className="SearchBar">
             <div className="SearchBarContainerForm">
            <form onSubmit={handleSubmit}>
            <input type='text' 
            className="SearchBarContent" 
            placeholder={"Search"} 
            value = {formValue}
            onChange = {(e)=>setFormValue(e.target.value)}/>
            </form>
             </div>
        </div>
    );
}