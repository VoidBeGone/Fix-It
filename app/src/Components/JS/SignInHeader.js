import React from "react";
import "../style/SignInHeader.css";


function SignInHeader() {
    return (
        <div className="SignInHeader">
            <div className="SignInHeaderLeft">
                <div className="SignInHeaderTitle">Fix-It</div>
            </div>

            <div className="SignInHeaderRight">
                <div className="SignInHeaderSignUp">Sign Up</div>
            </div>
        </div>
    );
}

export default SignInHeader;
