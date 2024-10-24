import React from "react";
import "../style/header.css";


function Header() {
    return (
        <div className="Header">
            <div className="HeaderLeft">
                <div className="headerMenu"></div>
                <div className="headerTitle">Fix-It</div>
            </div>

            <div className="HeaderRight">
                <div className="headerLogin"></div>
                <div className="headerSignUp">SignUp</div>
            </div>
        </div>
    );
}

export default Header;
