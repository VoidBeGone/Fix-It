
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Home from "./Components/JS/Home.js";
import SearchPage from "./Components/JS/SearchPage.js";
import SearchBar from "./Components/JS/SearchBar.js";
import FastCube from "./Components/JS/FastCube.js";

import Header from "./Components/JS/Header.js";

function App() {
  const [searched, setterSearched] = React.useState(false);
  const [backhome, setterBackhome] = React.useState(true);
  const [authentication, setterAuth] = React.useState(false);

  const setSearched = () => {
    setterSearched(true); // Set searched to true when search is submitted
    setterBackhome(false);
  };
  const resetSearch = () =>{
    setterSearched(false);
    setterBackhome(true);
  };

  const setAuth = () =>{
    setterAuth(true);
  };
  
  const resetAuth = () =>{
    setterAuth(false);
  };


  return (
    <div>
    <FastCube/>
    <Header backHome = {resetSearch} setAuth={setAuth} resetAuth ={resetAuth}/>
    {backhome && <Home/>} 
    {!authentication && <SearchBar searched="" onSearchSubmit={setSearched} />}
    {searched && <SearchPage searched = "hello"/>}
  </div>

    // <div>
    //   <SignUpHeader/>
    //   <SignUpForm/>
    // </div>
    //sign-in
  );
}

export default App;


/*

   


   */