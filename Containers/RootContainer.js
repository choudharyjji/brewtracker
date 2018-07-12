import React, { Component } from 'react'
import { 
  TouchableOpacity,
  View, 
  Text } from 'react-native'
import styles from './Styles/RootContainerStyles'

export default class RootContainer extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>

        <View style={styles.rowContainer}>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.listButton}
              onPress={() => this.props.navigation.navigate('newscreen')}>
              <Text style={styles.welcome}>
                  New
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.listButton}
              onPress={() => this.props.navigation.navigate('community')}>
              <Text style={styles.welcome}>
                  Community
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.listButton}
              onPress={() => this.props.navigation.navigate('existing')}>
              <Text style={styles.welcome}>
                  Existing
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.listButton}
              onPress={() => this.props.navigation.navigate('favourites')}>
              <Text style={styles.welcome}>
                  Favourites
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.listButton}
              onPress={() => this.props.navigation.navigate('finished')}>
              <Text style={styles.welcome}>
                  Finished
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.listButton}
              onPress={() => this.props.navigation.navigate('sample')}>
              <Text style={styles.welcome}>
                  Sample
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    )
  }
}