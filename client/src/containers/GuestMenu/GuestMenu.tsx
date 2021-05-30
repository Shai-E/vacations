import { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./GuestMenu.css";

function GuestMenu() {
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 800);

    const validateScreenSize = () => {
        if (window.innerWidth < 800) {
            setIsScreenSmall(true);
        } else {
            setIsScreenSmall(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", validateScreenSize);
        return () => {
            window.removeEventListener("resize", validateScreenSize);
        };
    }, []);

    useEffect(() => {
        if (!isScreenSmall) {
            const signUpButton = document.getElementById("signUp");
            const signInButton = document.getElementById("signIn");
            const container = document.getElementById("GuestMenu");

            signUpButton &&
                signUpButton.addEventListener("click", () => {
                    container && container.classList.add("right-panel-active");
                });

            signInButton &&
                signInButton.addEventListener("click", () => {
                    container && container.classList.remove("right-panel-active");
                });
        }
    }, [isScreenSmall]);

    return (
        <>
            {!isScreenSmall ? (
                <div className="GuestMenu" id="GuestMenu">
                    <div className="form-container sign-in-container">
                        <Login />
                    </div>
                    <div className="form-container sign-up-container">
                        <Register />
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn">
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="form-mobile-container">
                    <input type="checkbox" id="login-register-toggle" />
                    <label htmlFor="login-register-toggle" className="login-register-label ghost"></label>
                    <div className="form-mobile-display login">
                        <Login />
                    </div>
                    <div className="form-mobile-display register">
                        <Register />
                    </div>
                </div>
            )}
        </>
    );
}

export default GuestMenu;
