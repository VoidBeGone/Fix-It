import React from "react";
import "../style/SignInForm.css";
import {gsap} from "gsap";

function SignInForm({resetLogin,settersignedin}) {
    const modelRef = React.useRef();

    const animateOut = (x) =>{
        gsap.to(modelRef.current,{opacity:0, scale:0.5, duration:0.5, ease:"sine.out"
            ,onComplete:x
        });
    };
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
                animateOut(()=>{
                    resetLogin();
                });

            }
        };
        document.addEventListener("mousedown", onClick);

        return() =>{
            document.removeEventListener("mousedown", onClick);
        };
    },[resetLogin]);

    const isignedin = () =>{
        settersignedin();
        resetLogin();
    };
    return (
        <div className="SignInContainer">
            <div className="SignInBox"ref={modelRef}>
                <h2>Sign In</h2>
                <form action="/signIn" onSubmit={isignedin}>
                    <div className="SignInInput">
                        <label htmlFor="email">Email</label> {/* Corrected here */}
                        <input type="email" id="email" name="email" required></input>
                    </div>

                    <div className="SignInInput">
                        <label htmlFor="password">Password</label> {/* Corrected here */}
                        <input type="password" id="password" name="password" required></input>
                    </div>

                    <button type="submit" className="SignInBtn">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignInForm;
