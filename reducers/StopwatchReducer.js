const initialState = {
    isRunning: false
};

export default (state = initialState, action) => {
    switch (action.type) {

        // case 'STOPWATCH_TICK':
        //     return { ...state };

        // case 'STOPWATCH_START':
        //     return { ...state };

        // case 'STOPWATCH_STOP':
        //     return { ...state };

        // case 'STOPWATCH_LAP':
        // return { ...state };

        // case 'STOPWATCH_RESET':
        // return { ...state };

        default:
            return state;
    }
};
