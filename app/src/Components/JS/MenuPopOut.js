import React from "react";
import "../style/MenuPopOut.css";

import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js";

export default function MenuPopOut({resetPopOut, login, signin, setLogin, resetLogin, setSignup, resetSignUp }) {
    const modelRef = React.useRef();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                resetPopOut();
            }
        };
        if(!login && !signin){
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [resetPopOut]);

    React.useEffect(()=>{
        if (login || signin){
            resetPopOut();
        }
    },[login, signin]);
    return (
        <div>
             {login && <SignInForm resetLogin = {resetLogin}/>}
             {signin && <SignUpForm resetSignup = {resetSignUp}/>}
             <div className="MenuPopOut" ref={modelRef}>
             <div className="MenuPopOutContainer">
                <div className="MPOSignIn" onClick={setSignup}>SignUp</div>
                <div className="MPOLogIn" onClick={setLogin}>LogIn</div>
                <div className="MPOHistory">History</div>
                <div className="MPOService">Services</div>
                <div className="MPOAddService">Add Service</div>
            </div>
            </div>
        </div>
    );
};
