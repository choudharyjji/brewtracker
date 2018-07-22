import React, { Component } from 'react'
import { 
  View, 
  Text,
  SectionList 
} from 'react-native'
import BackButton from '../Components/BackButton';
import styles from './Styles/ContainerStyles';
import hops from '../Data/hops';

export default class ExistingScreen extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View style={{padding: 10}}>
        <SectionList
          renderItem={({item, index, section}) => 

          <View style={{padding:10}}>
            <Text 
              key={index}
              style={{
                fontSize: 20,
                fontStyle: 'italic'}}>
                {item.name}
            </Text>

            <View style={{flexDirection:'row'}}>
              <View style={{
                width: 50, 
                height: 50, 
                borderWidth: 2,
                borderRadius: 25,
                borderColor: 'darkblue',
                margin: 5,
                justifyContent: 'center'}}>
                  <Text style={{
                    color: 'black',
                    textAlign: 'center'}}> 
                      {item.alpha}
                  </Text>
              </View>
              <View style={{
                width: 50, 
                height: 50, 
                borderWidth: 2,
                borderRadius: 25,
                borderColor: 'darkred',
                margin: 5,
                justifyContent: 'center'}}>
                  <Text style={{
                    color: 'black',
                    textAlign: 'center'}}> 
                      {item.beta}
                  </Text>
              </View>
              <View style={{
                width: 50, 
                height: 50, 
                borderWidth: 2,
                borderRadius: 25,
                borderColor: 'purple',
                margin: 5,
                justifyContent: 'center'}}>
                  <Text style={{
                    color: 'black',
                    textAlign: 'center'}}>  
                      {item.oil}
                  </Text>
              </View>
            </View>

            <Text>
              {item.commercial}
            </Text>

            <Text>
              {item.aroma}
            </Text>

          </View>}

          renderSectionHeader={({section: {name}}) => (

            <Text style={
                {fontWeight: 'bold',
                 fontSize: 24,
                 backgroundColor: 'grey'}}>
              {name}
            </Text>

          )}
          sections={hops}
          keyExtractor={(item, index) => item + index}
        />
        <BackButton />       
      </View>
    )
  }
}