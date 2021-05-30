const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem("user")!);
};
const initState = getUserFromStorage() || {};

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case "LOGIN":
                state = { ...action.payload, isLoggedIn: true };
            return state;
        case "LOGOUT":
            state = { ...state, isLoggedIn: false };
            return state;
        default:
            return state;
    }
};

export default reducer;
