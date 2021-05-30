import { UserModel } from "../../models/UserModel"

export const login = (data: UserModel) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

export const register = (data: UserModel) => {
    return {
        type: 'REGISTER',
        payload: data
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}