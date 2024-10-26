
import React from "react";
import "./style/App.css";
import './Components/JS/Header.js';
import Home from "./Components/JS/Home.js";
import SearchPage from "./Components/JS/SearchPage.js";
import SearchBar from "./Components/JS/SearchBar.js";
import Header from "./Components/JS/Header.js";
import SearcherUserPage from "./Components/JS/ServiceUserPage.js";
import Landing from "./Components/JS/Landing.js";

function App() {
  const [searched, setterSearched] = React.useState(false);
  const [backhome, setterBackhome] = React.useState(true);
  const [authentication, setterAuth] = React.useState(false);
  const [searchedValue, setSearchValue] = React.useState("search");
  const [signedin, settersignedin] = React.useState(false);
  const [svp, setterServicePage] = React.useState(false);
  const [address, setterAddress] = React.useState("none");
  const [paymentOpen, setterPayment] = React.useState(false);
  const [UserReviewStatus, setURS] = React.useState(false);
  const userOrcon = false;  //cookie here true if contractor
  const someuserid = "";

  const setServicePage = () =>{setterServicePage(true);};
  const resetcon = ()=>{setterServicePage(false);};
  const setsignin = () =>{settersignedin(true);};
  const resetSearched = () =>{setterSearched(false);};
  const setHome = () =>{setterBackhome(true);};
  const resetBackHome = () =>{setterBackhome(false);};
  const setSearched = () => {
    setterSearched(true); 
    setterBackhome(false);
};
  const setAuth = () =>{setterAuth(true);};
  const resetAuth = () =>{setterAuth(false);};
  const setPayment = () =>{setterPayment(true);};
  const resetPayment = () =>{setterPayment(false);};
  const resetUserReview = () =>{setURS(false);};
  const setUserReview = () =>{setURS(true);};

  return (
    <div>
    {/*<FastCube/>*/}
    <Header setHome={setHome} setAuth={setAuth} resetAuth ={resetAuth} resetBackHome={resetBackHome} searched={searched} resetSearched ={resetSearched} settersignedin={setsignin} signedin={signedin} setServicePage={setServicePage} resetcon={resetcon} userOrcon={userOrcon} resetPayment={resetPayment}/>
    {!userOrcon && !svp && backhome && <Home authentication={authentication} backhome={backhome} setSearched={setSearched} setSearchValue={setSearchValue} setterAddress={setterAddress}/>} 
    {!userOrcon && !svp && authentication && <SearchBar searched={searchedValue} onSearchSubmit={setSearched} setSearchValue ={setSearchValue}/>}
    {!userOrcon && !svp && searched && <SearchPage searched = {searchedValue} authentication={authentication} someuserid={someuserid} address={address}/>}
    {!userOrcon && svp && <SearcherUserPage setHome={setHome} backhome={backhome} resetcon={resetcon} someuserid={someuserid} paymentOpen={paymentOpen} 
    setPayment={setPayment} resetPayment={resetPayment} UserReviewStatus={UserReviewStatus} setUserReview={setUserReview} resetUserReview={resetUserReview}/>}
    {userOrcon && <Landing/>}
    </div>
  );
}

export default App;


/*

  


   */