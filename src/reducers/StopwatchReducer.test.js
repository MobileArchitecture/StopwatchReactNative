import sut from './StopwatchReducer'

describe('stopwatch reducer', () => {
  describe('GIVEN initial state', () => {
    let initialState
    let initialStateEtalon
    beforeEach(() => {
      initialState = {
        isRunning: false,
        elapsed: 0,
        lapStart: 0,
        laps: []
      }
      initialStateEtalon = Object.assign({}, initialState)
    })
    afterEach(() => {
      expect(initialState).toEqual(initialStateEtalon)
    })

    it('should handle initial state', () => {
      expect(
        sut(undefined, {})
      ).toEqual(initialState)
    })

    it('should create new lap while responding to start action', () => {
      expect(
        sut(initialState, {
          type: 'STOPWATCH_START'
        })
      ).toEqual({
        isRunning: true,
        elapsed: 0,
        lapStart: 0,
        laps: [{
          name: 'Lap 1',
          time: 0
        }]
      })
    })

    it('should start running responding to start action', () => {
      expect(
        sut({
          isRunning: false
        }, {
          type: 'STOPWATCH_START'
        }).isRunning
      ).toBeTruthy()
    })
  })

  describe('GIVEN running state', () => {
    let runningState
    let runningStateEtalon
    beforeEach(() => {
      runningState = {
        isRunning: true,
        elapsed: 123,
        lapStart: 0,
        laps: [{
          name: 'Lap 1',
          time: 123
        }]
      }
      runningStateEtalon = Object.assign({}, runningState)
    })

    afterEach(() => {
      expect(runningState).toEqual(runningStateEtalon)
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

  describe('GIVEN stopped state', () => {
    let stoppedState
    let stoppedStateEtalon
    beforeEach(() => {
      stoppedState = {
        isRunning: false,
        elapsed: 100,
        lapStart: 0,
        laps: [{
          name: 'Lap 1',
          time: 100
        }]
      }
      stoppedStateEtalon = Object.assign({}, stoppedState)
    })

    afterEach(() => {
      expect(stoppedState).toEqual(stoppedStateEtalon)
    })

    it('should not create new lap if there was one while responding to start action', () => {
      expect(
        sut(stoppedState, {
          type: 'STOPWATCH_START'
        })
      ).toEqual({
        ...stoppedState,
        isRunning: true
      })
    })
  })

  it('should increment elapsed and last lap on tick action', () => {
    expect(
      sut({
        isRunning: true,
        elapsed: 10,
        laps: [{
          name: 'Lap 2',
          time: 0
        },
        {
          name: 'Lap 1',
          time: 10
        }]
      }, {
        type: 'STOPWATCH_TICK',
        elapsed: 5
      })
    ).toEqual({
      isRunning: true,
      elapsed: 15,
      laps: [{
        name: 'Lap 2',
        time: 5
      },
      {
        name: 'Lap 1',
        time: 10
      }]
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

  it('should add second lap in responding to lap action', () => {
    expect(
      sut({
        elapsed: 100,
        lapStart: 0,
        laps: [{
          name: 'Lap 1',
          time: 100
        }]
      }, {
        type: 'STOPWATCH_LAP'
      })
    ).toEqual({
      elapsed: 100,
      lapStart: 100,
      laps: [{
        name: 'Lap 2',
        time: 0
      },
      {
        name: 'Lap 1',
        time: 100
      }]
    })
  })

  it('should add third lap in responding to lap action', () => {
    const lap2Start = {
      elapsed: 100,
      lapStart: 100,
      laps: [{
        name: 'Lap 2',
        time: 0
      },
      {
        name: 'Lap 1',
        time: 100
      }]
    }

    const lap2Ticked = sut(lap2Start, { type: 'STOPWATCH_TICK', elapsed: 30 })

    expect(
      sut(lap2Ticked, {
        type: 'STOPWATCH_LAP'
      })
    ).toEqual({
      elapsed: 130,
      lapStart: 130,
      laps: [{
        name: 'Lap 3',
        time: 0
      },
      {
        name: 'Lap 2',
        time: 30
      },
      {
        name: 'Lap 1',
        time: 100
      }]
    })
  })
})
