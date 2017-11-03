import sut from './StopwatchReducer';

describe('stopwatch reducer', () => {
    it('should handle initial state', () => {
        expect(
            sut(undefined, {})
        ).toEqual({
            isRunning: false
        })
    })
})
