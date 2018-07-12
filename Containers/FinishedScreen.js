import React, { Component } from 'react'
import { 
    View, 
    Text } from 'react-native'
  
  export default class FinishedScreen extends Component {
    constructor(props) {
      super(props)
    }
  
    render () {
      return (
        <View>
          <Text>
            Finished Screen
          </Text>      
        </View>
      )
    }
  }