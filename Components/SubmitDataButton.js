import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet   
} from 'react-native';

export default class SubmitDataButton extends Component {
    render() {
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                    onPress={() => { 
                        this.props.submitData() 
                    }}>
                    <Text style={styles.text}>
                        Submit 
                    </Text>      
            </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 5,
      backgroundColor: '#61A4ff',
      borderRadius: 10,        
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      justifyContent: 'center',
      fontSize: 28,
    }
  });