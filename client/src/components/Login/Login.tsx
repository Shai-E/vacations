import React from 'react';
import "./Login.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/usersActions";
import { UserModel } from "../../models/UserModel";

const Login:React.FC = ():JSX.Element => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const submit = (data: UserModel): void => {
        dispatch(loginUser(data));
    };
    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Sigh In</h2>
            <input type="text" placeholder="Username" {...register("username", { required: "Username is required" })} />
            {errors.username && errors.username.message}
            <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
            />
            <button>Log In</button>

            <div className="login-details">
                <span>Sign in as: <b>admin</b>, <b>user1</b> or <b>user2</b>. Password: <b>1234</b></span>
            </div>
        </form>
    );
};

export default Login;
