import React from "react";
import "../style/SignInForm.css";


function SignInForm() {
    return (
        <div className="SignInContainer">
            <div className="SignInBox">
                <h2>Sign In</h2>
                <form action="/signIn" method="POST">
                    <div className="SignInInput">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required></input>
                    </div>

                    <div className="SignInInput">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required></input>
                    </div>

                    <button type="submit" className="SignInBtn">Sign In</button>

                    <p className="signup-link">Don't have an account? <a href="/signup">Sign up here</a>.</p>
                </form>
            </div>
        </div>
    );
}

export default SignInForm;
