import React from "react";
import "../style/header.css";
import MenuPopOut from "./MenuPopOut.js";

function Header() {
    const [popOutClicked, setPopOutClicked] = React.useState(false);
    
    const setPopOut = () =>{
        setPopOutClicked(true);
    };
    const resetPopOut = () => {
        setPopOutClicked(false);
    };
    
    return (
        <div>
            {popOutClicked && <MenuPopOut resetPopOut={resetPopOut} />}

            <div className="Header">
                <div className="HeaderLeft">
                    <div className="headerMenu" onClick={setPopOut}></div>
                    <div className="headerTitle">Fix-It</div>
                </div>

                <div className="HeaderRight">
                    <div className="headerLogin"></div>
                    <div className="headerSignUp">SignUp</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
