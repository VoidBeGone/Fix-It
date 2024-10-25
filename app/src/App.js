
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
import ProfileHeader from "./Components/JS/ProfileHeader.js";
import ProfileForm from "./Components/JS/ProfileForm.js"
import Payment from "./Components/JS/Payment.js"; 
import UserReview from "./Components/JS/UserReview.js";
import ConstructorReview from "./Components/JS/ConstructorReview.js";


import Header from "./Components/JS/Header.js";

function App() {
  const [searched, setterSearched] = React.useState(false);
  const [backhome, setterBackhome] = React.useState(true);
  const [authentication, setterAuth] = React.useState(false);
  const [searchedValue, setSearchValue] = React.useState("search");
  
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

    // <div>
    //   <SignInHeader/>
    //   <SignInForm/>
    // </div>
    

  return (
    <div>
    <FastCube/>
    <Header setHome={setHome }setAuth={setAuth} resetAuth ={resetAuth} resetBackHome={resetBackHome} searched={searched} resetSearched ={resetSearched}/>
    {backhome && <Home authentication={authentication}/>} 
    {!authentication && <SearchBar searched={searchedValue} onSearchSubmit={setSearched} setSearchValue ={setSearchValue}/>}
    {searched && <SearchPage searched = {searchedValue} authentication={authentication}/>}
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