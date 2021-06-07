import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVacations } from "../../store/actions/vacationsActions";
import Vacation from "../../components/Vacation/Vacation";
import "./Vacations.css";
import Loader from "../../components/Loader/Loader";
import { VacationModel } from "../../models/VacationModel";
import { RootState } from "../../store/store";

const Vacations = ():JSX.Element => {
    const vacations = useSelector((state: RootState) => state.vacations);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(():void => {
        (async ():Promise<void> => {
            await dispatch(() => dispatch(getAllVacations()));
            setLoading(false);
        })();
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="Vacations">
                {vacations.vacations.length > 0 &&
                    vacations.followed.map((vacation: VacationModel) => (
                        <Vacation
                            key={vacation.id}
                            vacation={vacation}
                            isFollowedInit={true}
                        />
                    ))}
                {vacations.vacations.length > 0 &&
                    vacations.notFollowed.map((vacation: VacationModel) => (
                        <Vacation
                            key={vacation.id}
                            vacation={vacation}
                            isFollowedInit={false}
                        />
                    ))}
            </div>
        </>
    );
}
export default Vacations;
