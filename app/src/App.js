
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Home from "./Components/JS/Home.js";
import SearchPage from "./Components/JS/SearchPage.js";
import SearchBar from "./Components/JS/SearchBar.js";
import Header from "./Components/JS/Header.js";
import SearcherUserPage from "./Components/JS/ServiceUserPage.js";



function App() {
  const [searched, setterSearched] = React.useState(false);
  const [backhome, setterBackhome] = React.useState(true);
  const [authentication, setterAuth] = React.useState(false);
  const [searchedValue, setSearchValue] = React.useState("search");
  const [signedin, settersignedin] = React.useState(false);
  const [userOrcon, setterUserOrCon] = React.useState(false);

  const setcon = () =>{
    setterUserOrCon(true);
  };
  const resetcon = ()=>{
    setterUserOrCon(false);
  }
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
    setterSearched(true); 
    setterBackhome(false);
  };
  const setAuth = () =>{
    setterAuth(true);
  };

  const resetAuth = () =>{
    setterAuth(false);
  };


  return (
    <div>
    {/*<FastCube/>*/}
    <Header setHome={setHome} setAuth={setAuth} resetAuth ={resetAuth} resetBackHome={resetBackHome} searched={searched} resetSearched ={resetSearched} settersignedin={setsignin} signedin={signedin} setcon={setcon} resetcon={resetcon} />
    {!userOrcon && backhome && <Home authentication={authentication} backhome={backhome} setSearched={setSearched} setSearchValue={setSearchValue}/>} 
    {!userOrcon && authentication && <SearchBar searched={searchedValue} onSearchSubmit={setSearched} setSearchValue ={setSearchValue}/>}
    {!userOrcon && searched && <SearchPage searched = {searchedValue} authentication={authentication}/>}
    {userOrcon && <SearcherUserPage setHome={setHome} backhome={backhome} resetcon={resetcon}/>}
    </div>

  );
}

export default App;


/*

  


   */