import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Button from 'react-native-button'
import _ from 'lodash'

export default class AppRoot extends React.Component {
  startStop () {
    if (this.props.stopwatch.isRunning) {
      this.props.onStop()
    } else {
      this.props.onStart()
    }
  }

  lapReset () {
    if (this.props.stopwatch.isRunning) {
      this.props.onLap()
    } else {
      this.props.onReset()
    }
  }

  render () {
    const startStopTitle = this.props.stopwatch.isRunning ? 'Stop' : 'Start'
    const startStopStyle = this.props.stopwatch.isRunning ? styles.buttonStop : styles.buttonStart
    const hasLaps = _.size(this.props.stopwatch.laps) > 0
    const isStopped = !this.props.stopwatch.isRunning && hasLaps
    const lapTitle = isStopped ? 'Reset' : 'Lap'

    return (
      <View style={styles.container}>
        <View style={styles.stopwatchWrap}>
          <Text style={styles.stopwatch}>00:10.32</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.buttonLap}
            disabled={!hasLaps}
            onPress={() => this.lapReset()}>{lapTitle}</Button>

          <Button style={startStopStyle}
            onPress={() => this.startStop()}>{startStopTitle}</Button>
        </View>
        <FlatList
          style={styles.lapList}
          data={[
            { name: 'Lap 3', time: '00.02.23' },
            { name: 'Lap 2', time: '00.05.23', style: 'lapWorst' },
            { name: 'Lap 1', time: '00.03.23', style: 'lapBest' }
          ]}
          keyExtractor={lap => lap.name}
          renderItem={({ item }) =>
            <View style={styles.lap}>
              <Text style={[styles.lapName, styles[item.style]]}>{item.name}</Text>
              <Text style={[styles.lapTime, styles[item.style]]}>{item.time}</Text>
            </View>
          } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  stopwatchWrap: {
    flexGrow: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stopwatch: {
    flex: 0,
    fontFamily: 'Menlo-Regular',
    fontSize: 69,
    textAlign: 'center',
    paddingTop: 60
  },
  lapList: {
    flexGrow: 5
  },
  lap: {
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  lapName: {
    fontSize: 16
  },
  lapTime: {
    fontFamily: 'Menlo-Regular',
    fontSize: 16
  },
  lapWorst: {
    color: 'red'
  },
  lapBest: {
    color: 'green'
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 45,
    marginVertical: 20
  },
  buttonLap: {
  },
  buttonReset: {
    color: 'red'
  },
  buttonStart: {
    color: 'green'
  },
  buttonStop: {
    color: 'red'
  }
})
