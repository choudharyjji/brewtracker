import React, { Component } from 'react'
import { 
  View, 
  Text } from 'react-native'

export default class NewScreen extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View>
        <Text>
          New Screen
        </Text>      
      </View>
    )
  }
}