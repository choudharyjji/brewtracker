import React, { Component } from 'react'
import { 
    View, 
    Text } from 'react-native'

import BackButton from '../Components/BackButton';
import styles from './Styles/ContainerStyles';

export default class SampleScreen extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View>
        <Text style={styles.title}>
          Sample Screen
        </Text>    
        <BackButton />  
      </View>
    )
  }
}