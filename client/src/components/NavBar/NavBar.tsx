import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";
import { Link } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import FlightIcon from "@material-ui/icons/Flight";
import ExitToApp from "@material-ui/icons/ExitToApp";
import NightsStay from "@material-ui/icons/NightsStay";
import Brightness from "@material-ui/icons/Brightness4";
import { useEffect } from "react";
import { RootState } from "../../store/store";

function NavBar({ dark }: { dark: { isDarkMode: boolean; setIsDarkMode: Function } }) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        const darkCheckbox: HTMLInputElement = document.querySelector("#dark-toggle")!;
        darkCheckbox.checked = dark.isDarkMode;
    }, [dark.isDarkMode]);
    return (
        <div className="NavBar">
            <div className="links">
                <Link to="/vacations" className="linkIcon vacations-link">
                    <FlightIcon /> Vacations
                </Link>
                {user.isAdmin ? <Link to="/add-vacation">&#10010; Add Vacation</Link> : null}
                {user.isAdmin ? (
                    <Link to="/reports" className="linkIcon">
                        <BarChartIcon /> Reports
                    </Link>
                ) : null}
            </div>
            <div className="links">
                <div className="greeting">
                    <h3>
                        hello {user.firstName} {user.lastName}
                    </h3>
                </div>
                <Link to="/vacations" onClick={() => dispatch(logoutUser(user.accessToken))} className="linkIcon">
                    <ExitToApp /> Logout
                </Link>
                <input
                    type="checkbox"
                    id="dark-toggle"
                    className="dark-toggle"
                    onChange={() => {
                        localStorage.setItem("dark", JSON.stringify(!dark.isDarkMode));
                        dark.setIsDarkMode(!dark.isDarkMode);
                    }}
                />
                <label htmlFor="dark-toggle" className="dark-label">
                    <Brightness />
                    <NightsStay />
                </label>
            </div>
        </div>
    );
}

export default NavBar;
