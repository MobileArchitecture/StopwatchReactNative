import * as stopwatch from './StopwatchActions'

describe('stopwatch actions', () => {
  it('should be able to trigger start', () => {
    expect(stopwatch.start()).toEqual({
      type: 'STOPWATCH_START'
    })
  })

  it('should be able to trigger stop', () => {
    expect(stopwatch.stop()).toEqual({
      type: 'STOPWATCH_STOP'
    })
  })
})
