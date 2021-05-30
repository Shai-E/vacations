import { Redirect, Route, Switch } from "react-router-dom";
import Vacations from "../containers/Vacations/Vacations";
import Page404 from "./Page404/Page404";
import AddVacation from "./AddVacation/AddVacation";
import Reports from "./Reports/Reports";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { UserModel } from "../models/UserModel";

function Routing() {
    const user: UserModel = useSelector((state: RootState) => state.user);
    return (
        <>
            <Switch>
                <Route exact path="/vacations" component={Vacations} />
                <Route exact path="/add-vacation" component={()=>{if(user.isAdmin) {return <AddVacation/>} else {return <Page404/>}}} />
                <Route exact path="/reports" component={()=>{if(user.isAdmin) {return <Reports/>} else {return <Page404/>}}} />
                <Redirect exact from="/" to="/vacations" />
                <Route path="*" component={Page404} />
            </Switch>
        </>
    );
}

export default Routing;
