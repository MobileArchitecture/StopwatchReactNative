import sut from './StopwatchReducer'
import {given, when} from '../jest-given'

given('stopwatch reducer', () => {
  given('initial state', () => {
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

    given('stopped state', () => {
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

      when('respoding to reset action', () => {
        let resetState
        beforeEach(() => {
          resetState = sut(stoppedState, {
            type: 'STOPWATCH_RESET'
          })
        })
        afterEach(() => {
          resetState = null
        })

        it('should get back to initial state', () => {
          expect(resetState).toEqual(initialState)
        })
      })
    })
  })

  given('running state', () => {
    let runningState
    let runningState2Laps
    let runningStateEtalon
    let runningState2LapsEtalon
    beforeEach(() => {
      runningState = {
        isRunning: true,
        elapsed: 100,
        lapStart: 0,
        laps: [{
          name: 'Lap 1',
          time: 100
        }]
      }
      runningState2Laps = {
        isRunning: true,
        elapsed: 100,
        lapStart: 0,
        laps: [{
          name: 'Lap 2',
          time: 0
        },
        {
          name: 'Lap 1',
          time: 100
        }]
      }
      runningStateEtalon = Object.assign({}, runningState)
      runningState2LapsEtalon = Object.assign({}, runningState2Laps)
    })

    afterEach(() => {
      expect(runningState).toEqual(runningStateEtalon)
      expect(runningState2Laps).toEqual(runningState2LapsEtalon)
    })

    when('stopwatch tick', () => {
      const kElapsedTime = 5
      let tickedState
      beforeEach(() => {
        tickedState = sut(runningState2Laps, {
          type: 'STOPWATCH_TICK',
          elapsed: kElapsedTime
        })
      })

      it('should increment overal elapsed time', () => {
        expect(tickedState.elapsed).toEqual(runningState2Laps.elapsed + kElapsedTime)
      })
      it('should increment last lap time', () => {
        const kLastLapId = 0
        expect(tickedState.laps[kLastLapId].time).toEqual(runningState2Laps.laps[kLastLapId].time + kElapsedTime)
      })
      it('should not change finished lap\'s time', () => {
        const kFinishedLapId = 1
        expect(tickedState.laps[kFinishedLapId].time).toEqual(runningState2Laps.laps[kFinishedLapId].time)
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

    it('should add second lap in responding to lap action', () => {
      expect(
        sut(runningState, {
          type: 'STOPWATCH_LAP'
        })
      ).toEqual({
        isRunning: true,
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
})
