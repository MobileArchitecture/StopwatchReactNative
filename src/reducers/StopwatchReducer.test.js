import sut from './StopwatchReducer'

describe('stopwatch reducer', () => {
  it('should handle initial state', () => {
    expect(
      sut(undefined, {})
    ).toEqual({
      isRunning: false,
      elapsed: 0,
      lapStart: 0,
      laps: []
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

  it('should increment elapsed and last lap on tick action', () => {
    expect(
        sut({
          isRunning: true,
          elapsed: 0,
          laps: [{
            name: 'Lap 1',
            time: 0
          }]
        }, {
          type: 'STOPWATCH_TICK',
          elapsed: 123
        })
      ).toEqual({
        isRunning: true,
        elapsed: 123,
        laps: [{
          name: 'Lap 1',
          time: 123
        }]
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

  it('should add new lap in responding to lap action', () => {
    expect(
      sut({
        laps: []
      }, {
        type: 'STOPWATCH_LAP'
      })
    ).toEqual({
      laps: [{
        name: 'Lap 1',
        time: 0
      }]
    })
  })
})
