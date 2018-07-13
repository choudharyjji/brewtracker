import React, { Component } from 'react'
import { 
    View, 
    Text 
} from 'react-native'
import BackButton from '../Components/BackButton'; 
import styles from './Styles/ContainerStyles';

export default class FavourtiesScreen extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View>
        <Text style={styles.title}>
          Favourites Screen
        </Text>  
        <BackButton />      
      </View>
    )
  }
}