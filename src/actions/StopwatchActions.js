export const start = () => ({
  type: 'STOPWATCH_START'
})

export const stop = () => ({
  type: 'STOPWATCH_STOP'
})

export const reset = () => ({
  type: 'STOPWATCH_RESET'
})

export const lap = () => ({
  type: 'STOPWATCH_LAP'
})

export const tick = (elapsed) => ({
  type: 'STOPWATCH_TICK',
  elapsed
})
