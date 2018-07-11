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

        <View style={styles.rowContainer}>

          <View style={{flex:1, 
            backgroundColor:'grey', 
            alignItems:'center', 
            justifyContent:'center'}}>

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
          <View style={{flex:1,backgroundColor:'orange'}}/>
        </View>

        <View style={styles.rowContainer}>
          <View style={{flex:1,backgroundColor:'blue'}}/>
          <View style={{flex:1,backgroundColor:'red'}}/>
        </View>

        <View style={styles.rowContainer}>
          <View style={{flex:1,backgroundColor:'purple'}}/>
          <View style={{flex:1,backgroundColor:'green'}}/>
        </View>
      </View>
    )
  }
}