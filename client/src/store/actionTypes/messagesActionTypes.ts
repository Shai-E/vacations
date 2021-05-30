export const displayMsg = (data: string) => {
    return {
        type: 'DISPLAY_MESSAGE',
        payload: data
    }
}

export const clearMsg = () => {
    return {
        type: 'CLEAR_MESSAGE'
    }
}
