
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Home from "./Components/JS/Home.js";
import SearchPage from "./Components/JS/SearchPage.js";
import SearchBar from "./Components/JS/SearchBar.js";
import Header from "./Components/JS/Header.js";
import SearcherUserPage from "./Components/JS/ServiceUserPage.js";

export function getId() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
}
export function isLoggedIn() {
  return getId() != '';
}

function App() {
  const [searched, setterSearched] = React.useState(false);
  const [backhome, setterBackhome] = React.useState(true);
  const [authentication, setterAuth] = React.useState(false);
  const [searchedValue, setSearchValue] = React.useState("search");
  const [signedin, settersignedin] = React.useState(false);
  const [svp, setterServicePage] = React.useState(false);
  const [userOrcon, setterUserOrCon] = React.useState(false); //cookie here true if contractor

  React.useEffect(() => {
    // Check if user is logged in on component mount
    if (isLoggedIn()) {
      setterAuth(true);
    }
  }, []);

  const setcon = () =>{
    setterUserOrCon(true);
  };
  const resetcon = ()=>{
    setterServicePage(false);
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
    <Header setHome={setHome} setAuth={setAuth} resetAuth ={resetAuth} resetBackHome={resetBackHome} searched={searched} resetSearched ={resetSearched} settersignedin={setsignin} signedin={signedin} setterServicePage={setterServicePage} resetcon={resetcon} userOrcon={userOrcon}/>
    {!userOrcon && !svp && backhome && <Home authentication={authentication} backhome={backhome} setSearched={setSearched} setSearchValue={setSearchValue}/>} 
    {!userOrcon && !svp && authentication && <SearchBar searched={searchedValue} onSearchSubmit={setSearched} setSearchValue ={setSearchValue}/>}
    {!userOrcon && !svp && searched && <SearchPage searched = {searchedValue} authentication={authentication}/>}
    {!userOrcon && svp && <SearcherUserPage setHome={setHome} backhome={backhome} resetcon={resetcon} someuserid={someuserid}/>}
    </div>
  );
}

export default App;


/*

  


   */