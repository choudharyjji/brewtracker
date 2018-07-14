import React, { Component } from 'react'
import { 
  TouchableOpacity,
  View, 
  Text } from 'react-native'
import styles from './Styles/RootContainerStyles'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RootContainer extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
          <Text style={styles.title}> 
            BrewTracker 
          </Text> 
        <View style={styles.rowContainer}>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.icon}
              onPress={() => this.props.navigation.navigate('newscreen')}>
              <Icon name="pagelines" size={80} color="black" />
              <Text style={styles.welcome}>
                  New
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.icon}
              onPress={() => this.props.navigation.navigate('community')}>
              <Icon name="users" size={80} color="black" />
              <Text style={styles.welcome}>
                  Community
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.icon}
              onPress={() => this.props.navigation.navigate('existing')}>
              <Icon name="hourglass-end" size={80} color="black" />
              <Text style={styles.welcome}>
                  Existing
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.icon}
              onPress={() => this.props.navigation.navigate('favourites')}>
              <Icon name="thumbs-o-up" size={80} color="black" />
              <Text style={styles.welcome}>
                  Favourites
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.icon}
              onPress={() => this.props.navigation.navigate('finished')}>
              <Icon name="beer" size={80} color="black" />
              <Text style={styles.welcome}>
                  Finished
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.icon}
              onPress={() => this.props.navigation.navigate('sample')}>
              <Icon name="tint" size={80} color="black" />
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