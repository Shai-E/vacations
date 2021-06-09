import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Page404.css";

const Page404: React.FC = (): JSX.Element => {
    const history = useHistory();

    useEffect((): void => {
        setTimeout(() => {
            history.push("/");
        }, 3000);
    }, [history]);

    return (
        <div className="Page404">
            <h4>Page does not exist</h4>
            <p>You'll be redirected to our home page.</p>
        </div>
    );
};

export default Page404;
