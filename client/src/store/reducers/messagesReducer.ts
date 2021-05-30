
const initState = "";

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case "DISPLAY_MESSAGE":
            return (state = action.payload ); 
        case "CLEAR_MESSAGE":
            return (state = "" );    
        default:
            return state;
    }
};

export default reducer;