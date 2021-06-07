import { IAction } from "../../interfaces/IActions"

export const getAll = (data: {}): IAction => {
    return {
        type: 'GET_ALL_VACATIONS',
        payload: data
    }
}

export const postNew = (data: {}): IAction => {
    return {
        type: 'POST_NEW_VACATION',
        payload: data
    }
}

export const setCurrVacationId = (data: number): IAction => {
    return {
        type: 'SET_CURRENT_VACATION_ID',
        payload: data
    }
}

export const updateVacation = (data: {}): IAction => {
    return {
        type: 'UPDATE_VACATION',
        payload: data
    }
}

export const syncronizeVacation = (data: {}): IAction => {
    return {
        type: 'SYNC_VACATIONS',
        payload: data
    }
}