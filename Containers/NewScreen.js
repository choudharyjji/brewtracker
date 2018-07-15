import React, { Component } from 'react'
import { 
  View, 
  Text } from 'react-native'
import BackButton from '../Components/BackButton';
import styles from './Styles/NewScreenStyles';
import DatePicker from 'react-native-datepicker';

export default class NewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '2018-01-01'
     };
  }

  componentWillMount(){
    // This runs before render()
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.titleblock}> 
          <Text style={styles.title}>
            New Screen
          </Text>   
        </View>

        <DatePicker
          style ={{width: 200}}
          date={this.state.date}
          placeholder="select date"
          mode="date"
          format="YYYY-MM-DD"
          minDate="2018-01-01"
          maxDate={this.state.date}
          showIcon={true}
          customStyles={{
          dateInput: {
              padding:5
          },
        }}
        onDateChange={(date) => {
          this.setState({date: date});}}/>
     

        <BackButton /> 

      </View>
    )
  }
}