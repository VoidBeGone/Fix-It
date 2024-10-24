
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Header from "./Components/JS/Header.js";
import Home from "./Components/JS/Home.js";
import SearchPage from "./Components/JS/SearchPage.js";
import SearchBar from "./Components/JS/SearchBar.js";
import FastCube from "./Components/JS/FastCube.js";
function App() {
  const [searched, setSearched] = React.useState(false);

  const handleSearchSubmit = () => {
    setSearched(!searched); // Set searched to true when search is submitted
  };

  return (
    <div>
      <FastCube/>
      <Header/>
      {!searched && <Home/>}
     <SearchBar searched="hello" onSearchSubmit={handleSearchSubmit} />
      {searched && <SearchPage searched = "hello"/>}
    </div>
  );
}

export default App;
