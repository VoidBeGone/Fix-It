import React from "react";
import "../style/SignUpForm.css";


function SignUpForm({resetSignup}) {
    const modelRef = React.useRef();
    
    React.useEffect(()=>{
        const onClick = (event) =>{
            if (modelRef && !modelRef.current.contains(event.target)){
                resetSignup();
            }
        };
        document.addEventListener("mousedown", onClick);

        return() =>{
            document.removeEventListener("mousedown", onClick);
        };
    },[resetSignup]);

    return (
        <div className="SignUpContainer">
            <div className="SignUpBox" ref={modelRef}>
                <h2>Sign Up</h2>
                <form action="/signUp" onSubmit={resetSignup}>
                    <div className="SignUpInput">
                        <label for="fName">First Name</label>
                        <input type="text" id="fName" name="fName" required></input>
                    </div>

                    <div className="SignUpInput">
                        <label for="lName">Last Name</label>
                        <input type="text" id="lName" name="lName" required></input>
                    </div>

                    <div className="SignUpInput">
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" required></input>
                    </div>
 
                    <div className="SignUpInput">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required></input>
                    </div>

                    <div className="SignUpInput">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required></input>
                    </div>

                    <div className="SignUpInput">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required></input>
                    </div>

                    <button type="submit" className="SignUpBtn">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
