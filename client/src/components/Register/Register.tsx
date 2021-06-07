import { useEffect, useRef, useState } from "react";
import "./Register.css";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/usersActions";
import axios from "axios";
import { IRegister } from "../../interfaces/IRegister";

const Register = ():JSX.Element => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const [usernames, setUsernames] = useState<string[]>([]);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    useEffect(() => {
        const getAllUsernames = async ():Promise<void> => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/users/usernames");
                setUsernames(data);
            } catch (err) {
                console.log(err);
            }
        };
        getAllUsernames();
    }, []);

    const submit = (data: IRegister):void => {
        delete data.confirmPassword;
        dispatch(registerUser(data));
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Create Account</h2>
            <input
                type="text"
                placeholder="Username"
                onKeyUp={(e) => {
                    e.preventDefault();
                    const currUsername: string = e.currentTarget.value;
                    if (usernames.includes(currUsername)) {
                        setIsUsernameTaken(true);
                        document.querySelector("#register-btn")?.setAttribute("disabled", "true");
                        return;
                    }
                    setIsUsernameTaken(false);
                    document.querySelector("#register-btn")?.removeAttribute("disabled");
                }}
                {...register("username", {
                    required: "Username is required.",
                    minLength: { value: 6, message: "Use at least 6 characters for username." },
                })}
            />
            <input
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: "First name is required." })}
            />
            <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required." })}
            />
            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: "Password is required.",
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                            "Password must containt at least 8 charaacters: uppercase, lowercase, numeric and special.",
                    },
                })}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                    required: "Retype your password",
                    validate: (value) => value === password.current || "The passwords don't match",
                })}
            />
            <button id="register-btn">Register</button>
            {errors.username ||
            errors.firstName ||
            errors.lastName ||
            errors.password ||
            errors.confirmPassword ||
            isUsernameTaken ? (
                <div className="errors">
                    <ul>
                        <u>Fix these and you're good to go:</u>
                        {isUsernameTaken && <li>Username is already in use</li>}
                        {errors.username && <li>{errors.username.message}</li>}
                        {errors.firstName && <li>{errors.firstName.message}</li>}
                        {errors.lastName && <li>{errors.lastName.message}</li>}
                        {errors.password && <li>{errors.password.message}</li>}
                        {errors.confirmPassword && <li>{errors.confirmPassword.message}</li>}
                    </ul>
                </div>
            ) : null}
        </form>
    );
};

export default Register;
