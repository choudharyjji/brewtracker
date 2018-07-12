import React, { Component } from 'react'
import { 
    View, 
    Text } from 'react-native'
  
  export default class SampleScreen extends Component {
    constructor(props) {
      super(props)
    }
  
    render () {
      return (
        <View>
          <Text>
            Sample Screen
          </Text>      
        </View>
      )
    }
  }