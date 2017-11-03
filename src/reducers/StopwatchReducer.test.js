import sut from './StopwatchReducer'

describe('stopwatch reducer', () => {
  it('should handle initial state', () => {
    expect(
      sut(undefined, {})
    ).toEqual({
      isRunning: false,
      elapsed: 0
    })
  })

  it('should start running responding to start action', () => {
    expect(
      sut({
        isRunning: false
      }, {
        type: 'STOPWATCH_START'
      })
    ).toEqual({
      isRunning: true
    })
  })

  it('should stop running responding to stop action', () => {
    expect(
      sut({
        isRunning: true
      }, {
        type: 'STOPWATCH_STOP'
      })
    ).toEqual({
      isRunning: false
    })
  })
})
