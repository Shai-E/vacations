import { IAction } from "../../interfaces/IActions"
import { UserModel } from "../../models/UserModel"

export const login = (data: UserModel): IAction => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

export const register = (data: UserModel): IAction => {
    return {
        type: 'REGISTER',
        payload: data
    }
}

export const logout = (): IAction => {
    return {
        type: 'LOGOUT'
    }
}