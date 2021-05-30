export const getAll = (data: {}) => {
    return {
        type: 'GET_ALL_VACATIONS',
        payload: data
    }
}

export const postNew = (data: {}) => {
    return {
        type: 'POST_NEW_VACATION',
        payload: data
    }
}

export const setCurrVacationId = (data: number) => {
    return {
        type: 'SET_CURRENT_VACATION_ID',
        payload: data
    }
}

export const updateVacation = (data: {}) => {
    return {
        type: 'UPDATE_VACATION',
        payload: data
    }
}

export const syncronizeVacation = (data: {}) => {
    return {
        type: 'SYNC_VACATIONS',
        payload: data
    }
}