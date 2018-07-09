import React, { Component } from 'react'
import { 
    View, 
    Text } from 'react-native'
import styles from './Styles/RootContainerStyles'

export default class RootContainer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            Testing
        </Text>
      </View>
    )
  }
}