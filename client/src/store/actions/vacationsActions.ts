import { VacationModel } from "../../models/VacationModel";
import { displayMsg } from "../actionTypes/messagesActionTypes";
import { getAll, setCurrVacationId, syncronizeVacation, updateVacation } from "../actionTypes/vacationsActionTypes";
import store, { AppDispatch } from "../store";
import axios from "axios";
import { removeMessage } from "./messagesActions";
import { updateToken } from "./usersActions";
import io from "socket.io-client";
import { IFollow } from "../../interfaces/IFollow";
import { IUpdateVacation } from "../../interfaces/IUpdateVacation";
const requestPath = "http://localhost:5000/api/vacations";

const socket = io("http://localhost:5000");

export const formatVacationsData = (data: { IDs: number[]; vacations: VacationModel[] }) => {
    let allVacations = data.vacations;
    const IDs = data.IDs;
    const vacationsFollowedByUser = allVacations.filter((vacation: VacationModel) => IDs.includes(vacation.id!));
    const vacationsNotFollowedByUser = allVacations.filter((vacation: VacationModel) => !IDs.includes(vacation.id!));

    return {
        vacations: allVacations,
        followed: vacationsFollowedByUser,
        notFollowed: vacationsNotFollowedByUser,
        followedIds: IDs,
        currVacationId: null,
    };
};

export const syncAllVacations = (data: VacationModel[]) => (dispatch: AppDispatch) => {
    try {
        dispatch(syncronizeVacation(data));
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const getAllVacations = () => async (dispatch: AppDispatch) => {
    try {
        await updateToken();
        const { data } = await axios.get(`${requestPath}/all/${store.getState().user.id}`, { withCredentials: true });
        const vacations = formatVacationsData(data);
        localStorage.setItem("vacations", JSON.stringify(vacations));
        dispatch(getAll(vacations));
        socket.emit("data-client-changes", store.getState().user.id, JSON.stringify(vacations.vacations));
        return vacations.vacations;
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const postNewVacation = (vacation: VacationModel) => async (dispatch: AppDispatch) => {
    try {
        await updateToken();
        const { data } = await axios.post(`${requestPath}/add`, vacation, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        dispatch(displayMsg(data.message));
        removeMessage(dispatch);
        dispatch(setCurrVacationId(data.vacationId));
        return data.vacationId;
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const updatePictureForVacation = (data: File, id: number) => async (dispatch: AppDispatch) => {
    try {
        await updateToken();
        const fd = new FormData();
        fd.append("image", data);
        const response = await axios.post(`${requestPath}/${id}/picture`, fd, {
            withCredentials: true,
        });
        dispatch(displayMsg(response.data.message));
        removeMessage(dispatch);

        const vacations = formatVacationsData(response.data);
        localStorage.setItem("vacations", JSON.stringify(vacations));
        dispatch(getAll(vacations));
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const postVacationUpdate = (data: IUpdateVacation) => async (dispatch: AppDispatch) => {
    try {
        await updateToken();
        const response = await axios.post(`${requestPath}/update/${data.vacationId}`, data.vacation, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        dispatch(displayMsg(response.data.message));
        removeMessage(dispatch);
        dispatch(updateVacation(data));
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const deleteVacation = (vacationId: number) => async (dispatch: AppDispatch) => {
    try {
        await updateToken();
        const { data } = await axios.delete(`${requestPath}/${vacationId}`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        dispatch(displayMsg(data.message));
        removeMessage(dispatch);
        const vacations = formatVacationsData(data);
        localStorage.setItem("vacations", JSON.stringify(vacations));
        socket.emit("data-client-changes", store.getState().user.id, JSON.stringify(vacations.vacations));
        dispatch(getAll(vacations));
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const postNewFollower = (data: IFollow) => async (dispatch: AppDispatch) => {
    try {
        await updateToken();
        const response = await axios.post(`${requestPath}/follow/${data.userId}/${data.vacationId}`, null, {
            withCredentials: true,
        });
        dispatch(displayMsg(response.data.message));
        removeMessage(dispatch);
        const vacations = formatVacationsData(response.data);
        localStorage.setItem("vacations", JSON.stringify(vacations));
        dispatch(getAll(vacations));
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};

export const removeFollower = (data: IFollow) => async (dispatch: AppDispatch) => {
    try {
        await updateToken();
        const response = await axios.delete(`${requestPath}/unfollow/${data.userId}/${data.vacationId}`, {
            withCredentials: true,
        });
        dispatch(displayMsg(response.data.message));
        removeMessage(dispatch);
        const vacations = formatVacationsData(response.data);
        localStorage.setItem("vacations", JSON.stringify(vacations));
        dispatch(getAll(vacations));
    } catch (err) {
        dispatch(displayMsg(err.response.data.message));
        removeMessage(dispatch);
    }
};
