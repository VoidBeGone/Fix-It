import React from "react";
import "../style/header.css";
import MenuPopOut from "./MenuPopOut.js";

import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js";

function Header({backHome,setAuth, resetAuth}) {
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
        setterLogin(true);
        setterSignin(false);
        setAuth();  
    };

    const resetLogin = () =>{
        setterLogin(false);
        resetAuth();
    };

    const setSignUp = () =>{
        setterLogin(false);
        setterSignin(true);
        setAuth(); 
    };

    const resetSignUp = () =>{
        setterSignin(false);
        resetAuth();
    };

    const returnBack = () =>{
        backHome();
        resetLogin();
        resetSignUp();
    }

    return (
        <div>
            {login && <SignInForm resetLogin = {resetLogin}/>}
            {signin && <SignUpForm resetSignup = {resetSignUp}/>}
            {popOutClicked && <MenuPopOut resetPopOut={resetPopOut} login = {login} signin = {signin} setLogin = {setLogin} resetLogin = {resetLogin} setSignup = {setSignUp} resetSignUp = {resetSignUp}/>}
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
