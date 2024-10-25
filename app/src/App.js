
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Header from "./Components/JS/Header.js";
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

function App() {
  const [searched, setSearched] = React.useState(false);

  const handleSearchSubmit = () => {
    setSearched(!searched); // Set searched to true when search is submitted
  };

  return (
    // <div>
    //   <FastCube/>
    //   <Header/>
    //   {!searched && <Home/>} 
    //  <SearchBar searched="hello" onSearchSubmit={handleSearchSubmit} />
    //   {searched && <SearchPage searched = "hello"/>}
    // </div>

    // <div>
    //   <SignInHeader/>
    //   <SignInForm/>
    // </div>
    
    // <div>
    //   <SignUpHeader/>
    //   <SignUpForm/>
    // </div>
    <div>
      <ProfileHeader/>
      <ProfileForm/>
    </div>
  );
}

export default App;
