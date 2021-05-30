import usersReducer from "./usersReducer";
import messagesReducer from "./messagesReducer";
import vacationsReducer from "./vacationsReducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ user: usersReducer, message: messagesReducer, vacations: vacationsReducer });

export default rootReducer;