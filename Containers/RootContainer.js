import React, { Component } from 'react'
import { 
  TouchableOpacity,
  View, 
  Text } from 'react-native'
import styles from './Styles/RootContainerStyles'

export default class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { test: "Testing" }
  }

  pressMe = () => {
    if (this.state.test == "Testing") {
      this.setState({
        test: "DONE"
      })
    } else {
      this.setState({
        test: "Testing"
      })     
    }
  }

  render () {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.button}
          onPress={this.pressMe}>

          <Text style={styles.welcome}> 
            Press me! 
          </Text>

        </TouchableOpacity>

        <Text style={styles.welcome}>
            {this.state.test}
        </Text>

      </View>
    )
  }
}