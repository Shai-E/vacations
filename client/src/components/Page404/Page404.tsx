import { useEffect } from "react";
import { useHistory } from "react-router";
import "./Page404.css";

function Page404() {
    const history = useHistory();

    useEffect(() => {
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
}

export default Page404;
