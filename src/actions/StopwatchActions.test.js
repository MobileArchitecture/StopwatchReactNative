import * as stopwatch from './StopwatchActions'

describe('stopwatch actions', () => {
  it('should be able to trigger start', () => {
    expect(stopwatch.start()).toMatchSnapshot()
  })

  it('should be able to trigger stop', () => {
    expect(stopwatch.stop()).toMatchSnapshot()
  })

  it('should be able to trigger lap', () => {
    expect(stopwatch.lap()).toMatchSnapshot()
  })

  it('should be able to trigger reset', () => {
    expect(stopwatch.reset()).toMatchSnapshot()
  })

  it('should be able to trigger tick', () => {
    expect(stopwatch.tick(125)).toMatchSnapshot()
  })
})
