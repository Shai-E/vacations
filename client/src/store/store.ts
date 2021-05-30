import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//reducers
import reducer from "./reducers/rootReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
