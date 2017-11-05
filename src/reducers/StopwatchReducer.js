import _ from 'lodash'

const initialState = {
  isRunning: false,
  elapsed: 0,
  lapStart: 0,
  laps: []
}

function addLap (state) {
  const laps = state.laps || []
  const count = _.size(laps)
  const newLap = {
    name: `Lap ${count + 1}`,
    time: 0
  }
  return {
    ...state,
    lapStart: state.elapsed,
    laps: [newLap, ...laps]
  }
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
      if (_.isEmpty(state.laps)) {
        state = addLap(state)
      }
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
      return addLap(state)

    case 'STOPWATCH_RESET':
      return initialState

    default:
      return state
  }
}
