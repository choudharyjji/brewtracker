import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class RecipeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: this.props.mark
        }
    } 

    render() {
        return (
            <View style={styles.container}>

              <View style={styles.deleteElement}>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => 
                    this.props.deleteHop(this.state.recipe)} >
                  <Icon name="trash" size={20} color="black" />
                </TouchableOpacity>
              </View>
      
              <View style={styles.titleBlock}>
                <Text style={styles.titleText}>
                    {this.state.recipe.name}
                </Text>
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
      flex: 1,
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
    }
  });


  /*
      <View style={{
          flexDirection:'row',
          flex: 1, 
          justifyContent: 'space-between'
          }}>

        <View style={{
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center'}}>
          <TouchableOpacity 
            style={{justifyContent: 'center'}}
            onPress={() => this.deleteHop(cardItem)}>
            <Icon name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{
            flex: 2,
            alignItems: 'flex-start',
            justifyContent: 'center'}}>
          <Text style={{fontSize:20}}>
              {cardItem.name}
          </Text>
        </View>

          
        <View style={{flex: 3,
            flexDirection: 'column',
            marginLeft: 10,
            marginRight: 10}}>

            <View style={{flexDirection: 'row'}}>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Icon name="balance-scale" size={20} color="black" />
              </View>
              <View style={{
                flex: 2,
                alignItems: 'stretch',
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: 10}}>
                <Slider
                  value={cardItem.quantity}
                  step={1}
                  minimumValue={0}
                  maximumValue={40}
                  onValueChange={(value) => this.setQuantity(value, cardItem) }
                />
              </View>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Text style={{fontSize:20}}>
                    {cardItem.quantity}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Icon name="hourglass-half" size={20} color="black" />
              </View>
              <View style={{
                flex: 2,
                alignItems: 'stretch',
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: 10}}>
                <Slider
                  value={cardItem.boiltime}
                  step={1}
                  minimumValue={0}
                  maximumValue={80}
                  onValueChange={(value) => this.setTime(value, cardItem) }
                />
              </View>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Text style={{fontSize:20}}>
                    {cardItem.boiltime}
                </Text>
              </View>
            </View>    
         </View>        
      </View>
*/