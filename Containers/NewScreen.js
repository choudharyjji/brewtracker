import React, { Component } from 'react'
import { 
  View, 
  Text,
  TextInput, 
  ScrollView } from 'react-native'
import BackButton from '../Components/BackButton';
import styles from './Styles/NewScreenStyles';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import MultiSelect  from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import hops from '../Data/hops';


export default class NewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '2018-01-01',
      title: 'Batch name',
      group: 'beer',
      method: '',
      beerType: '',
      vol: '',
      fermenterType: '',
      selectedItems: [],
      dataSource: [],
     };
  }
  componentWillMount(){
    // This runs before render()
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  componentDidMount(){
    return fetch('https://api.myjson.com/bins/7c2vu')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }
 
  render () {
    let index = 0;
    const beer = [
      { key: index++, section: true, label: 'Beer' },
      { key: index++, label: 'India pale ale' },
      { key: index++, label: 'Pale ale' },
      { key: index++, label: 'Brown ale' }, 
      { key: index++, label: 'Amber ale' },
      { key: index++, label: 'Wheat'},
      { key: index++, label: 'Pilsner'},
      { key: index++, label: 'Pale lager' },
      { key: index++, label: 'Lager'},          
      { key: index++, label: 'Stout'},   
      { key: index++, label: 'Kolsch'}, 
      { key: index++, label: 'Porter' },
    ];
    const method = [
      { key: index++, section: false, label: 'Extract' },
      { key: index++, label: 'All grain' },
      { key: index++, label: 'Kit/canned' }
    ];
    const fermenters = [
      { key: index++, section: false, label: 'Carboy' },
      { key: index++, label: 'Demijohn' },
      { key: index++, label: 'Conical' },
      { key: index++, label: 'Plastic' },
      { key: index++, label: 'Steel Bucket' }
    ];

    return (
      <View style={styles.container}>

        <View style={{flex: 2, borderWidth: 1}}>


          <View style={styles.viewSpacer}>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textInput}
              onChangeText={(title) => {
                this.setState({title})}}
              value={this.state.title}/>
          </View>

          <View style={styles.viewSpacer}> 
            <DatePicker
              date={this.state.date}
              placeholder="select date"
              mode="date"
              format="YYYY-MM-DD"
              minDate="2018-01-01"
              maxDate={this.state.date}
              showIcon={false}
              customStyles={{
              dateInput: {
                  borderWidth:0,
              },
              dateText:{
                fontSize: 22,
                color: 'grey',
              }
            }}
            onDateChange={(date) => {
              this.setState({date: date});}}/>
          </View>  


          <View style={{alignItems:'center'}}>
          <ModalSelector
                data={method}
                initValue="Select method"
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ this.setState({method:option.label})}}>
                <TextInput
                    style={styles.modalText}
                    editable={false}
                    placeholder="Select brew method"
                    value={this.state.method} />
            </ModalSelector>
            <ModalSelector
                data={beer}
                initValue="Select type"
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ this.setState({beerType:option.label})}}>
                <TextInput
                    style={styles.modalText}
                    editable={false}
                    placeholder="Select beer type"
                    value={this.state.beerType} />
            </ModalSelector>
            <ModalSelector
                data={fermenters}
                initValue="Select type"
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ this.setState({fermenterType:option.label})}}>
                <TextInput
                    style={styles.modalText}
                    editable={false}
                    placeholder="Select fermenter"
                    value={this.state.fermenterType} />
            </ModalSelector>
            <Text>
              {this.state.dataSource.name}
            </Text>
          </View>
        </View>

      <ScrollView style={{flex: 1, borderWidth: 1}}>
        <MultiSelect
          hideTags
          items={hops}
          uniqueKey="id"
          subKey='children'
          styles = {{
            container: {
              paddingHorizontal: 10
            }
          }}
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Select hops"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          showDropDowns={true}
          readOnlyHeadings={true}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </ScrollView>


        <View style={{borderWidth: 1}}> 
          <BackButton /> 
        </View>  
      </View>
    )
  }
}