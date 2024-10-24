
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Home from "./Components/JS/Home.js";
import SearchPage from "./Components/JS/SearchPage.js";
import SearchBar from "./Components/JS/SearchBar.js";
import FastCube from "./Components/JS/FastCube.js";

import SignInHeader from "./Components/JS/SignInHeader.js"
import SignInForm from "./Components/JS/SignInForm.js"
import SignUpHeader from "./Components/JS/SignUpHeader.js";
import SignUpForm from "./Components/JS/SignUpForm.js";
import Header from "./Components/JS/Header.js";

function App() {
  const [searched, setterSearched] = React.useState(false);
  const [backhome, setterBackhome] = React.useState(true);

  const setSearched = () => {
    setterSearched(true); // Set searched to true when search is submitted
    setterBackhome(false);
  };
  const resetSearch = () =>{
    setterSearched(false);
    setterBackhome(true);
  };

  return (
    // <div>
    //   <FastCube/>
    //   <Header/>
    //   {!searched && <Home/>} 
    //  <SearchBar searched="hello" onSearchSubmit={handleSearchSubmit} />
    //   {searched && <SearchPage searched = "hello"/>}
    // </div>

    <div>
    <FastCube/>
    <Header backHome = {resetSearch}/>
    {backhome && <Home/>} 
   <SearchBar searched="hello" onSearchSubmit={setSearched} />
    {searched && <SearchPage searched = "hello"/>}
    <SignInHeader/>
    <SignInForm/>
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