import { clearMsg } from "../actionTypes/messagesActionTypes";
import { AppDispatch } from "../store";

export const removeMessage = (dispatch: AppDispatch):void => {
    setTimeout(() => {
        dispatch(clearMsg());
    }, 3000);
}