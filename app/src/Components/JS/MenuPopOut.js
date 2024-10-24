import React from "react";
import "../style/MenuPopOut.css";

export default function MenuPopOut({ resetPopOut }) {
    const modelRef = React.useRef();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                resetPopOut();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [resetPopOut]);

    return (
        <div className="MenuPopOut" ref={modelRef}>
            <div className="MenuPopOutContainer">
                <div className="MPOSignIn">SignIn</div>
                <div className="MPOLogIn">LogIn</div>
                <div className="MPOHistory">History</div>
                <div className="MPOService">Services</div>
                <div className="MPOAddService">Add Service</div>
            </div>
        </div>
    );
};
