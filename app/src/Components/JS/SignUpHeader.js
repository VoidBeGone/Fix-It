import React from "react";
import "../style/SignUpHeader.css";


function SignUpHeader() {
    return (
        <div className="SignUpHeader">
            <div className="SignUpHeaderLeft">
                <div className="SignUpHeaderTitle">Fix-It</div>
            </div>

            <div className="SignUpHeaderRight">
                <div className="SignUpHeaderSignUp">Sign In</div>
            </div>
        </div>
    );
}

export default SignUpHeader;
