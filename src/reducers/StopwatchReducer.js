const initialState = {
  isRunning: false,
  elapsed: 0,
  lapStart: 0,
  laps: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'STOPWATCH_TICK':
      const currentLaps = state.laps
      let activeLap = Object.assign({}, currentLaps[0])
      activeLap.time += action.elapsed
      let finishedLaps = currentLaps.slice(1)

      return {
        ...state,
        elapsed: state.elapsed + action.elapsed,
        laps: [activeLap, ...finishedLaps]
      }

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

    case 'STOPWATCH_LAP':
      const newLap = {
        name: `Lap ${state.laps.length + 1}`,
        time: 0
      }
      return {
        ...state,
        lapStart: state.elapsed,
        laps: [newLap, ...state.laps]
      }

    // case 'STOPWATCH_RESET':
    // return { ...state };

    default:
      return state
  }
}
