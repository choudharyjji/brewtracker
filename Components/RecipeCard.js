import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet  
} from 'react-native';
import Slider from "react-native-slider";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class RecipeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: this.props.mark,
            maxQuantity: this.props.maxQuantity
        }
    } 

    render() {
        return (
            <View style={styles.container}>

              <View style={styles.deleteElement}>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => 
                    this.props.deleteItem(this.state.recipe)} >
                  <Icon name="trash" size={20} color="black" />
                </TouchableOpacity>
              </View>
      
              <View style={styles.titleBlock}>
                <Text style={styles.titleText}>
                    {this.state.recipe.name}
                </Text>
              </View>

              <View style={styles.measureBlock}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.measureBlockIcon}>
                    <Icon name="balance-scale" size={20} color="black" />
                  </View>
                  <View style={styles.measureBlockSlider}>
                    <Slider
                      value={this.state.recipe.quantity}
                      step={1}
                      minimumValue={0}
                      maximumValue={this.state.maxQuantity}
                      onValueChange={(value) => 
                        this.props.setQuantity(
                          value, this.state.recipe) } />
                  </View>
                  <View style={styles.measureBlockIcon}>
                    <Text style={{fontSize:20}}>
                        {this.state.recipe.quantity}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.measureBlockIcon}>
                    <Icon name="hourglass-half" size={20} color="black" />
                  </View>
                  <View style={styles.measureBlockSlider}>
                    <Slider
                      value={this.state.recipe.boiltime}
                      step={1}
                      minimumValue={0}
                      maximumValue={60}
                      onValueChange={(value) => 
                        this.props.setTime(
                          value, this.state.recipe) } />
                  </View>
                  <View style={styles.measureBlockIcon}>
                    <Text style={{fontSize:20}}>
                        {this.state.recipe.boiltime}
                    </Text>
                  </View>
                </View>
              </View>

          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,        
      flexDirection:'row',  
      justifyContent: 'space-between'
    },
    deleteElement: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    deleteButton: {
      justifyContent: 'center'
    },
    titleBlock: {
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    titleText: {
      fontSize:20
    },
    measureBlock: {
      flex: 3,
      flexDirection: 'column',
      marginLeft: 10,
      marginRight: 10
    },
    measureBlockIcon: {
      flex: 1,
      justifyContent: 'center'
    },
    measureBlockSlider: {
      flex: 2,
      alignItems: 'stretch',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10
    }
  });

