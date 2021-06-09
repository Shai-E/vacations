import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Vacations from "../containers/Vacations/Vacations";
import Page404 from "./Page404/Page404";
import AddVacation from "./AddVacation/AddVacation";
import Reports from "./Reports/Reports";

const Routing:React.FC = ():JSX.Element => {
    return (
        <>
            <Switch>
                <Route exact path="/vacations" component={Vacations} />
                <Route exact path="/add-vacation" component={AddVacation} />
                <Route exact path="/reports" component={Reports} />
                <Route path="/page-404" component={Page404} />
                <Redirect exact from="/" to="/vacations" />
                <Route path="*" component={Page404} />
            </Switch>
        </>
    );
}

export default Routing;
