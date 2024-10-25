import React from "react";
import "../style/SignInForm.css";
import {gsap} from "gsap";

function SignInForm({resetLogin}) {
    const modelRef = React.useRef();
    React.useEffect(()=>{
        const timeline = gsap.timeline();
        timeline.fromTo(
            modelRef.current,
            { opacity: 0, scale: 0},
            { opacity: 1, scale:1, ease:"power2.out"},
        );
    });
    
    React.useEffect(()=>{
        const onClick = (event) =>{
            if (modelRef && !modelRef.current.contains(event.target)){
                resetLogin();
            }
        };
        document.addEventListener("mousedown", onClick);

        return() =>{
            document.removeEventListener("mousedown", onClick);
        };
    },[resetLogin]);

    return (
        <div className="SignInContainer" >
            <div className="SignInBox" ref={modelRef}>
                <h2>Sign In</h2>
                <form action="/signIn" onSubmit={resetLogin}>
                    <div className="SignInInput">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required></input>
                    </div>

                    <div className="SignInInput">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required></input>
                    </div>

                    <button type="submit" className="SignInBtn">Sign In</button>

                </form>
            </div>
        </div>
    );
}

export default SignInForm;
