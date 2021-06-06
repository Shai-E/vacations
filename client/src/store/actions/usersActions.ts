import axios from "axios";
import { setAccessToken } from "../../accessToken";
import { UserModel } from "../../models/UserModel";
import { displayMsg } from "../actionTypes/messagesActionTypes";
import { login, logout } from "../actionTypes/usersActionTypes";
import { AppDispatch } from "../store";
import { removeMessage } from "./messagesActions";
const requestPath = "http://localhost:5000/api/users";

export const updateToken = async () => {
    try {
        const response = await axios.get(`${requestPath}/token`, { withCredentials: true });
        const token = response.data.accessToken;
        setAccessToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
        console.log(err.response.data.message);
    }
};

const setUserForLogin = (user: UserModel) => {
    user.isLoggedIn = true;
    localStorage.setItem("userInfo", JSON.stringify(user));
    setAccessToken(user.accessToken!);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`;
    return user;
};

export const loginUser = (data: UserModel) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(`${requestPath}/login`, data, { withCredentials: true });
        const user = setUserForLogin(response.data);
        dispatch(login(user));
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const logoutUser = (data: string) => async (dispatch: AppDispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("dark");
    document.body.className = "";
    setAccessToken("");
    dispatch(logout());
    await axios.post(`${requestPath}/logout`, data, { withCredentials: true });
    delete axios.defaults.headers.common["Authorization"];
};

export const registerUser = (data: UserModel) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(`${requestPath}/`, data, { withCredentials: true });
        const user = setUserForLogin(response.data.userData);
        dispatch(login(user));
        dispatch(displayMsg(response.data.message));
        removeMessage(dispatch);
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};
