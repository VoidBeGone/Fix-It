import React from "react";
import "../style/header.css";
import MenuPopOut from "./MenuPopOut.js";

import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js";
import ProfileForm from "./ProfileForm.js";
import AddService from "./AddService.js";
function Header({setHome, setAuth, resetAuth,resetBackHome, searched, resetSearched,settersignedin,signedin, 
    setServicePage, resetcon, userOrcon, resetPayment}) {
    const [popOutClicked, setPopOutClicked] = React.useState(false);
    const [login, setterLogin] = React.useState(false);
    const [signin, setterSignin] = React.useState(false);
    const [profileUser, setterPU] = React.useState(false);
    const [addservice, setterAddService] = React.useState(false);
    const setService= ()=>{
        setterAddService(true);
    };
    const resetService = () =>{
        setterAddService(false);
    };
    const setPU = () =>{
        setterPU(true);
    };
    const resetPU = () =>{
        setterPU(false);
    };

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
        resetBackHome();
        }
    };

    const resetLogin = () =>{
        setterLogin(false);
        setHome();
    };

    const setSignUp = () =>{
        if (!signin){
        setterLogin(false);
        setPopOutClicked(false);
        setterSignin(true);
        resetBackHome();
        }
    };

    const resetSignUp = () =>{
        setterSignin(false);
        setHome();
    };

    const returnBack = () =>{
        resetSearched();
        resetLogin();
        resetSignUp();
        resetPayment();
        setHome();
    }

    return (
        <div>
            {profileUser && <ProfileForm resetPU={resetPU} setAuth={setAuth} />}
            {login && <SignInForm resetLogin = {resetLogin} settersignedin={settersignedin}  setAuth={setAuth} resetAuth={resetAuth} />}
            {signin && <SignUpForm resetSignup = {resetSignUp} settersignedin={settersignedin} setAuth={setAuth} resetAuth={resetAuth}/>}
            {popOutClicked && <MenuPopOut resetPopOut={resetPopOut} setLogin = {setLogin} setSignup = {setSignUp} setServicePage={setServicePage} resetcon={resetcon} resetBackHome={resetBackHome} setService={setService}/>}
            {addservice && userOrcon && <AddService resetService={resetService}/> }
            <div className="Header">
                <div className="HeaderLeft">
                    <div className="headerMenu" onClick={setPopOut}></div>
                    <div className="headerTitle" onClick={returnBack}>Fix-It</div>
                </div>

                <div className="HeaderRight">
                    {!signedin && <div className="headerLogin" onClick = {setLogin}>Login</div>}
                    {signedin && <div className="Logined" onClick = {setPU}></div>}
                    {!signedin && <div className="headerSignUp" onClick ={setSignUp}>SignUp</div>}
                </div>
            </div>
        </div>
    );
}

export default Header;
