import React from "react";
import "../style/header.css";
import MenuPopOut from "./MenuPopOut.js";

import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js";

function Header({setHome, setAuth, resetAuth,resetBackHome, searched, resetSearched}) {
    const [popOutClicked, setPopOutClicked] = React.useState(false);
    const [login, setterLogin] = React.useState(false);
    const [signin, setterSignin] = React.useState(false);

    const setPopOut = () =>{
        setPopOutClicked(true);
    };
    const resetPopOut = () => {
        setPopOutClicked(false);
    };

    const setLogin = () => {
        if(!login){
        setterSignin(false);
        setterLogin(true);
        setPopOutClicked(false);
        setAuth();  
         }
    };

    const resetLogin = () =>{
        if(searched){
            resetBackHome();
        }
        setterLogin(false);
        resetAuth();
    };

    const setSignUp = () =>{
        if (!signin){
        setterLogin(false);
        setPopOutClicked(false);
        setterSignin(true);
        setAuth(); 
        }
    };

    const resetSignUp = () =>{
        setterSignin(false);
        resetAuth();
        if(searched){
            resetBackHome();
        }
    };

    const returnBack = () =>{
        resetSearched();
        resetLogin();
        resetSignUp();
        setHome();
    }

    return (
        <div>
            {login && <SignInForm resetLogin = {resetLogin}/>}
            {signin && <SignUpForm resetSignup = {resetSignUp}/>}
            {popOutClicked && <MenuPopOut resetPopOut={resetPopOut} setLogin = {setLogin} setSignup = {setSignUp}/>}
            <div className="Header">
                <div className="HeaderLeft">
                    <div className="headerMenu" onClick={setPopOut}></div>
                    <div className="headerTitle" onClick={returnBack}>Fix-It</div>
                </div>

                <div className="HeaderRight">
                    <div className="headerLogin" onClick = {setLogin}></div>
                    <div className="headerSignUp" onClick ={setSignUp}>SignUp</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
