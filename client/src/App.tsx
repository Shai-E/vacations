import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import GuestMenu from "./containers/GuestMenu/GuestMenu";
import Layout from "./containers/Layout/Layout";
import { getAllVacations, syncAllVacations } from "./store/actions/vacationsActions";
import io from "socket.io-client";
import { UserModel } from "./models/UserModel";
import { RootState } from "./store/store";

const socket = io("http://localhost:5000");

function App() {
    const user: UserModel = useSelector((state: RootState) => state.user);
    const message: string = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch();
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(`${localStorage.getItem("dark")}`) || false);

    useEffect(() => {
        if (user.isLoggedIn) dispatch(getAllVacations());
        socket.on("data-remote-changes", (userId: string, ops: string) => {
            if (user.id !== +userId) {
                dispatch(syncAllVacations(JSON.parse(ops)));
            }
        });
    }, [dispatch, user.id, user.isLoggedIn]);

    //

    useEffect(() => {
        if(localStorage.getItem("dark")) {
            const initDarkToggel = JSON.parse(`${localStorage.getItem("dark")}`)
            const darkCheckbox: HTMLInputElement = document.querySelector("#dark-toggle")!;
            if(darkCheckbox) darkCheckbox.checked = initDarkToggel;
        }
        if(isDarkMode){
            document.body.className = "dark";
        } else {
            document.body.className = "";
        }
    }, [isDarkMode])
    //

    return (
        <div className="App noselect">
            {user.isLoggedIn ? <Layout dark={{isDarkMode, setIsDarkMode}} /> : <GuestMenu />}
            {message ? <span className="site-message">{message}</span> : null}
        </div>
    );
}

export default App;
