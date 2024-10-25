
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Home from "./Components/JS/Home.js";
import SearchPage from "./Components/JS/SearchPage.js";
import SearchBar from "./Components/JS/SearchBar.js";
import FastCube from "./Components/JS/FastCube.js";
import Header from "./Components/JS/Header.js";
import AddService from "./Components/JS/AddService.js";

function App() {
  const [searched, setterSearched] = React.useState(false);
  const [backhome, setterBackhome] = React.useState(true);
  const [authentication, setterAuth] = React.useState(false);
  const [searchedValue, setSearchValue] = React.useState("search");
  const [signedin, settersignedin] = React.useState(false);

  const setsignin = () =>{
    settersignedin(true);
  };
  const resetSearched = () =>{
    setterSearched(false);
  };
  const setHome = () =>{
    setterBackhome(true);
  };
  const resetBackHome = () =>{
    setterBackhome(false);
  }
  const setSearched = () => {
    setterSearched(true); // Set searched to true when search is submitted
    setterBackhome(false);
  };
  const setAuth = () =>{
    setterAuth(true);
  };

  const resetAuth = () =>{
    setterAuth(false);
  };


  return (
    // <div>
    // <FastCube/>
    // <Header setHome={setHome }setAuth={setAuth} resetAuth ={resetAuth} resetBackHome={resetBackHome} searched={searched} resetSearched ={resetSearched} settersignedin={setsignin} signedin={signedin}/>
    // {backhome && <Home authentication={authentication}/>} 
    // {!authentication && <SearchBar searched={searchedValue} onSearchSubmit={setSearched} setSearchValue ={setSearchValue}/>}
    // {searched && <SearchPage searched = {searchedValue} authentication={authentication}/>}
    // </div>

    <AddService/>
  );
}

export default App;


/*

   


   */