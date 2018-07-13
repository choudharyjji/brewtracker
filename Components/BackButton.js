import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity 
} from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './Styles/BackButtonStyles';

class BackButton extends Component {
    render() {
        return (
          <View>
            <TouchableOpacity style={styles.button}
                    onPress={() => { 
                        this.props.navigation.goBack() 
                    }}>
                    <Text style={styles.welcome}>
                        Back 
                    </Text>      
            </TouchableOpacity>
          </View>
        )
    }
}

export default withNavigation(BackButton);