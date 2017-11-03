const initialState = {
  isRunning: false,
  elapsed: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    // case 'STOPWATCH_TICK':
    //     return { ...state };

    case 'STOPWATCH_START':
      return {
        ...state,
        isRunning: true
      }

    case 'STOPWATCH_STOP':
      return {
        ...state,
        isRunning: false
      }

    // case 'STOPWATCH_LAP':
    // return { ...state };

    // case 'STOPWATCH_RESET':
    // return { ...state };

    default:
      return state
  }
}
