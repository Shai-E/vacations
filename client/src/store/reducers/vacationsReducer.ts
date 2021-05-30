import { VacationModel } from "../../models/VacationModel";
import { formatVacationsData } from "../actions/vacationsActions";

const getVacationsFromStorage = () => {
    if (localStorage.getItem("vacations")) return JSON.parse(localStorage.getItem("vacations")!);
};

const initState = getVacationsFromStorage() || {
    vacations: [],
    followed: [],
    notFollowed: [],
    followedIds: [],
    currVacationId: null,
};

interface StateInit {
    vacations?: VacationModel[],
    followed?: VacationModel[],
    notFollowed?: VacationModel[],
    followedIds?: number[],
    currVacationId?: number,
}

let newState: StateInit = { ...initState };

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case "GET_ALL_VACATIONS":
            newState = {
                ...state,
                vacations: action.payload.vacations,
                followed: action.payload.followed,
                notFollowed: action.payload.notFollowed,
                followedIds: action.payload.followedIds,
                currVacationId: null,
            };
            return newState;
        case "UPDATE_VACATION":
            const { vacations, followed, notFollowed, followedIds } = state;

            const updateVacationValues = (data:VacationModel[]) => {
                data.forEach((vac: VacationModel) => {
                    if (vac.id === action.payload.vacationId) {
                        vac.destination = action.payload.vacation.destination;
                        vac.description = action.payload.vacation.description;
                        vac.startDate = action.payload.vacation.startDate;
                        vac.endDate = action.payload.vacation.endDate;
                        vac.price = action.payload.vacation.price;
                    }
                });
            }

            updateVacationValues(vacations);
            updateVacationValues(followed);
            updateVacationValues(notFollowed);

            newState = {
                vacations,
                followed,
                notFollowed,
                followedIds,
            };
            return newState;

        case "SET_CURRENT_VACATION_ID":
            state = {
                ...state,
                currVacationId: action.payload,
            };
            return state;
        case "SYNC_VACATIONS":
            const data = {vacations: action.payload, IDs: state.followedIds}
            const result = formatVacationsData(data);
            state = result;
            return state;

        default:
            return state;
    }
};

export default reducer;
