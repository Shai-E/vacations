import { IAction } from "../../interfaces/IActions"

export const displayMsg = (data: string): IAction => {
    return {
        type: 'DISPLAY_MESSAGE',
        payload: data
    }
}

export const clearMsg = (): IAction => {
    return {
        type: 'CLEAR_MESSAGE'
    }
}
