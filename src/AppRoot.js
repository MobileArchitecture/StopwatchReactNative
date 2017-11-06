import React from 'react'
import reducer from './reducers/StopwatchReducer'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import AppRoot from './components/AppRoot'
import * as actions from './actions/StopwatchActions'

const store = createStore(reducer)

const mapStateToProps = (state, ownProps) => ({
  stopwatch: state
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStart: () => store.dispatch(actions.start()),
  onStop: () => store.dispatch(actions.stop()),
  onLap: () => store.dispatch(actions.lap()),
  onReset: () => store.dispatch(actions.reset())
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoot)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
